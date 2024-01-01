import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import { CustomComment } from '../../model/types/comment';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: CustomComment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { t } = useTranslation();
    const {
        className,
        comments,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {
                comments?.length
                    ? comments.map(
                        (comment) => (<CommentCard key={comment.id} comment={comment} className={cls.comment} />
                        ),
                    )
                    : <Text title={t('Комментарии отсутствуют')} />
            }
        </div>
    );
});
