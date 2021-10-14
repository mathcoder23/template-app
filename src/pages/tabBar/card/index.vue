<template>
    <view>

        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">创建卡片</text>
            </view>
        </view>
        <form>
            <view class="cu-form-group margin-top">
                <view class="title">问题</view>
                <input v-model='crateForm.question' placeholder="输入问题"/>
            </view>
            <view class="cu-form-group margin-top">
                <view class="title">答案</view>
                <input v-model='crateForm.answer' placeholder="输入答案"/>
            </view>
            <view class="margin">
                <button type='primary' @click="clickCreate">创建</button>
            </view>
        </form>
        <view class="cu-list margin menu">
            <view class="cu-form-group">
                <view class="title">创建时间排序</view>
                <switch class="orange radius sm" :checked="search.orderCreateDesc"
                        @change="e=>{changeFilter(e,'orderCreateDesc')}"></switch>
            </view>
            <view class="cu-form-group">
                <view class="title">复习时间排序</view>
                <switch class="orange radius sm" :checked="search.orderReviewAsc"
                        @change="e=>{changeFilter(e,'orderReviewAsc')}"></switch>
            </view>
            <view class="cu-form-group">
                <view class="title">仅显示过期</view>
                <switch class="orange radius sm" :checked="search.onlyReviewExpire"
                        @change="e=>{changeFilter(e,'onlyReviewExpire')}"></switch>
            </view>
            <view class="cu-form-group">
                <view class="title">仅显示不过期</view>
                <switch class="orange radius sm" :checked="search.onlyReviewNotExpire"
                        @change="e=>{changeFilter(e,'onlyReviewNotExpire')}"></switch>
            </view>

        </view>
        <view class="cu-bar bg-white margin-top margin-bottom">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">卡片列表</text>
            </view>
        </view>
        <view>
            <view class="cu-list menu">
                <view class="cu-item " v-for="item in list" @click="clickItem(item)" @longpress="clickDel(item)">

                    <view class="content">
                        <view class="text-grey">{{item.question}}</view>
                        <view class="text-gray text-sm flex">
                            <text class="text-cut">
                                {{item.createTime}}
                            </text>
                        </view>
                    </view>
                    <view class="action text-sm" :class="{'text-red':isExpire(item)}"
                          @click.stop="clickReview(item)">
                        {{showState(item)}}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

    import {CardApi} from "../../../pfapi/api/CardApi";
    import H5Echarts from "../../../comm/echarts/h5-echarts";

    export default {
        components: {H5Echarts},
        data() {
            return {
                title: 'Hello',
                crateForm: {},
                list: [],
                search: {
                    orderCreateDesc: false,
                    orderReviewAsc: true,
                    onlyReviewExpire: true,
                    onlyReviewNotExpire: false,
                    pageSize: 100
                }

            }
        },
        onShow() {
            this.updateCard()
        },
        onPullDownRefresh() {
            this.updateCard()
        },
        methods: {
            inited(chart) {
                console.log('图表初始化完毕')
                console.log('chart实例', chart)
            },
            changeFilter(e, b) {
                this.search[b] = e.detail.value
                this.updateCard()
            },
            isExpire(item) {
                if (!item.nextReviewTime) {
                    return false
                }
                let next = new Date(item.nextReviewTime.replace(/\-/g, "/")).getTime()
                let current = new Date().getTime()
                if (next <= current) {
                    return true
                } else {
                    return false
                }
            },
            showState(item) {
                let next = item.nextReviewTime
                let current = new Date()
                if (next) {
                    let date = new Date(next.replace(/\-/g, "/")).getTime() / 1000
                    let cTime = current.getTime() / 1000
                    if (date < cTime) {
                        let d = cTime - date
                        if (d > 24 * 60 * 60) {
                            //day
                            return parseInt(d / (24 * 60 * 60)) + "天前"
                        } else if (d > 60 * 60) {
                            return parseInt(d / (60 * 60)) + "小时前"
                        } else if (d > 60) {
                            return parseInt(d / (60)) + "分钟前"
                        } else {
                            return parseInt(d) + "秒前"
                        }
                    } else {
                        let d = date - cTime
                        if (d > 24 * 60 * 60) {
                            //day
                            return parseInt(d / (24 * 60 * 60)) + "天后"
                        } else if (d > 60 * 60) {
                            return parseInt(d / (60 * 60)) + "小时后"
                        } else if (d > 60) {
                            return parseInt(d / (60)) + "分钟后"
                        } else {
                            return parseInt(d) + "秒后"
                        }
                    }

                } else {
                    return '点击开启复习'
                }
            },
            clickReview(item) {
                uni.navigateTo({
                    url: '/pages/review/Review?id=' + item.id
                });
            },
            clickDel(item) {
                uni.showModal({
                    title: '警告',
                    content: '确定要删除卡片[' + item.question + ']',
                    success: (res) => {
                        if (res.confirm) {
                            CardApi.remove(item.id).then(rep => {
                                this.updateCard()
                            })
                        } else if (res.cancel) {

                        }
                    }
                });
            },
            clickItem(item) {
                this.clickReview(item)
                console.log(item)
            },
            clickCreate() {
                if (typeof this.crateForm.question !== 'string') {
                    uni.showToast({
                        title: '请输入问题',
                        duration: 2000,
                        icon: 'none'
                    });
                    return;
                }
                CardApi.save(this.crateForm).then((rep) => {
                    this.updateCard()
                    this.crateForm = {}
                })
            },
            updateCard() {
                CardApi.getList(this.search).then((rep) => {
                    let list = rep.data.list
                    this.list = list
                    uni.startPullDownRefresh()
                })
            }
        }
    }
</script>

<style>
    .uni-ec-canvas {
        width: 500px;
        height: 200px;
        display: block;
    }
</style>
