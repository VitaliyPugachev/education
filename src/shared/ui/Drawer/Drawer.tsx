import {classNames, Mods} from '@/shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, ReactNode, useCallback} from 'react';
import {Portal} from "@/shared/ui/Portal/Portal";
import {Overlay} from "@/shared/ui/Overlay/Overlay";
import {useTheme} from "@/app/providers/ThemeProvider";
import {useModal} from "@/shared/lib/hooks/useModal/useModal";
import {config, useSpring} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";

interface DrawerProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
    lazy?: boolean;
}


export const Drawer = memo((props: DrawerProps) => {
    const {className, isOpen, onClose, children, lazy} = props;
    const {isMounted, isClosing, close} = useModal({isOpen, onClose, animationDelay: 300});
    const {theme} = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <div>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </div>
    );
});
