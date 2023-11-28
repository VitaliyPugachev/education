import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Article, ArticleView } from 'entities/Articles';
import { ArticleListItem } from 'entities/Articles/ui/ArticleListItem/ArticleListItem';
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
        </div>
    );
});
