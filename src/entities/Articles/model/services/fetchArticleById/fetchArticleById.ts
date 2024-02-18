import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/articleTypes';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articles/fetchArticleData',
    async (articleId, ThunkAPI) => {
        const {
            rejectWithValue,
            extra,
        } = ThunkAPI;

        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user',
                },
            });

            if (!response) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
