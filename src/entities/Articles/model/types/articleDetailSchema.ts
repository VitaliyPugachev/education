import { Article } from 'entities/Articles';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article
}
