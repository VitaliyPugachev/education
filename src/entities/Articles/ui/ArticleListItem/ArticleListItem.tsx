import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Article, ArticleView } from 'entities/Articles';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleTextBlock,
} from 'entities/Articles/model/types/articleTypes';
import {
    ArticleTextBlockComponent,
} from 'entities/Articles/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
    ArticleListItemSkeleton,
} from 'entities/Articles/ui/ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    isLoading?: boolean
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        isLoading,
    } = props;

    const { t } = useTranslation();
    const navigate = useNavigate();
    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article, navigate]);

    const types = (<Text text={article.type.join(', ')} className={cls.types} />);
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const texBlock = article.blocks.find(
            (block: ArticleBlock) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card className={classNames(cls.card, {}, [className, cls[view]])}>
                <div className={cls.header}>
                    <Avatar src={article.user.avatar} size={30} alt={article.user.username} />
                    <Text text={article.user.username} className={cls.username} />
                    <Text text={article.createdAt} className={cls.createdAt} />
                </div>
                <Text title={article.title} className={cls.title} />
                {types}
                <img src={article.img} alt={article.title} className={cls.img} />
                { texBlock
                        && (
                            <ArticleTextBlockComponent
                                block={texBlock}
                                className={cls.textBlock}
                            />
                        )}
                <div className={cls.footer}>
                    <Button
                        onClick={onOpenArticle}
                        theme={ButtonTheme.OUTLINE}
                    >
                        {t('Читать далее')}
                    </Button>
                    {views}
                </div>
            </Card>
        );
    }
    return (
        <Card
            onClick={onOpenArticle}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <div className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </div>
        </Card>
    );
});
