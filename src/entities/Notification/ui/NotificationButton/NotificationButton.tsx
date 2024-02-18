import cls from './NotificationButton.module.scss';
import React, {memo, useCallback, useState} from 'react';
import {Popover} from "@/shared/ui/Popups";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {Icon} from "@/shared/ui/Icon/Icon";
import BellIcon from "@/shared/assets/icons/bell-regular.svg";
import {NotificationList} from "@/entities/Notification";
import {Drawer} from "@/shared/ui/Drawer/Drawer";
import {BrowserView, MobileView} from 'react-device-detect';

interface NotificationButtonProps {
    className?: string;
}


export const NotificationButton = memo(({className}: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)


    const openDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button onClick={openDrawer} className={cls.btn} theme={ButtonTheme.OUTLINE}>
            <Icon Svg={BellIcon} className={cls.bell} inverted={true}/>
        </Button>
    )

    return (
        <>
            <BrowserView>
                <Popover
                    direction={'bottom left'}
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications}/>
                </Popover>
            </BrowserView>

            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={closeDrawer}>
                    <NotificationList/>
                </Drawer>
            </MobileView>
        </>
    );
});
