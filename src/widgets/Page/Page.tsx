import { classNames } from '@/shared/lib/classNames/classNames';
import {
    memo, MutableRefObject, ReactNode, useEffect, useRef,
} from 'react';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scrollSaveActions } from '@/features/ScrollSave';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getScrollSave } from '@/features/ScrollSave/selectors/scrollSaveSelectors';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const scrollPosition = useSelector(getScrollSave);
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    const onScroll = useThrottle((e: { currentTarget: { scrollTop: number; }; }) => {
        dispatch(scrollSaveActions.setPosition({
            position: e.currentTarget.scrollTop,
            path: location.pathname,
        }));
    }, 1000);

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition[location.pathname];
    }, [location.pathname, scrollPosition]);

    return (
        <div
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            { onScrollEnd ? (<div className={cls.trigger} ref={triggerRef} />) : null}
        </div>
    );
});
