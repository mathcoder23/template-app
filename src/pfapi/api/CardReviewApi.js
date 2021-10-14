import {apiGet, apiPost} from "./baseApi";

let analysisReviewCard = ()=>{
    return apiGet('/api/card/memory-simple-card-review/analysisReviewCard',{

    })
}
export const CardReviewApi = {
    analysisReviewCard:analysisReviewCard
}
