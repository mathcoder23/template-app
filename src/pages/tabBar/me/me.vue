<template>
	<view>
		<!--<scroll-view scroll-y class="scrollPage">-->
			<!--<view class="UCenter-bg">-->
				<!--<image src="/images/logo.png" class="png" mode="widthFix"></image>-->
				<!--<view class="text-xl">记忆统计-->
					<!--<text class="text-df">v2.0</text>-->
				<!--</view>-->
				<!--<view class="margin-top-sm">-->
					<!--<text>By:小狐</text>-->
				<!--</view>-->
				<!--<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>-->
			<!--</view>-->


		<!--</scroll-view>-->
		<view class="me-top">

			<view class="bar flex justify-between">
<!--				<button class="cu-btn round bg-reg">签到</button>-->
<!--				<text class="cu-tag" v-if="isDev">测试服</text>-->
			</view>
			<view class="name text-xl">{{isLogin?userSession.username:'点击登陆'}}</view>
			<view class="info">
				<view class="cu-avatar  avater round" :style="'background-image:url('+avater+');'" @click="clickAvater"></view>
				<view class="cu-item shadow-warp content">
					<view class="padding flex text-center text-grey bg-white " style="border-radius: 20upx;height:inherit;padding-top:60upx;padding-bottom:60upx;">
						<view @click="clickMeans" class="flex flex-sub flex-direction solid-right solid-left">
							<text class="mr-icon-shenjing " style="font-size:27rpx;">神经元</text>
							<view class="text-xxl text-orange">
								{{userMeans | filterMeans}}
							</view>

						</view>
						<view @click="clickCapacity" class="flex flex-sub flex-direction solid-right">
							<text class="mr-icon-shenjing " style="font-size:27rpx;">原力</text>
							<view class="text-xxl " style="color:#536dfe">
								{{userMeans | filterCapacity}}
							</view>
						</view>
					</view>
					<view class='margin text-left' v-if="userSession.notifyCid">cid:{{userSession.notifyCid}}</view>
				</view>

			</view>
			<!--<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>-->

		</view>
		<view class="fix">

		</view>
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">

<!--			<view class="cu-item " @click="deving">-->
<!--				<wx-form-id></wx-form-id>-->
<!--				<button class="cu-btn content" >-->
<!--					<text class="cuIcon-vip text-cyan"></text>-->
<!--					<text class="text-grey">记忆分析</text>-->
<!--				</button>-->
<!--			</view>-->
<!--			<view class="cu-item " @click="deving">-->
<!--				<wx-form-id></wx-form-id>-->
<!--				<button class="cu-btn content" >-->
<!--					<text class="cuIcon-recharge text-cyan"></text>-->
<!--					<text class="text-grey">记忆消费</text>-->
<!--				</button>-->
<!--			</view>-->
<!--			<view class="cu-item " @click="deving">-->
<!--				<wx-form-id></wx-form-id>-->
<!--				<button class="cu-btn content" >-->
<!--					<text class="cuIcon-evaluate text-cyan"></text>-->
<!--					<text class="text-grey">我的邀请码</text>-->
<!--				</button>-->
<!--			</view>-->

		</view>

		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">

			<view class="cu-item arrow">
				<navigator class="content" url="/pages/other/help" hover-class="none">
					<text class="cuIcon-creativefill text-orange"></text>
					<text class="text-grey">使用帮助</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="feedback">
					<text class="cuIcon-writefill text-cyan"></text>
					<text class="text-grey">意见反馈</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-people text-cyan"></text>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item arrow" >
				<navigator class="content" url="/pages/other/about" hover-class="none">
					<text class="cuIcon-brandfill text-orange"></text>
					<text class="text-grey">关于小狐记忆V1.0.2</text>
				</navigator>
			</view>

			<view class="cu-item" v-if="isLogin" @click="logout">
				<navigator class="content" url="/pages/about/test/list" hover-class="none">
					<text class="cuIcon-exit text-orange"></text>
					<text class="text-grey">退出登陆</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>



    import UserSessionStore from "../../../store/UserSessionStore";

	export default {
        mounted() {


        },
        onShow(){
            this.refresh()
		},
		mixins:[UserSessionStore],
        methods: {
            deving(){
              toast('程序员加班中..')
			},
            refresh(){

                if(this.isLogin){

                    // this.updateUserMeans()
                }else{
                    this.userMeans = null
                    this.userInfo = null
					this.avater = 'https://mr-resource.oss-cn-hangzhou.aliyuncs.com/app/me/login.png'
				}
			},
            logout(){
                uni.showModal({
                    title: '提示',
                    content: '确定退出登陆？',
                    success:  (res)=> {
                        if (res.confirm) {
                        	this.logoutUser()
							this.refresh()
                        }
                    }
                });


            },
            clickAvater(){
				if(!this.isLogin){
                    uni.navigateTo({
                            url:'/pages/login/PfLogin',
                            complete:(e)=>{
                                console.log(e)
                            }
                        })
				}
			},

        },
        data() {
            return {
                isDev:false,
                userMeans:null,
                avater:'https://mr-resource.oss-cn-hangzhou.aliyuncs.com/app/me/login.png'
            };
        },
        watch: {},
        computed: {},
        filters: {
            filterMeans(userMeans){
                if(userMeans != null && typeof userMeans === "object"){
                    return userMeans.means+"g"
                }
                return "--"
			},
            filterCapacity(userMeans){

                if(userMeans != null && typeof userMeans === "object"){
                    return userMeans.capacity + userMeans.capacityTmp
                }
                return "--"
			},

		},
        components: {},
	}
</script>

<style lang="scss">
	.me-top{
		width:100%;
		height:350upx;
		background-color:#4caf4f;
		padding:20upx;
		position:relative;
		.bg-reg{
			background-color: #536dfe;
			color:white;
			height:50upx;
		}
		.name{
			text-align:center;
			color:white;
			padding-bottom:30upx;
		}
		.info{
			z-index:10;
			text-align: center;
			position:relative;
			.avater{
				border:5upx solid white;
				z-index: 100;
				width:160upx;
				height:160upx;
				background-color:white;

			}
			.content{
				border-radius: 20upx;
				top:-40upx;
				width:100%;
				height:200upx;
				background-color:white;
			}

		}
		.gif-wave{
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index: 1;
			mix-blend-mode: screen;
			height: 100rpx;
		}
	}
	.fix{
		whidth:100%;
		height:100upx;
	}
	.UCenter-bg {
		background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
		background-size: cover;
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave{
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,.mapBox{
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,.mapBox{
		width: 750rpx;
		height: 300rpx;
	}
</style>
