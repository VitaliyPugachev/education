import { Article, ArticleView } from 'entities/Articles';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading: boolean;
    error: string;

    view: ArticleView;
}
