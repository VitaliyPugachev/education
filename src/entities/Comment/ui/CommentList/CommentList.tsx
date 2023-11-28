import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard';
import { useTranslation } from 'react-i18next';
import { CustomComment } from 'entities/Comment';
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
                        (comment) => (<CommentCard comment={comment} className={cls.comment} />
                        ),
                    )
                    : <Text title={t('Комментарии отсутствуют')} />
            }
        </div>
    );
});
