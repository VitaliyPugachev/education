import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, ReactNode} from 'react';
import {Menu} from '@headlessui/react';
import {Button} from "shared/ui/Button/Button";
import {DropdownDirection} from "shared/types/ui";
import {AppLink} from "shared/ui/AppLink/AppLink";


interface DropdownItem {
    content: ReactNode;
    disabled?: boolean;
    href?: string;
    onClick?: () => void
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
}


export const Dropdown = memo((props: DropdownProps) => {
    const {t} = useTranslation();
    const {className, items, trigger, direction = 'bottom left'} = props;
    return (
        <Menu as={'div'} className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}>
                {items.map(item => {

                    const content = ({active} : { active: boolean }) => (
                        <Button
                            disabled={item.disabled}
                            type={'button'}
                            className={classNames(cls.item, {[cls.active]: active}, [])}
                            onClick={item.onClick}
                        >
                            {item.content}
                        </Button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} className={cls.item}>
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item as={'div'} className={cls.item}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    );
});