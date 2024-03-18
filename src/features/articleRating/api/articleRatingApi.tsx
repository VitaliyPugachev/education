import {rtkApi} from "@/shared/api/rktQueryApi";
import {Rating} from "@/entities/Rating/model/types/ratingTypes";

interface GetArticleRatingParams {
    userId: string;
    articleId: string;
}

interface RateArticleParams {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingParams>({
            query: ({articleId, userId}) => ({
                url: '/articles-rating',
                params: {
                    userId,
                    articleId
                }
            })
        }),
        rateArticle: build.mutation<void ,RateArticleParams>({
            query: (arg) => ({
                url: '/articles-rating',
                method: 'POST',
                body: arg,
            })
        })

    })
})

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
