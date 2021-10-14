import axios from  "../core/axios.min"
import {requestHandler, responseHandler} from "./intercept";
import {httpRequest} from "../core/adapter";

let uri =  'http://118.89.125.149:8085'
if(window.location.protocol === 'https:'){
    uri = 'https://s1.pettyfox.top:4443'
}
let request = axios.create({
    baseURL: uri,
    // baseURL: 'http://172.16.10.187:9099',
    timeout: 30000,
    // responseType: 'json',
    // validateStatus:()=>{return true}
});
request.interceptors.request.use(requestHandler)
request.interceptors.response.use(responseHandler)

axios.defaults.adapter = function (config) {
    return new Promise ((resolve, reject) => {
        httpRequest(resolve,reject,config)
    })
}
export const apiGet = (uri,params)=>{
    return request.get(uri,{
        params:params
    })
}
export const apiPost = (uri,data,params)=>{
    return request.post(uri,data,{params:params})
}

export const PFApi = {
    apiPost:apiPost,
    apiGet:apiGet
}
