import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Articles';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesPageView } from 'pages/ArticleDetailsPage/model/selectors/articlesPageSelectors';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import {
    getArticlesPageError,
    getArticlesPageHasMore,
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPagePage,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../../ui/ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';
import {ArticleInfiniteScroll} from "pages/ArticlesPage/ui/ArticleInfiniteScroll/ArticleInfiniteScroll";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteScroll/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
