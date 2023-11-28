import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list-solid.svg';
import { ArticleView } from 'entities/Articles';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import TilesIcon from 'shared/assets/icons/Articles.svg';
import cls from './ArticleViewSwitcher.module.scss';

interface ArticleViewSwitcherProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: ListIcon,
    },
    {
        view: ArticleView.BIG,
        icon: TilesIcon,
    },

];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
    const { t } = useTranslation();
    const {
        className,
        onViewClick,
        view,
    } = props;

    const onCLick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
            {
                viewTypes.map((item) => (
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onCLick(item.view)}
                    >
                        <Icon
                            className={classNames('', { [cls.selected]: item.view === view })}
                            Svg={item.icon}
                        />
                    </Button>
                ))
            }
        </div>
    );
});
