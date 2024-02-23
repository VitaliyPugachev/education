import { classNames } from '@/shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    'NORMAL' = 'normal',
    'OUTLINED' = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children?: ReactNode;
    theme?: CardTheme
}

export const Card = memo(({
    className, children, theme, ...otherProps
}: CardProps) => {
    return (
        <div
            className={classNames(cls.Card, {}, [className, theme ? cls[theme] : undefined])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
