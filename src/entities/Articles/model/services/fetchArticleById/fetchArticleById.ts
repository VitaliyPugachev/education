import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Articles';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articles/fetchArticleData',
    async (articleId, ThunkAPI) => {
        const {
            rejectWithValue,
            extra,
        } = ThunkAPI;

        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`);

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
