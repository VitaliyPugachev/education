import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { Article, ArticleView } from 'entities/Articles';
import {
    fetchArticlesList,
} from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { CustomComment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

const initialState: ArticlesPageSchema = {
    isLoading: false,
    error: '',
    view: ArticleView.SMALL,
    ids: [],
    entities: {},
};

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (comment) => comment.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articleDetailsSlice',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(VIEW_LOCAL_STORAGE_KEY, action.payload);
        },
        initState: (state) => {
            state.view = localStorage.getItem(VIEW_LOCAL_STORAGE_KEY) as ArticleView;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesList.pending, (state, action) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchArticlesList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = 'error';
        });
        builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
            state.isLoading = false;
            articlesAdapter.setAll(state, action.payload);
        });
    },

});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
