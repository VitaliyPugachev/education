import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Articles';
import { addQueryParams } from 'shared/lib/url/addQuerryParams/addQueryParams';
import { ArticleType } from 'entities/Articles/model/types/articleTypes';
import {
    getArticlesPageLimit,
    getArticlesPageOrder,
    getArticlesPagePage,
    getArticlesPageSearch,
    getArticlesPageSortField,
    getArticlesPageType,
} from '../../../model/selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
        'articlesPage/fetchArticlesList',
        async (props, ThunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = ThunkAPI;

            const order = getArticlesPageOrder(getState());
            const search = getArticlesPageSearch(getState());
            const sort = getArticlesPageSortField(getState());
            const type = getArticlesPageType(getState());
            const limit = getArticlesPageLimit(getState());
            const page = getArticlesPagePage(getState());

            try {
                addQueryParams({
                    sort, order, search, type,
                });
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        type: type === ArticleType.ALL ? undefined : type,
                        q: search,
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
