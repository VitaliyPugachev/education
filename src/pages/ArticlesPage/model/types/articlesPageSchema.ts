import { Article, ArticleView } from '@/entities/Articles';
import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types';
import {ArticleSortField, ArticleType} from "@/entities/Articles/model/consts/consts";

export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading: boolean;
    error: string;

    view: ArticleView;
    limit: number;
    page: number;
    hasMore: boolean;
    _inited: boolean;

    // filters
    order?: SortOrder;
    sort?: ArticleSortField;
    search?: string;
    type?: ArticleType

}
