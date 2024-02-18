import { EntityState } from '@reduxjs/toolkit';
import { CustomComment } from '@/entities/Comment';

export interface ArticleDetailsCommentSchema extends EntityState<CustomComment>{
    isLoading?: boolean;
    error?: string;
    data?: CustomComment[];
}
