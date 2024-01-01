import { Article } from '../../model/types/articleTypes';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article
}
