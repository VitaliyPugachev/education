import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import {useTranslation} from 'react-i18next';
import {memo, useCallback, useState} from 'react';
import {Card} from "@/shared/ui/Card/Card";
import {HStack, VStack} from "@/shared/ui/Stack";
import {Text} from "@/shared/ui/Text/Text";
import {StarRating} from "@/shared/ui/StarRating/StarRating";
import {Modal} from "@/shared/ui/Modal/Modal";
import {Input} from "@/shared/ui/Input/Input";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        onCancel,
        feedbackTitle,
        hasFeedback,
        title,
        onAccept,
        className,
        rate = 0
    } = props;
    const {t} = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starCount, setStarCount] = useState(0);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((starNumber: number) => {
        setStarCount(starNumber);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(starNumber);
        }
    },[]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starCount, feedback);
    }, [starCount, feedback]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starCount);
    }, [starCount]);

    const modalContent = (
        <VStack max gap={'32'} align={'center'}>
            <Text title={feedbackTitle}/>
            <Input placeholder={t('Ваш отзыв')}/>
            <HStack max gap={'16'} justify={"between"}>
                <Button
                    onClick={cancelHandler}
                    theme={ButtonTheme.OUTLINE_RED}>
                    {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandler}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </VStack>
    )

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack gap={'8'} align={'center'}>
                <Text text={title}/>
                <StarRating selectedStars={rate} onSelect={onSelectStars}/>
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    {modalContent}
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy>
                    {modalContent}
                </Drawer>
            </MobileView>
        </Card>
    );
});
