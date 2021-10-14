<template>
    <view class="content">

        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">每日添加统计</text>
            </view>
        </view>
        <view>
            <h5-echarts
                    ref="chartCard"
                    :option="ec"
            />
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                <text class="text-xl text-bold">每日复习统计</text>
            </view>
        </view>
        <view>
            <h5-echarts
                    ref="chartReview"
                    :option="ec2"
            />
        </view>
        <view>

        </view>
    </view>
</template>

<script>


    import H5Echarts from "../../../comm/echarts/h5-echarts";
    import {CardApi} from "../../../pfapi/api/CardApi";
    import {CardReviewApi} from "../../../pfapi/api/CardReviewApi";

    export default {
        components: { H5Echarts},
        data() {
            return {
                ec: {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}\r\n{c0}个',
                        axisPointer: {
                            type: 'line',
                            axis: 'x',
                            label: {
                                backgroundColor: '#000000'
                            }
                        }
                    },
                    grid: {
                        left: '6%',
                        right: '6%',
                        top: '6%',
                        bottom: '6%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            // y轴
                            show: false
                        },
                        axisTick: {
                            // y轴刻度线
                            show: false
                        },
                        splitLine: {
                            // 网格线
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            // y轴
                            show: false
                        },
                        axisTick: {
                            // y轴刻度线
                            show: false
                        },
                        splitLine: {
                            // 网格线
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                color: '#EF5959'
                            },
                            data: []
                        }
                    ]
                },ec2: {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}\r\n{c0}个',
                        axisPointer: {
                            type: 'line',
                            axis: 'x',
                            label: {
                                backgroundColor: '#000000'
                            }
                        }
                    },
                    grid: {
                        left: '6%',
                        right: '6%',
                        top: '6%',
                        bottom: '6%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            // y轴
                            show: false
                        },
                        axisTick: {
                            // y轴刻度线
                            show: false
                        },
                        splitLine: {
                            // 网格线
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            // y轴
                            show: false
                        },
                        axisTick: {
                            // y轴刻度线
                            show: false
                        },
                        splitLine: {
                            // 网格线
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                color: '#EF5959'
                            },
                            data: []
                        }
                    ]
                },

            }
        },
        onShow() {
            this.updateAnalysisCreateCard()
            this.updateAnalysisReviewCard()

        },
        methods: {
            updateAnalysisCreateCard() {
                CardApi.analysisCreateCard().then(rep=>{
                    let xList = []
                    let yList = []
                    let data = rep.data
                    if(data && data.length>0){
                        for(let item of data){
                            xList.push(item.xaxis.substr(5))
                            yList.push(item.yaxis)
                        }
                    }
                    this.ec.xAxis.data = xList
                    this.ec.series[0].data = yList
                    this.$refs['chartCard'].update()

                })
            },
            updateAnalysisReviewCard() {
                CardReviewApi.analysisReviewCard().then(rep=>{
                    let xList = []
                    let yList = []
                    let data = rep.data
                    if(data && data.length>0){
                        for(let item of data){
                            xList.push(item.xaxis.substr(5))
                            yList.push(item.yaxis)
                        }
                    }
                    this.ec2.xAxis.data = xList
                    this.ec2.series[0].data = yList
                    this.$refs['chartReview'].update()

                })
            }
        }
    }
</script>

<style>

</style>
