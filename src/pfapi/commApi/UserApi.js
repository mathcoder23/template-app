/**
*  该代码全为自动生成，为了不影响代码的持续生成，请谨慎主动修改代码
*  version:
*  date:  2020-11-04 13:36:21
*  mbg-author: Petty Fox
*  generate-tool-by: Swagger2Js https://gitee.com/mathcoder23/swagger2-js-api
*/
import {PFApi} from "../api/baseApi";

let apiPrefix = '/commApi/user'
    /**
    * function:
    *  getVerifyCode
    * params:
	*[
	*	{
	*		"in":"query",
	*		"name":"sessionId",
	*		"description":"sessionId",
	*		"type":"string",
	*		"required":true
	*	}
	*]

    * body:

    * response:
	*{
	*	"type":"object",
	*	"title":"RestObjectResponse«string»_1",
	*	"properties":{
	*		"msg":{
	*			"type":"string"
	*		},
	*		"code":{
	*			"format":"int32",
	*			"type":"integer"
	*		},
	*		"data":{
	*			"type":"string"
	*		},
	*		"errmsg":{
	*			"type":"string"
	*		},
	*		"bcode":{
	*			"format":"int32",
	*			"type":"integer"
	*		}
	*	}
	*}

    *
    */
    let getVerifyCode = (params) => {
        return PFApi.apiGet(
        {
            uri: apiPrefix + '/getVerifyCode'
        }, params)
    }
    /**
    * function:
    *  register
    * params:
	*[]

    * body:
	*{
	*	"type":"object",
	*	"title":"RegisterUserVo",
	*	"properties":{
	*		"verifyCode":{
	*			"type":"string"
	*		},
	*		"referralCode":{
	*			"type":"string"
	*		},
	*		"passwordHashBase64":{
	*			"type":"string"
	*		},
	*		"sessionId":{
	*			"type":"string"
	*		},
	*		"username":{
	*			"type":"string"
	*		}
	*	}
	*}

    * response:
	*{
	*	"type":"object",
	*	"title":"RestObjectResponse«string»_1",
	*	"properties":{
	*		"msg":{
	*			"type":"string"
	*		},
	*		"code":{
	*			"format":"int32",
	*			"type":"integer"
	*		},
	*		"data":{
	*			"type":"string"
	*		},
	*		"errmsg":{
	*			"type":"string"
	*		},
	*		"bcode":{
	*			"format":"int32",
	*			"type":"integer"
	*		}
	*	}
	*}

    *
    */
    let register = (body,params) => {
        return PFApi.apiPost(
			 apiPrefix + '/register', body,params)
    }
    let userLogin = (username,password)=>{
    	return PFApi.apiPost('/oauth/token',null,{
			grant_type:'username',
			username:username,
			password:password,
			client_id:'username',
			client_secret:'123456'
		})
	}
export const UserApi = {
    /**
     *
     */
    getVerifyCode:getVerifyCode,
    /**
     *
     */
    register:register,
	userLogin:userLogin,
}
