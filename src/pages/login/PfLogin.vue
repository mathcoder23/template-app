<template>
        <view class="bg-white login">
            <view class="head">
                <view class=" cu-avatar lg  avater round" :style="'background-image:url('+avater+');'" @click="clickAvater"></view>
            </view>
            <scroll-view scroll-x class="bg-white nav solid-top">
                <view class="flex text-center">
<!--                    <view class="cu-item flex-sub  " :class="tab=='wxlogin'?'text-blue cur':''" @click="switchTab('wxlogin')">-->
<!--                        微信快捷登录-->
<!--                    </view>-->
                    <view class="cu-item flex-sub  " :class="tab=='login'?'text-blue cur':''" @click="switchTab('login')">
                        账号密码登录
                    </view>
<!--                    <view class="cu-item flex-sub  " :class="tab=='register'?'text-blue cur':''" @click="switchTab('register')">-->
<!--                        账号密码注册-->
<!--                    </view>-->
                    <!--<view class="cu-item flex-sub " :class="tab!='login'?'text-blue cur':''" @click="switchTab('phone')">-->
                        <!--手机号登录-->
                <!--</view>-->

                </view>
            </scroll-view>
            <view class="user" v-if="tab==='login'">
                <view class="text shadow">
                    <text class="mr-icon-user"></text>

                    <input  placeholder="输入用户名" v-model="username" maxlength="20"/>

                </view>
                <view class="text shadow ">
                    <text class="mr-icon-pwd"></text>

                    <input placeholder="输入密码" password='password' v-model="password" maxlength="20"/>
                </view>
                <view class="btn">
                    <button class="cu-btn block btn-login margin-tb-sm " :class="{'disable': !isUserLogin}" style="width:50%;margin:0 auto;" @click="clickLogin">
                        登录
                    </button>
                </view>

            </view>
            <view class="user" v-if="tab==='register'">
                <view class="text shadow">
                    <text class="mr-icon-user"></text>

                    <input  placeholder="输入用户名4~20位" v-model="registerUser.username" maxlength="20"/>

                </view>
                <view class="text shadow ">
                    <text class="mr-icon-pwd"></text>

                    <input placeholder="输入密码" password='password' v-model="registerUser.password" maxlength="20"/>
                </view>

                <view class="btn">
                    <button class="cu-btn block btn-login margin-tb-sm " :class="{'disable':!isLogin }" style="width:50%;margin:0 auto;" @click="clickRegister">
                        注册
                    </button>
                </view>

            </view>
            <view class="user" v-if="tab==='phone'">
                <view class="text shadow">
                    <text class="mr-icon-user"></text>
                    <input  placeholder="手机号" v-model="username" maxlength="20"/>
                    <label class="" >发送验证码</label>

                </view>
                <view class="text shadow ">
                    <text class="mr-icon-key"></text>
                    <input placeholder="输入验证码" password='password' v-model="password" maxlength="20"/>
                </view>


            </view>
            <view class="user" v-if="tab==='wxlogin'">
                <view class="proted" style="margin-top:120upx">

<!--                    <checkbox-group @change='changeBox'>-->
<!--                        <checkbox :value="isLogin" :checked="isLogin" style="line-height: 80rpx;transform:scale(0.4)" @change/>-->
<!--                       同意-->
<!--                        <text class="link" @click="clickProA">小狐软件许可及服务协议</text>和<text class="link" @click="clickProB">小狐用户隐私政策</text>-->


<!--                    </checkbox-group>-->
                </view>
                <view class="btn">

                    <button class="cu-btn block bg-green margin-tb-sm " @click="clickWxLogin">
                        微信快捷登录

                    </button>
                </view>

            </view>



            <view class="bottom"></view>
        </view>

</template>

<script>


    import {UserApi} from "../../pfapi/commApi/UserApi";
    import UserSessionStore from "../../store/UserSessionStore";

    export default {
        name: "PfLogin",
        mounted() {

        },
        mixins:[UserSessionStore],
        methods: {
            clickRegister(){
                if(!this.isLogin) {
                    uni.showToast({
                        title: '请先阅读协议并同意协议',
                        duration: 2000,
                        icon:"none"
                    })
                    return
                }
                if(this.registerUser && this.registerUser.username.length>0 && this.registerUser.password.length>0){
                    uni.showLoading({
                        title: '注册中...'
                    });
                    UserApi.register(this.registerUser).then((rep)=>{
                        let rp = rep
                        if(rp.code === 0){
                            uni.showToast({
                                title: '正在自动登录',
                                duration: 2000
                            });
                            this.username = this.registerUser.username
                            this.password = this.registerUser.password
                            this.clickLogin()
                        }else{

                            uni.showToast({
                                title: rp.errmsg,
                                duration: 2000,
                                icon:"none"
                            });
                        }
                    }).finally(()=>{
                        uni.hideLoading()
                    })

                }else{
                    uni.showToast({
                        title: '请输入账号或密码',
                        duration: 2000,
                        icon:"none"
                    });
                }
            },
            clickLogin(){
                UserApi.userLogin(this.username,this.password).then(rep=>{
                    console.log('aaa',rep)
                    if(rep.code === 0){
                        uni.showToast({
                            title:'登录成功，跳转中...',
                            duration: 2000,
                        });
                        let token = rep.data.access_token
                        uni.setStorageSync('access_token', token);
                        // window.location = location.origin + location.pathname + '?access_token=' + token+'&cid='+this.runtimeEnv.cid
                        this.loadUserLogin(token,()=>{
                            uni.navigateBack({
                                delta: 1
                            });
                        })
                    }else{
                        uni.showToast({
                            title: rep.data.errmsg,
                            duration: 2000,
                            icon:"none"
                        });
                    }
                }).catch(e=>{
                    uni.showToast({
                        title: '账号或密码错误',
                        duration: 2000,
                        icon:"none"
                    });
                })

            },
            changeBox(e){
                let v = e.detail.value.length>0
                this.isLogin = v
            },
            switchTab(tab){
                this.tab = tab
            }
        },
        data() {
            return {
                tab:'login',
                username:'',
                password:'',
                avater:'https://mr-resource.oss-cn-hangzhou.aliyuncs.com/app/me/logo.png',
                isLogin:true,
                isUserLogin:false,
                registerUser:{
                    username:'',
                    password:''
                }
            };
        },
        watch: {
            username(u){
                if(u.length === 0){
                    this.isUserLogin = false
                }else{
                    if(this.password.length===0){
                        this.isUserLogin = false
                    }else{
                        this.isUserLogin = true
                    }
                }
            },
            password(p){

                if(p.length === 0){
                    this.isUserLogin = false
                }else{
                    if(this.username.length===0){
                        this.isUserLogin = false
                    }else{
                        this.isUserLogin = true
                    }
                }
            }
        },
        computed: {},
        filters: {},
        components: {},

    }
</script>

<style lang="scss" >
    page{
        height:100%
    }
    .login{
        height:100%;
        .disable {
            background-color:#f1f1f1 !important;
            color:black !important;

        }
        .btn-login{
            background-color:#fc6d25;
            color:white;
        }
        .head{
            width:100%;
            text-align: center;
            padding-top:60px;
            padding-bottom:60px;
        }
        .proted{
            text-align:center;
        }
        .link{
            color:#389fff;
        }
        .user{
            width:100%;
            .text{
                width:60%;
                border: none;
                border-radius: 40px ;
                -webkit-box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
                box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 100upx; /* Input 高度 */
                color: #333333;
                padding: 32upx;
                margin:24upx auto;
                input{
                    flex: 1;
                    text-align: left;
                    font-size: 28upx;
                    /* line-height: 100upx; */
                    padding-right: 10upx;
                    margin-left: 20upx;
                }
            }
        }
        .btn{
            margin-top:60upx;
        }
    }
</style>
