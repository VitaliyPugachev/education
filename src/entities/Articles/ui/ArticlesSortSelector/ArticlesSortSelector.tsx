import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import cls from './ArticlesSortSelector.module.scss';
import {ArticleSortField} from "entities/Articles/model/consts/consts";

interface ArticlesSortSelectorProps {
    className?: string;
    sort: ArticleSortField,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticlesSortSelector = memo((props: ArticlesSortSelectorProps) => {
    const {
        className, onChangeSort, sort, onChangeOrder, order,
    } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.TITTLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('количеству просмотров'),
        },

    ], [t]);

    return (
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
            <Select
                label={t('Сортировать по')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
