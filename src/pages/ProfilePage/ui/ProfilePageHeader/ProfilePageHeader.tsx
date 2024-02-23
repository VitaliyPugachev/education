import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import {getProfileReadonly} from "@/features/editableProfileCard/model/selector/getProfileReadonly/getProfileReadonly";
import {getProfileData} from "@/features/editableProfileCard/model/selector/getProfileData/getProfileData";
import {getUserAuthData} from "@/entities/user";
import {profileActions} from "@/features/editableProfileCard/model/slice/profileSlice";
import {updateProfileData} from "@/features/editableProfileCard/model/services/updateProfileData/updateProfileData";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const editable = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onEditCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        if (profileData?.id) {
            dispatch(updateProfileData(profileData?.id));
        }
    }, [dispatch, profileData?.id]);

    return (
        <HStack justify="between" className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {editable && (
                <div>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            data-testid={'EditableProfileCard.EditButton'}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onEditCancel}
                                data-testid={'EditableProfileCard.CancelButton'}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                // className={cls.editBtn}
                                onClick={onSave}
                                data-testid={'EditableProfileCard.SaveButton'}

                            >
                                {t('Сохранить')}
                            </Button>

                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
