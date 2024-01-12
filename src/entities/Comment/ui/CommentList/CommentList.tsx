import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import { CustomComment } from '../../model/types/comment';

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
            <VStack className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap="16" className={classNames('', {}, [className])}>
            {
                comments?.length
                    ? comments.map(
                        (comment) => (<CommentCard key={comment.id} comment={comment} />
                        ),
                    )
                    : <Text title={t('Комментарии отсутствуют')} />
            }
        </VStack>
    );
});
