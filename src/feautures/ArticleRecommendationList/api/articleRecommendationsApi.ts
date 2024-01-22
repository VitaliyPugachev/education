import {rtkApi} from "shared/api/rktQueryApi";

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
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
