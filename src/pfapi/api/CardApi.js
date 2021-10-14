import {apiGet, apiPost} from "./baseApi";

let getList = (param)=>{
    return apiGet('/api/card/memory-simple-card/list2',param)
}
let get = (id)=>{
    return apiGet('/api/card/memory-simple-card/get',{
        id:id
    })
}
let analysisCreateCard = ()=>{
    return apiGet('/api/card/memory-simple-card/analysisCreateCard',{

    })
}
let save = (data)=>{
    return apiPost('/api/card/memory-simple-card/save',data)
}
let remove = (id)=>{
    return apiPost('/api/card/memory-simple-card/delete?ids='+id)
}
let review = (id,nextMin,progress,memoryDegree)=>{
    return apiPost('/api/card/memory-simple-card/review',{
        cardId:id,
        nextReviewSpaceMin:nextMin
        ,memoryProgress:progress
        ,memoryDegree:memoryDegree
    })
}
export const CardApi = {
    getList:getList
    ,save:save
    ,get:get
    ,analysisCreateCard:analysisCreateCard
    ,review:review
    ,remove:remove
}
