import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useCallback, useEffect} from 'react';
import {Text, TextSize} from "shared/ui/Text/Text";
import {AddCommentForm} from "feautures/addCommentForm";
import {CommentList} from "entities/Comment/ui/CommentList/CommentList";
import {useSelector} from "react-redux";
import {getArticleComments} from "pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import {getArticleDetailsIsLoading} from "entities/Articles/model/selectors/getArticleDetailsData";
import {addCommentForArticle} from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentByArticleId
} from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentByArticleId";
import {VStack} from "shared/ui/Stack";

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = memo(({className, id}: ArticleDetailsCommentsProps) => {
    const {t} = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCommentByArticleId(id));
    }, [dispatch, id]);

    return (
        <VStack gap={'8'} className={classNames('', {}, [className])}>
            <Text size={TextSize.M} title={t('Комментарии')} className={''} />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList comments={comments} isLoading={isLoading} />
        </VStack>
    );
});
