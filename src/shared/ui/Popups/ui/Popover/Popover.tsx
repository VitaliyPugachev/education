import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import {Popover as HPopover} from '@headlessui/react'
import {DropdownDirection} from "@/shared/types/ui";
import {ReactNode} from "react";
import {mapDirectionClass} from "@/shared/ui/Popups/styles/consts";
import popupCls from "@/shared/ui/Popups/styles/popup.module.scss";

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {className, trigger, direction = 'bottom right', children} = props;

    const menuClasses = mapDirectionClass[direction];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, [menuClasses])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
