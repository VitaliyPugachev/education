import {classNames} from 'shared/lib/classNames/classNames';
import cls from './AdminPanel.module.scss';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Page} from "widgets/Page/Page";

interface AdminPanelProps {
    className?: string;
}

const AdminPanel = memo(({className}: AdminPanelProps) => {
    const {t} = useTranslation();
    return (
        <Page className={classNames(cls.AdminPanel, {}, [className])}>
            {t('Admin panel')}
        </Page>
    );
});

export default AdminPanel;
