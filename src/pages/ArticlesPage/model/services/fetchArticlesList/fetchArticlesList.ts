import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Articles';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
        'articlesPage/fetchArticlesList',
        async (props: FetchArticlesListProps, ThunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = ThunkAPI;

            const limit = getArticlesPageLimit(getState());
            const { page = 1 } = props;

            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
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
