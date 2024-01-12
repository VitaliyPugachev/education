import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import {useTranslation} from 'react-i18next';
import {Fragment, memo, ReactNode} from 'react';
import Check from '../../assets/icons/check.svg';
import {Icon} from "shared/ui/Icon/Icon";
import {HStack} from "shared/ui/Stack";
import { useState } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import SVG from "*.svg";
import {Button} from "shared/ui/Button/Button";

export type DropdownDirection = 'top' | 'bottom';


interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean
}

interface ListBoxProps {
    items: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean
    direction?: DropdownDirection;
    label?: string;
}


export function ListBox(props: ListBoxProps) {
    const {className, items, value, defaultValue, onChange, readonly, direction = 'bottom', label} = props;

    const mapDirectionClass: Record<DropdownDirection, string> = {
        bottom: cls.optionsBottom,
        top: cls.optionsTop,
    }

    return (
        <HStack gap={'8'} align={'center'}>
            {label && <span>{label + '>'}</span>}
            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button>
                    <Button>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options  className={classNames(cls.options, {}, [mapDirectionClass[direction]])}>
                    {items.map((item) => (
                        <HListBox.Option
                            className={cls.option}
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li className={classNames('', {[cls.active]: active, [cls.disabled]: item.disabled})}>
                                    <HStack gap={'8'}>
                                        {selected && <Icon Svg={Check}/>}
                                        {item.value}
                                    </HStack>
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
