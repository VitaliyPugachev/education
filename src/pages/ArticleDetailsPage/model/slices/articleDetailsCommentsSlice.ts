import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { CustomComment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsCommentSchema } from '../../model/types/ArticleDetailsCommentSchema';
import {
    fetchCommentByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentByArticleId';

const commentsAdapter = createEntityAdapter<CustomComment>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsComment || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentByArticleId.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchCommentByArticleId.fulfilled, (
            state,
            action: PayloadAction<CustomComment[]>,
        ) => {
            state.isLoading = false;
            commentsAdapter.setAll(state, action.payload);
        });
        builder.addCase(fetchCommentByArticleId.rejected, (
            state,
        ) => {
            state.isLoading = false;
            state.error = 'error';
        });
    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
