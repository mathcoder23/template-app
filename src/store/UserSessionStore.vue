<template>

</template>

<script>
    import {mapState} from "vuex";
    import {UserInfoApi} from "../pfapi/api/UserInfoApi";

    export default {
        name: "UserSessionStore",
        computed: {
            ...mapState({
                userSession: state => state.userSession,
                isLogin:state=> state.isLogin,
                runtimeEnv:state=>state.runtimeEnv
            })
        },
        methods: {
            parseUrlParam(key,search){
                let reg = new RegExp('[\?\&]' + key + '=([^\&]*)(\&?)', 'i')
                let r = search.match(reg)
                return r ? r[1] : ''
            },
            initUserStore() {
                //解析url参数，通过access_token获取用户会话
                let search = location.search
                if (search && search.length > 0) {
                    this.loadRuntimeEnv(search)
                    let accessToken = this.parseUrlParam('access_token',search)
                    if(accessToken){
                        uni.showLoading({
                            title: '验证用户中...'
                        });
                        //验证token
                        console.log('accessToken', accessToken)
                        this.loadUserLogin(accessToken)
                    }
                }

                //本地存储登录信息
                let token = uni.getStorageSync('access_token');
                if(token){
                    uni.showLoading({
                        title: '验证用户中...'
                    });
                    //验证token
                    console.log('accessToken', token)
                    this.loadUserLogin(token)
                }

            },
            logoutUser(){
                uni.clearStorageSync()
                this.$store.commit('changeUserSession',{})
                window.accessToken = ''
            },
            loadUserLogin(accessToken,cb){
                window.accessToken = accessToken
                UserInfoApi.getUserInfo().then(data => {
                    if (data.code === 0) {
                        this.$store.commit('changeUserSession',data.data)
                        uni.hideLoading()
                        if('function' === typeof cb){
                            cb()
                        }
                        if(this.runtimeEnv.cid && this.userSession.notifyCid !== this.runtimeEnv.cid){
                            //更新cid
                            UserInfoApi.updateNotifyCid(this.runtimeEnv.cid).then(rep=>{
                                UserInfoApi.getUserInfo().then(data => {
                                    if (data.code === 0) {
                                        this.$store.commit('changeUserSession',data.data)
                                    }else{
                                        window.accessToken = ''
                                    }
                                }).catch(e=>{
                                    window.accessToken = ''
                                })
                            })
                        }
                    }else{
                        window.accessToken = ''
                    }
                }).catch(e=>{
                    window.accessToken = ''
                })
            },
            loadRuntimeEnv(search){
                //装载运行时环境
                let cid = this.parseUrlParam('cid',search)
                if(cid){
                    this.$store.commit('changeRuntimeEnv',Object.assign(this.runtimeEnv,{
                        cid:cid
                    }))
                    // if(this.userSession.notifyCid !== cid){
                    //     //更新cid
                    //     UserInfoApi.updateNotifyCid(cid).then(rep=>{
                    //         UserInfoApi.getUserInfo().then(data => {
                    //             if (data.code === 0) {
                    //                 this.$store.commit('changeUserSession',data.data)
                    //             }else{
                    //                 window.accessToken = ''
                    //             }
                    //         }).catch(e=>{
                    //             window.accessToken = ''
                    //         })
                    //     })
                    // }
                }
            }
        }
    }
</script>

<style scoped>

</style>
