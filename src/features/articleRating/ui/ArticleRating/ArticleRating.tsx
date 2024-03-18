import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {RatingCard} from "@/entities/Rating";
import {useArticleRating} from "@/features/articleRating/api/articleRatingApi";
import {getUserAuthData} from "@/entities/user";
import {useSelector} from "react-redux";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";
import {useRateArticle} from "@/features/articleRating/api/articleRatingApi";
import {useCallback} from "react";

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    console.log(userData);
    const [rateArticleMutation] = useRateArticle();
    const {data, isLoading} = useArticleRating({
        articleId,
        userId: userData?.id ?? ''
    });

    console.log(data);

    const rating = data?.[0];

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId: articleId,
                rate: starsCount,
                feedback: feedback,
            })
        } catch (e) {
            console.log(e);
        }
    }, [rateArticleMutation, articleId]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    if (isLoading) {
        return (
            <Skeleton width={'100%'} height={120}/>
        )
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={classNames('', {}, [className])}
            title={t('Оцените статью')}
            feedbackTitle={'Оствьте отзыв о статье'}
            hasFeedback
        />
    );
};
