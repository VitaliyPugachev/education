import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from '@/shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Currency } from '../../model/types/currency';
import {ListBox} from "@/shared/ui/Popups/ui/ListBox/ListBox";

interface CurrencySelectProps {
    className?: string;
    value?: string;
    onChange?: (currency: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation();

    const options = [
        { value: Currency.RUB, content: Currency.RUB },
        { value: Currency.EUR, content: Currency.EUR },
        { value: Currency.USD, content: Currency.USD },
    ];

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);


    return (
        <ListBox
            readonly={readonly}
            label={t('Выберете валюту')}
            value={value}
            defaultValue={t('Выберете валюту')}
            items={options}
            onChange={onChangeHandler}
            direction={'top right'}
        />
    )

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Выберете валюту')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
