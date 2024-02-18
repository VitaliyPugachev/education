import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        value,
        options,
        onChange,
        readonly,
    } = props;

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={value}
        >
            {opt.content}
        </option>
    )), [options, value]);

    const mods: Mods = {

    };

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    }, [onChange]);

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && (<span className={cls.label}>{label}</span>)}
            <select
                className={cls.select}
                disabled={readonly}
                onChange={onChangeHandler}
                value={value}
            >
                {optionList}
            </select>
        </div>
    );
};
