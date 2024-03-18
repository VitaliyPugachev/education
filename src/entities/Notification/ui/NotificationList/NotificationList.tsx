import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import React, {memo} from 'react';
import {useNotifications} from "@/entities/Notification/api/notificationApi";
import {VStack} from "@/shared/ui/Stack";
import {NotificationItem} from "@/entities/Notification/ui/NotificationItem/NotificationItem";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo(({className}: NotificationListProps) => {
    const {data, isLoading} = useNotifications(null, {
        pollingInterval: 10000
    });

    if (isLoading) {
        return (
            <VStack
                gap={'16'}
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
            </VStack>
        )
    }



    return (
        <VStack
            gap={'16'}
            className={classNames(cls.NotificationList, {}, [className])}
            max
        >
            {data?.map(item => (<NotificationItem key={item.id} item={item}/>))}
        </VStack>
    );
});
