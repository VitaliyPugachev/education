import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import React, {
    MutableRefObject,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import {Overlay} from "@/shared/ui/Overlay/Overlay";
import {useModal} from "@/shared/lib/hooks/useModal/useModal";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = ({
    className, children, isOpen, onClose, lazy,
}: ModalProps) => {

    const {isMounted, isClosing, close} = useModal({isOpen, onClose, animationDelay: ANIMATION_DELAY});

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <div className={classNames(cls.Modal, mods, [className])}>
            <Overlay onClick={close}/>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    );
};
