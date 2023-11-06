import ListIcon from 'shared/assets/icons/list.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/Article.svg';
import ArticlesIcon from 'shared/assets/icons/Articles.svg';
import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
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
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
    {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticlesIcon,
        authOnly: false,
    },
    {
        path: RoutePath.article_details,
        text: 'Статьи',
        Icon: ArticlesIcon,
        authOnly: false,
    },
];
