import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import {ListBox} from "@/shared/ui/Popups/ui/ListBox/ListBox";
import {StarRating} from "@/shared/ui/StarRating/StarRating";

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Главная страница')}
            <StarRating size={30} />
        </Page>
    );
};

export default MainPage;
