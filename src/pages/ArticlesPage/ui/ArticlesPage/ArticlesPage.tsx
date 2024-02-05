import {classNames} from 'shared/lib/classNames/classNames';
import {memo, useCallback} from 'react';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Page} from 'widgets/Page/Page';
import {articlesPageReducer} from '../../model/slices/articlesPageSlice';
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {ArticlesPageFilters} from '../../ui/ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';
import {ArticleInfiniteScroll} from "pages/ArticlesPage/ui/ArticleInfiniteScroll/ArticleInfiniteScroll";

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
