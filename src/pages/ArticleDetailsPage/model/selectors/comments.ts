import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsCommentIsLoading = (
    state: StateSchema,
) => state.articleDetailsComment?.isLoading;
export const getArticleDetailsCommentError = (
    state: StateSchema,
) => state.articleDetailsComment?.error;
