import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/articleTypes';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = ({ className, block }: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={cls.title} />
            )}
            {block.paragraphs.map((paragraph, index) => (
                <Text text={paragraph} key={index} className={cls.paragraph} />
            ))}
        </div>
    );
};
