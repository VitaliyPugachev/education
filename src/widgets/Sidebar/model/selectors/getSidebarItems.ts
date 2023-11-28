import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/user';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import ListIcon from 'shared/assets/icons/list.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/Article.svg';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebarItems';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная страница',
                Icon: HomeIcon,
            },
            {
                path: RoutePath.about,
                text: 'О сайте',
                Icon: ListIcon,
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    text: 'Профиль',
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    text: 'Статьи',
                    Icon: ArticleIcon,
                    authOnly: false,
                },
            );
        }

        return sidebarItemsList;
    },
);
