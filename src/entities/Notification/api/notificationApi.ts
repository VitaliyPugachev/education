import {rtkApi} from "shared/api/rktQueryApi";
import {Article} from "entities/Articles";
import {Notification} from "../model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsList: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications'
            })
        })
    })
})

export const useNotifications = notificationApi.useGetNotificationsListQuery;
