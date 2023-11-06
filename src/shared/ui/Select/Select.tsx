import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
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
            onChange(e.target.value);
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
});
