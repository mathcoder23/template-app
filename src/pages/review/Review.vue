<template>
    <view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">问题</text>
            </view>
            <view class="action">
                <switch :checked="showAnswer" @change="changeShow"/>
            </view>
        </view>
        <view class="margin text-xl text-bold">
            {{item.question}}
        </view>
        <template v-if="showAnswer">
            <view class="cu-bar bg-white">
                <view class="action">
                    <text class="cuIcon-titles text-green"></text>
                    <text class="text-xl text-bold">答案</text>
                </view>
            </view>
            <view class="margin text-xl text-bold">
                {{item.answer}}
            </view>
        </template>

        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">结果</text>
            </view>
        </view>
        <view class="margin">
            <view>创建时间：{{item.createTime}}</view>
            <view>复习时间：{{item.nextReviewTime}}({{nextFormat(item.nextReviewTime)}})</view>
            <view>已复习次数：{{item.reviewCount}}</view>
            <view>记忆进度：{{item.memoryProgress}}</view>
        </view>
        <view class="cu-bar">
            <view class="action">
                <button @click="clickMode1" :type="currentMode1?'primary':''">记住了</button>
            </view>
            <view class="action">
                <button @click="clickMode2" :type="currentMode1?'':'primary'">忘记了</button>
            </view>
        </view>

        <view class="cu-form-group margin-top">
            <view class="title">记忆进度</view>
            <input v-model='review.progress' @input='changeProgress' placeholder="记忆进度"/>
        </view>
        <view class="cu-form-group margin-top">
            <view class="title">间隔时间</view>
            <input v-model='review.spaceMin' @input="changeSpace" placeholder="间隔分钟数"/>
        </view>

        <view class="margin">
            下次复习间隔：{{nextFormat(review.time)}}
        </view>
        <view class="margin">
            <button type='primary' @click="clickReview">确认复习(选择上方按钮后点击)</button>
        </view>
        <view class="cu-bar bg-white margin-top margin-bottom">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">说明-记忆进度参考</text>
            </view>
        </view>
        <view>
            <view v-for="(item,index) in strategy">
                {{index}}-{{item.label}}({{item.value}})
            </view>
        </view>
    </view>
</template>

<script>
    import {CardApi} from "../../pfapi/api/CardApi";
    import {TimeTools} from "../../comm/utils/TimeTools";

    export default {
        name: "Review",
        data() {
            return {
                strategy: [{label: '20分钟', value: 20}
                    , {label: '1小时', value: 60}
                    , {label: '8小时', value: 8 * 60}
                    , {label: '1天', value: 24 * 60}
                    , {label: '2天', value: 2 * 24 * 60}
                    , {label: '6天', value: 6 * 24 * 60}
                    , {label: '15天', value: 15 * 24 * 60}
                    , {label: '一个月', value: 30 * 24 * 60}
                ],
                item: {},
                review: {
                    time: 0
                },
                currentMode1: false,
                showAnswer: false
            }
        }
        , onLoad(options) {
            CardApi.get(options.id).then(rep => {
                console.log(rep)
                let obj = rep.data
                this.item = obj
                this.clickMode1()
            })
        },
        methods: {
            clickMode1() {
                this.currentMode1 = true
                let nextProgress = this.item.memoryProgress + 1
                let nextMin = this.strategy[nextProgress].value
                let time = new Date().getTime() + nextMin * 60 * 1000
                this.review.time = time
                this.review.memoryDegree = 100
                this.review.spaceMin = nextMin
                this.review.progress = nextProgress
            },
            clickMode2() {
                this.currentMode1 = false
                let nextProgress = this.item.memoryProgress - 1
                if (nextProgress < 0) {
                    nextProgress = 0
                }
                let nextMin = this.strategy[nextProgress].value
                let time = new Date().getTime() + nextMin * 60 * 1000
                this.review.time = time
                this.review.memoryDegree = 0
                this.review.spaceMin = nextMin
                this.review.progress = nextProgress
            },
            changeProgress(e) {
                this.review.progress = e.detail.value
            },
            changeSpace(e) {
                this.review.spaceMin = e.detail.value
                let time = new Date().getTime() + this.review.spaceMin * 60 * 1000
                this.review.time = time
            },
            nextFormat(next) {
                return TimeTools.formatNextTime(next)
            },
            changeShow(v) {
                this.showAnswer = v.detail.value
            },
            clickReview() {
                CardApi.review(this.item.id, this.review.spaceMin, this.review.progress, this.review.memoryDegree).then(rep => {
                    console.log(rep)
                    uni.navigateBack({
                        delta: 1
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>
