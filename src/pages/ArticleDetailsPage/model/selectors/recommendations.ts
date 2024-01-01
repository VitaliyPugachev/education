import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendIsLoading = (state: StateSchema) => {
    return state.articleDetailsRecommendations?.isLoading || false;
};
export const getArticleDetailsRecommendError = (state: StateSchema) => state.articleDetailsRecommendations?.error || '';
