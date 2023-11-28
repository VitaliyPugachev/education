import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/user';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CustomComment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Articles/model/selectors/getArticleDetailsData';
import {
    fetchCommentByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentByArticleId';

export const addCommentForArticle = createAsyncThunk<CustomComment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, ThunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = ThunkAPI;

        const userData = getUserAuthData(getState());
        const articleData = getArticleDetailsData(getState());

        if (!userData || !text || !articleData) {
            return rejectWithValue('no data');
        }

        try {
            // @ts-ignore
            const response = await extra.api.post<CustomComment>('/comments', {
                articleId: articleData.id,
                text,
                userId: userData.id,
            });
            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentByArticleId(articleData.id));
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
