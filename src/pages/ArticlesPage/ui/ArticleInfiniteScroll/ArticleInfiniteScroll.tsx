import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ArticleInfiniteScroll.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {getArticles} from "@/pages/ArticlesPage/model/slices/articlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageInited,
    getArticlesPageIsLoading
} from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {getArticlesPageView} from "@/pages/ArticleDetailsPage/model/selectors/articlesPageSelectors";
import {useSearchParams} from "react-router-dom";
import {initArticlesPage} from "@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import {fetchNextArticlesPage} from "@/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {ArticleList} from "@/entities/Articles";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Text} from "@/shared/ui/Text/Text";

interface ArticleInfiniteScrollProps {
    className?: string;
}

export const ArticleInfiniteScroll = memo(({className}: ArticleInfiniteScrollProps) => {
    const {t} = useTranslation();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const inited = useSelector(getArticlesPageInited);

    useEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, [dispatch, inited, searchParams]);

    if (error) {
        return (
            <Text text={'Возникла ошибка'}/>
        )
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    );
});
