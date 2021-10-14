//http请求
export const httpRequest = (resolve,reject,config) =>{
    uni.request({
        url:config.url,
        method:config.method,
        data:config.data,
        header:config.headers,
        success:(rep)=>{
            rep.config = config
            resolve(rep)
        },
        fail:(rep)=>{
            reject(rep)
        }
    })
}
/**
 * 文件上传
 * @param filePath
 * @param data
 * @param resolve
 * @param reject
 */
export const httpUpload = (filePath,data,resolve,reject,req) => {
    let headers = {
        "Content-type":"application/json"
    }
    headers = Object.assign(headers,req.headers)
    console.log('upload headers:',headers)
    return uni.uploadFile({
        url: req.url, // 仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        formData: data,
        header:headers,
        success:(res)=> {
            let data = JSON.parse(res.data)
            resolve(data)
        },
        fail:(err)=>{
            reject(err)
        }
    })
}