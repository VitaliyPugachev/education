import {classNames, Mods} from 'shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, ReactNode} from 'react';
import {Portal} from "shared/ui/Portal/Portal";
import {Overlay} from "shared/ui/Overlay/Overlay";
import {useTheme} from "app/providers/ThemeProvider";

interface DrawerProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode
}

export const Drawer = memo((props: DrawerProps) => {
    const {className, isOpen, onClose, children} = props;

    const mods: Mods = {
        [cls.opened]: isOpen
    }

    const {theme} = useTheme();

    return (
        <div>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={onClose}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </div>
    );
});
