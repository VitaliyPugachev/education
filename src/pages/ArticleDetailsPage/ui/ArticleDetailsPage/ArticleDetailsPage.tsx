import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Articles';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Articles/model/selectors/getArticleDetailsData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'feautures/addCommentForm';
import { Page } from 'widgets/Page/Page';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice';
import {
    fetchCommentByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
    articleDetailsPageRecommendReducer,
    getArticleRecommendations,
} from '../../model/slices/articleDetailesRecommendSlice';
import {
    getArticleDetailsRecommendError,
    getArticleDetailsRecommendIsLoading,
} from '../../model/selectors/recommendations';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsPageHeader } from '../../ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const dispatch = useAppDispatch();

    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleDetailsRecommendIsLoading);
    const recommendationsError = useSelector(getArticleDetailsRecommendError);

    useEffect(() => {
        dispatch(fetchCommentByArticleId(id));
        dispatch(fetchArticleRecommendations());
    }, [dispatch, id]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text text={t('Статья не найдена')} />
            </div>
        );
    }

    const reducers: ReducersList = {
        articleDetailsComment: articleDetailsCommentsReducer,
        articleDetailsRecommendations: articleDetailsPageRecommendReducer,
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader id={id} />
                <ArticleDetails articleId={id} />
                <Text size={TextSize.M} title={t('Рекомендуем')} className={cls.commentTitle} />
                <ArticleList
                    target="_blank"
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                />
                <Text size={TextSize.M} title={t('Комментарии')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList comments={comments} isLoading={isLoading} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
