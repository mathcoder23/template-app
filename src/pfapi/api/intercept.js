
/**
 * 请求拦截
 * @param req
 * @returns {Promise<any>}
 */
export const requestHandler = (config)=>{
    return new Promise((resolve,reject)=>{
        if(secretUri(config)){
            if(window.accessToken && window.accessToken.length>0){
                config.headers["Authorization"] = "Bearer "+ window.accessToken
                resolve(config)
            }else{
                // alertLogin()
                resolve(config)
            }
        }else{
            //不需要token
            resolve(config)
        }


    })

}
const secretUri = (config) =>{
    let url = config.url
    if(url.indexOf('/commApi')>-1 || url.indexOf('/oauth') > -1){
        return false
    }
    return true
}
/**
 * 顶级响应拦截，响应体有两级状态码，一个是http的状态码，一个是内容状态吗
 * @param rep
 * @returns {Promise<any>}
 */
export const responseHandler=(rep)=>{
    return new Promise((resolve,reject)=>{

        if(!rep){
            return reject('响应体错误')
        }else{
            //这里的响应码不考虑，http的状态码，只关注内容的状态码
            if(rep.data){
                let response = rep.data
                if("undefined" === typeof response.code){
                    alertServerException()
                    return reject('响应格式错误')
                }
                if(response.code === 401){
                    alertLogin()
                    return reject('未登录')
                }
                resolve(response)

            }else{
                alertServerException()
                return reject('无响应内容')
            }
        }


    })
}
let alertLogin = ()=>{
    if(window.location.hash === '#/pages/login/PfLogin'){
        return
    }
    let text = '请登录'
    if(window.accessToken && window.accessToken.length>0){
        text = '登录过期'
    }
    uni.showModal({
        title:text,
        content: '请跳转至登录',
        success(res) {
            if (res.confirm) {
                uni.navigateTo({
                    url: '/pages/login/PfLogin'
                });
            } else if (res.cancel) {
            }
        }
    })
}
let alertServerException = ()=>{
    uni.showModal({
        title: '服务异常',
        content: '请重试或联系客服',
        success(res) {
            if (res.confirm) {

            } else if (res.cancel) {
            }
        }
    })
}
