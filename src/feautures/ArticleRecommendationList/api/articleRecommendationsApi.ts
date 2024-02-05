import {rtkApi} from "shared/api/rktQueryApi";
import {Article} from "entities/Articles";

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit
                }
            })
        })
    })
})

export const useGetArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
