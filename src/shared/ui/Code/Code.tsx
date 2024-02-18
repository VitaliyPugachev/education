import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string
}

export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={cls.copyBtn}
                theme={ButtonTheme.CLEAR}
            >
                <Icon Svg={CopyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
