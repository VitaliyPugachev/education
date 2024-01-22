import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {ArticleDetails} from 'entities/Articles';
import {useParams} from 'react-router-dom';
import {Text} from 'shared/ui/Text/Text';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {Page} from 'widgets/Page/Page';
import {articleDetailsCommentsReducer,} from '../../model/slices/articleDetailsCommentsSlice';
import {articleDetailsPageRecommendReducer,} from '../../model/slices/articleDetailesRecommendSlice';
import {ArticleDetailsPageHeader} from '../../ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import {VStack} from "shared/ui/Stack";
import {ArticleRecommendationsList} from "feautures/ArticleRecommendationList";
import {ArticleDetailsComments} from "pages/ArticleDetailsPage/ui/ArticleDetailsComments/ArticleDetailsComments";

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

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
                    <VStack gap={'32'} max>
                        <ArticleDetailsPageHeader id={id} />
                        <ArticleDetails articleId={id} />
                        <ArticleRecommendationsList/>
                        <ArticleDetailsComments id={id}/>
                    </VStack>
                </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
