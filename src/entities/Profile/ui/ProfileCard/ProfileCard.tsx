import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { SelectCountry } from 'entities/Country';
import { VStack, HStack } from 'shared/ui/Stack';
import { Profile } from '../../model/type/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    formData?: Profile;
    isLoading?: boolean;
    error?: string;
    onChangeName?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
    readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        isLoading,
        className,
        error,
        formData,
        onChangeLastname,
        onChangeName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке')}
                    text={t('Пожалуйста обновите страницу')}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack gap="8" max className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.header} />
            <div className={cls.data}>
                <HStack justify="center" className={cls.avatarWrapper}>
                    <Avatar src={formData?.avatar} size={100} alt={formData?.username} />
                </HStack>
                <VStack gap="16">
                    <Input
                        value={formData?.username}
                        placeholder={t('Имя пользователя')}
                        className={cls.input}
                        onChange={onChangeUsername}
                        readonly={readonly}
                    />
                    <Input
                        value={formData?.name}
                        placeholder={t('Ваше имя')}
                        className={cls.input}
                        onChange={onChangeName}
                        readonly={readonly}
                    />
                    <Input
                        value={formData?.lastname}
                        placeholder={t('Ваша фамилия')}
                        className={cls.input}
                        onChange={onChangeLastname}
                        readonly={readonly}
                    />
                    <Input
                        value={formData?.age}
                        placeholder={t('Ваш возраст')}
                        className={cls.input}
                        onChange={onChangeAge}
                        readonly={readonly}
                    />
                    <Input
                        value={formData?.city}
                        placeholder={t('Город')}
                        className={cls.input}
                        onChange={onChangeCity}
                        readonly={readonly}
                    />
                    <Input
                        value={formData?.avatar}
                        placeholder={t('Ссылка на аватар')}
                        className={cls.input}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                    />
                    <SelectCountry
                        onChange={onChangeCountry}
                        readonly={readonly}
                        value={formData?.country}

                    />
                    <CurrencySelect
                        onChange={onChangeCurrency}
                        readonly={readonly}
                        value={formData?.currency}
                    />
                </VStack>

            </div>
        </VStack>
    );
};
