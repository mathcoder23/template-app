<template>
	<view class="content">

		<view>
			<button @click="updateCard">刷新卡片</button>
		</view>
		<view>

		</view>
	</view>
</template>

<script>

	import {CardApi} from "../../../pfapi/api/CardApi";

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {


		},
		methods: {
			updateCard(){
				CardApi.getList().then((rep)=>{
					console.log(rep)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
