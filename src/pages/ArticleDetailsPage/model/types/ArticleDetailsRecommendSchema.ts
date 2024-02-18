import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Articles';

export interface ArticleDetailsRecommendSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;
}
