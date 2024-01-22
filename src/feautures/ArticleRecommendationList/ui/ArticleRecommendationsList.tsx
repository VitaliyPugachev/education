import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Text, TextSize} from "shared/ui/Text/Text";
import {ArticleList} from "entities/Articles";
import {VStack} from "shared/ui/Stack";
import {useGetArticleRecommendationsList} from "../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(({className}: ArticleRecommendationsListProps) => {
    const {t} = useTranslation();
    const {data, isLoading} = useGetArticleRecommendationsList(3);

    return (
        <VStack gap={'8'} className={classNames('', {}, [className])}>
            <Text size={TextSize.M} title={t('Рекомендуем')} />
            <ArticleList
                target="_blank"
                articles={data}
                isLoading={isLoading}
            />
        </VStack>
    );
});
