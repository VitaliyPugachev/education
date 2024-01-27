import {useTranslation} from 'react-i18next';
import {memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {ValidateProfileError} from "entities/Profile/model/type/profile";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import {VStack} from "shared/ui/Stack";
import {ProfilePageHeader} from "pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {getProfileForm} from "feautures/editableProfileCard/model/selector/getProfileForm/getProfileForm";
import {getProfileLoading} from "feautures/editableProfileCard/model/selector/getProfileLoading/getProfileLoading";
import {getProfileError} from "feautures/editableProfileCard/model/selector/getProfileError/getProfileError";
import {getProfileReadonly} from "feautures/editableProfileCard/model/selector/getProfileReadonly/getProfileReadonly";
import {
    getProfileValidateErrors
} from "feautures/editableProfileCard/model/selector/getProfileValidateErrors/getProfileValidateErrors";
import {profileActions} from "feautures/editableProfileCard/model/slice/profileSlice";
import {fetchProfileData} from "feautures/editableProfileCard/model/services/fetchProfileData/fetchProfileData";
import {ProfileCard} from "entities/Profile";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "entities/Profile/ui/ProfileCard/ProfileCard.module.scss";
import {Loader} from "shared/ui/Loader/Loader";

interface EditableProfileCardProps {
    className?: string;
    id?: string
}

export const EditableProfileCard = memo(({className, id}: EditableProfileCardProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);


    const validateErrorsTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.NO_DATA]: t('Поля не заполнены'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Обязательно для заполнения'),
        [ValidateProfileError.INCORRECT_USER_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_USER_COUNTRY]: t('Обязательное поле'),
    };

    const onChangeName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ name: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        if (value.match(/[^0-9]+/)) {
            return;
        }
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [id, dispatch]);

    if (!id) {
        return (
            <Text text={t('Профиль не найден')} />
        )
    }

    return (
        <VStack gap={'8'}>
            <ProfilePageHeader />
            <VStack gap="16" max>
                {validateErrors?.length && validateErrors.map((error: ValidateProfileError) => (
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorsTranslate[error]}
                        key={error}
                        data-testid={'EditableProfileCard.Error'}
                    />
                ))}
                <ProfileCard
                    formData={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeLastname={onChangeLastname}
                    onChangeName={onChangeName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    readonly={readonly}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </VStack>
    );
});
