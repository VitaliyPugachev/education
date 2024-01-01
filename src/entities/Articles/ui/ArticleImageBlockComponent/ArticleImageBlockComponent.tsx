import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/articleTypes';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = (
    { className, block }: ArticleImageBlockComponentProps,
) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} className={cls.img} alt={block.title || 'image'} />
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER} />
            )}
        </div>
    );
};
