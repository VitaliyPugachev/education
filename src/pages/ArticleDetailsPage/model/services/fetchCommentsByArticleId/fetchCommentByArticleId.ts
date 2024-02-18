import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CustomComment } from '@/entities/Comment';

export const fetchCommentByArticleId = createAsyncThunk<
    CustomComment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'profile/fetchCommentByArticleId',
        async (articleId, ThunkAPI) => {
            const {
                extra,
                rejectWithValue,
            } = ThunkAPI;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<CustomComment[]>('/comments', {
                    params: {
                        articleId,
                        _expand: 'user',
                    },
                });

                if (!response.data) {
                    throw Error('error');
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
