import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { Article, ArticleView } from 'entities/Articles';
import { ArticleListItem } from 'entities/Articles/ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from 'entities/Articles/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

    const renderArticle = useCallback((article: Article) => (
        <ArticleListItem target={target} isLoading={isLoading} article={article} view={view} key={article.id} />
    ), [isLoading, target, view]);

    if (!isLoading && !articles.length) {
        return (
            <div className={cls.ArticleList}>
                <Text size={TextSize.M} text={t('Статьи не найдены')} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {
                articles?.length > 0
                    ? articles?.map(renderArticle)
                    : null
            }
            {isLoading && getSkeletons(view)}
        </div>
    );
});
