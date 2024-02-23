import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, useCallback, useRef} from 'react';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(({className, onClick}: OverlayProps) => {
    const refTarget = useRef(null);

    const clickHandler = useCallback((event) => {
        if(event.target === refTarget.current && onClick) {
            onClick()
        };
    }, [])
    return (
        <div
            ref={refTarget}
            onClick={clickHandler}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
