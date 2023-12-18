import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/user';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CustomComment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Articles/model/selectors/getArticleDetailsData';
import {
    fetchCommentByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentByArticleId';
import { Article } from 'entities/Articles';

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
    >(
        'articleDetailsPage/fetchArticleRecommendations',
        async (props, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _limit: 4,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
