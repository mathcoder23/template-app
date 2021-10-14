import {apiGet, apiPost} from "./baseApi";
let prefix = '/api/user'
let getUserInfo = ()=>{
    return apiGet(prefix + '/info')
}
let updateNotifyCid = (cid)=>{
    return apiPost(prefix + '/updateNotifyCid',null,{notifyCid:cid})
}
export const UserInfoApi = {
    getUserInfo:getUserInfo,
    updateNotifyCid:updateNotifyCid,
}
