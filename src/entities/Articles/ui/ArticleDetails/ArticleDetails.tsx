import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HStack } from '@/shared/ui/Stack';
import { articleDetailsReducers } from '../../model/slices/articleDetailsSlice';
import {
    fetchArticleById,
} from '../../model/services/fetchArticleById/fetchArticleById';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetailsData';
import { ArticleBlock} from '../../model/types/articleTypes';
import {
    ArticleCodeBlockComponent,
} from '../../ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
    ArticleImageBlockComponent,
} from '../../ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import {
    ArticleTextBlockComponent,
} from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';
import {ArticleBlockType} from "@/entities/Articles/model/consts/consts";

interface ArticleDetailsProps {
    className?: string;
    articleId: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducers,
};

export const ArticleDetails = memo(({ className, articleId }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent className={cls.block} block={block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent className={cls.block} block={block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent className={cls.block} block={block} />;
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        dispatch(fetchArticleById(articleId));
    }, [dispatch, articleId]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width={600} height={24} />

            </>
        );
    } else if (error) {
        content = (
            <Text
                text={t('Страница не найдена')}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <>
                <HStack justify="center" className={cls.avatarWrapper}>
                    <Avatar
                        src={article?.img}
                        size={200}
                        className={cls.avatar}
                    />
                </HStack>
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.M}
                />
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={article?.views.toString()} />
                </HStack>
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={article?.createdAt} />
                </HStack>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
