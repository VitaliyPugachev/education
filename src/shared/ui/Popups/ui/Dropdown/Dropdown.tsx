import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, ReactNode} from 'react';
import {Menu} from '@headlessui/react';
import {Button} from "@/shared/ui/Button/Button";
import {DropdownDirection} from "@/shared/types/ui";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {mapDirectionClass} from "@/shared/ui/Popups/styles/consts";
import popupCls from '../../styles/popup.module.scss';


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




export const Dropdown = memo((props: DropdownProps) => {
    const {t} = useTranslation();
    const {className, items, trigger, direction = 'bottom left'} = props;
    return (
        <Menu as={'div'} className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}>
                {items.map((item, index) => {

                    const content = ({active} : { active: boolean }) => (
                        <Button
                            disabled={item.disabled}
                            type={'button'}
                            className={classNames(cls.item, {[popupCls.active]: active}, [])}
                            onClick={item.onClick}
                        >
                            {item.content}
                        </Button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                className={cls.item}
                                key={'dropdown_key' + index}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            as={'div'}
                            className={cls.item}
                            key={'dropdown_key' + index}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    );
});
