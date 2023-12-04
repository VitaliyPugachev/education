import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Article, ArticleView } from 'entities/Articles';
import { ArticleListItem } from 'entities/Articles/ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from 'entities/Articles/ui/ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
    } = props;
    const { t } = useTranslation();

    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

    const renderArticle = useCallback((article: Article) => (
        <ArticleListItem isLoading={isLoading} article={article} view={view} key={article.id} />
    ), [isLoading, view]);

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
