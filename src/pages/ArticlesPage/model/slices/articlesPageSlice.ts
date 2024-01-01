import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Articles';
import { StateSchema } from 'app/providers/StoreProvider';
import { VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';
import { ArticleSortField, ArticleType } from 'entities/Articles/model/types/articleTypes';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../../../ArticlesPage';

const initialState: ArticlesPageSchema = {
    isLoading: false,
    error: '',
    view: ArticleView.SMALL,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    _inited: false,
    order: 'asc',
    search: '',
    sort: ArticleSortField.TITTLE,
    limit: 9,
    type: ArticleType.ALL,
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
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(VIEW_LOCAL_STORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesList.pending, (state, action) => {
            state.isLoading = true;
            state.error = '';
            if (action.meta.arg.replace) {
                articlesAdapter.removeAll(state);
            }
        });
        builder.addCase(fetchArticlesList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = 'error';
        });
        builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
            if (action.meta.arg.replace) {
                articlesAdapter.setAll(state, action.payload);
            } else {
                articlesAdapter.addMany(state, action.payload);
            }
            state.isLoading = false;
            state.hasMore = action.payload.length >= state.limit;
        });
    },

});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
