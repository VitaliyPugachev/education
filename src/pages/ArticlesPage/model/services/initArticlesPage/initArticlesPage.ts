import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { SortOrder } from '@/shared/types';
import { getArticlesPageInited } from '../../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import {ArticleSortField, ArticleType} from "@/entities/Articles/model/consts/consts";

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
