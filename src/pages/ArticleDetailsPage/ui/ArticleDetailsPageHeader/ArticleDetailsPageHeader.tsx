import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/user';
import { getCanEditArticle } from '../../model/selectors/article';
import {HStack} from "shared/ui/Stack";

interface ArticleDetailsPageHeaderProps {
    className?: string;
    id?: string
}

export const ArticleDetailsPageHeader = memo(({ className, id }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector(getUserAuthData);
    const canEdit = useSelector(getCanEditArticle);

    const backToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const goToEditPage = useCallback(() => {
        navigate(`${RoutePath.article_details}${id}/edit`);
    }, [id, navigate]);

    return (
        <HStack justify={'between'} className={classNames('', {}, [className])}>
            <Button onClick={backToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button
                    onClick={goToEditPage}
                    data-testid={'EditableProfileCard.EditButton'}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
