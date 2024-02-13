import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(({className, onClick}: OverlayProps) => {
    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
