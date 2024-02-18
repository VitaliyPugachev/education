import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {Mods} from "@/shared/lib/classNames/classNames";
import cls from "@/shared/ui/Modal/Modal.module.scss";
import {useTheme} from "@/app/providers/ThemeProvider";

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}


export const useModal = (props: UseModalProps) => {
    const {
        animationDelay,
        onClose,
        isOpen
    } = props;

    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const { theme } = useTheme();
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close
    }
}
