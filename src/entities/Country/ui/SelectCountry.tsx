import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from '@/shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../model/types/country';
import {ListBox} from "@/shared/ui/Popups/ui/ListBox/ListBox";

interface SelectCountryProps {
    className?: string;
    value?: Country;
    onChange?: (country: Country) => void;
    readonly?: boolean;
    label?: string;
}

export const SelectCountry = memo((props: SelectCountryProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
        label
    } = props;

    const { t } = useTranslation();

    const options = [
        { value: Country.Russia, content: Country.Russia },
        { value: Country.Belarus, content: Country.Belarus },
        { value: Country.Kazakhstan, content: Country.Kazakhstan },
        { value: Country.Ukrain, content: Country.Ukrain },
    ];

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            label={label || 'Country'}
            readonly={readonly}
            className={className}
            items={options}
            value={value}
            defaultValue={t('Страна')}
            onChange={onChangeHandler}
            direction={'top right'}
        />
    )

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //         label={t('Страна')}
    //     />
    // );
});
