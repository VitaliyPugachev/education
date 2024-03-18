import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import {useTranslation} from 'react-i18next';
import React, {memo, ReactSVG, useState} from 'react';
import {Icon} from "@/shared/ui/Icon/Icon";
import StarIcon from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starNumber: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        selectedStars = 0,
        size = 30,
        onSelect
    } = props;
    const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const {t} = useTranslation();

    const onHover = (starNumber: number) => () => {
        if (!isSelected) {
            setCurrentStarCount(starNumber);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarCount(0);
        }
    };

    const onClick = (startNumber: number) => () => {
        if (!isSelected) {
            onSelect?.(startNumber);
            setCurrentStarCount(currentStarCount);
            setIsSelected(true);
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map(starNumber => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        {[cls.selected]: isSelected},
                        [currentStarCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    );
});
