import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Articles/model/types/articleTypes';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams | void,
    ThunkConfig<string>
    >(
        'articlesPage/initArticlesPage',
        async (searchParams, ThunkAPI) => {
            const {
                getState,
                dispatch,
            } = ThunkAPI;
            const inited = getArticlesPageInited(getState());

            if (!inited) {
                const orderFromUrl = searchParams?.get('order') as SortOrder;
                const searchFromUrl = searchParams?.get('search');
                const sortFromUrl = searchParams?.get('sort') as ArticleSortField;
                const typeFromUrl = searchParams?.get('type') as ArticleType;

                if (orderFromUrl) {
                    dispatch(articlesPageActions.setOrder(orderFromUrl));
                }
                if (searchFromUrl) {
                    dispatch(articlesPageActions.setSearch(searchFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(articlesPageActions.setSort(sortFromUrl));
                }
                if (typeFromUrl) {
                    dispatch(articlesPageActions.setType(typeFromUrl));
                }

                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        },
    );
