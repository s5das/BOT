<template>
    <div class="main" :style="{height: total_h + 'px'}">
        <div class="nums-box">
            <div class="item" v-for="item in nums" :key="item.title">
                <div class="num">{{item.num}}</div>
                <div class="title">{{item.title}}</div>
            </div>
        </div>

        <!-- 分割线 ↓ -->
        <!-- 弹出层 ↓ -->
        <van-popup v-for="item in conditions" :key="item.id" v-model="item.isChoosing" position="top">
            <van-picker :default-index="item.defaultIndex" :title="item.title" show-toolbar :columns="item.choices" @confirm="confirmChosen($event, item)" @cancel="item.isChoosing = false"></van-picker>
        </van-popup>
        
        <van-popup v-model="isInputingBlurSearchKey" position="top">
            <div class="blur-search-box">
                <div class="enter-box">
                    <van-icon class="icon" name="search" size="22px"></van-icon>
                    <input type="text" v-model="blur_search_context" placeholder="请输入关键词"/>
                </div>
                <div class="confirm" @click="confirmBlurKey">搜索</div>
            </div>
        </van-popup>

        <van-popup v-model="isConfirmCancel" closeable>
            <div class="cancel-box">
                <div class="title">
                    是否取消订单
                </div>
                <div class="buttons">
                    <div @click="confirmCancel" class="confirm">确定</div>
                    <div @click="isConfirmCancel = false" class="cancel">取消</div>
                </div>
            </div>
        </van-popup>

        <van-popup v-model="isReallocating" position="top">
            <div class="reallocate-box">
                <div class="enter-box">
                    <van-icon class="icon" name="search" size="22px"></van-icon>
                    <input type="text" @keyup="inputKeyForCourier" v-model="blur_search_context_forCourier" placeholder="请输入派送员名称/手机号"/>
                </div>
                <!-- 派送员列表 -->
                <van-pull-refresh v-model="refreshing_forCourier" @refresh="onRefresh_forCourier">
                    <van-list v-model="loading_forCourier" :finished="finished_forCourier" finished-text="没有更多了" @load="getCourierList">
                        <div class="courier-list">
                            <div @click="courier.courier_id !== orderOnHandling.courier_id && (indexOfCourierChosen = i)" v-for="(courier, i) in courierList" :key="courier.courier_id" :class="['courier', i === indexOfCourierChosen ? 'active' : '', courier.courier_id === orderOnHandling.courier_id ? 'now' : '']">
                                <div class="info">
                                    <div class="img">
                                        <!-- <img :src="courier.avatar_url" style="width: 60px; height: 60px; border-radius: 50%;"/> -->
                                        <img :src="courier.avatar_url" :onerror="defaultAvatar" style="width: 60px; height: 60px; border-radius: 50%;"/>
                                    </div>
                                    <div class="real-name">{{courier.real_name}}</div>
                                </div>
                                <div class="label"></div>
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
                <div @click="confirmAllocate" class="confirm-reallocate">确认分配</div>
            </div>
        </van-popup>
        <!-- 弹出层 ↑ -->
        <!-- 分割线 ↑ -->

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderList">
                <div class="list-box">
                    <div class="select-box">
                        <div class="condition-box">
                            <div @click="item.isChoosing = true" class="item" v-for="item in conditions" :key="item.id">
                                <div class="title"><div>{{item.title}}</div></div>
                                <div class="label"></div>
                            </div>
                        </div>
                        <van-icon class="search-icon" @click="isInputingBlurSearchKey = true" name="search" size="20"></van-icon>
                    </div>
                </div>

                <div class="order" v-for="order in orderList" :key="order.order_id">
                    <div class="status-label">
                        <img :src="require(`@/assets/orderStatus/${order.order_status}.png`)"/>
                    </div>
                    <div class="up">{{order.create_time_string}}</div>
                    <div class="middle">
                        <div class="item">
                            <div class="item-name">快递点:</div>
                            <div class="item-value">{{order.pickup_address}}</div>
                        </div>
                        <div class="item">
                            <div class="item-name">快递件数:</div>
                            <div class="item-value">{{order.num_of_packages}}</div>
                        </div>
                        <div class="item">
                            <div class="item-name">送达时间</div>
                            <div class="item-value">{{order.deliver_time_period_string}}</div>
                        </div>
                        <div class="item">
                            <div class="item-name">快递备注:</div>
                            <div class="item-value">{{order.remarks}}</div>
                        </div>
                        <div class="item highlight">
                            <div class="item-name">付款金额:</div>
                            <img style="width: 12px; height: 15px; margin-right: 3px;" :src="require('@/assets/price.png')"/>
                            <div class="item-value">{{order.reward}}</div>
                        </div>
                    </div>
                    <div class="down">
                        <div @click="cancelOrder(order)" class="button" v-if="order.order_status in {'待接单': 0, '派送中': 1}">取消订单</div>
                        <div @click="changeCourier(order)" class="button" v-if="order.order_status in {'待接单': 0, '派送中': 1}">{{order.order_status === '待接单' ? '选派送员' : '换派送员' }}</div>
                        <div @click="checkDetail(order)" class="button">查看详情</div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import format from '@/utils/format'
import { getOrderList as getOrderListAPI, allocate, cancelOrder as cancelOrderAPI, reallocate, getGuildStatistics } from '@/http/api/back/orderController'
import { getCouriers } from '@/http/api/back/courierController'
import { Toast } from 'vant'

    export default {
        mounted() {
            getGuildStatistics().then((res) => {
                this.nums[0].num = res.total_money
                this.nums[1].num = res.total_order_nums
            })

            // 获取时间选项
            let now = new Date()
            let theYear = now.getFullYear()
            let dayNums = {
                    1: 31,
                    2: (theYear%400===0||theYear%100!==0&&theYear%4===0)?29:28,
                    3: 31,
                    4: 30,
                    5: 31,
                    6: 30,
                    7: 31,
                    8: 31,
                    9: 30,
                    10: 31,
                    11: 31,
                    12: 30
                }
            
            let timeChoicesL1 = new Array(12)
            let timeChoicesL3 = new Array(24)
            for(let i = 0; i < 23; ++i) {
                timeChoicesL3[i] = {
                    text: i >= 10 ? i + '时' : `0${i}时`
                }
            }
            for(let i = 1; i <= 12; ++i) {
                let numOfday = dayNums[i]
                let days = Array(numOfday)
                for(let j = 1; j <= numOfday; ++j) {
                    days[j-1] = {
                        text: j >= 10 ? j + '日' : `0${j}日`,
                        children: timeChoicesL3,
                        defaultIndex: now.getHours()
                    }
                }
                let timeChoicesL2 = {
                    text: i >= 10 ? i + '月' : `0${i}月`,
                    children: days,
                    defaultIndex: now.getDate()-1
                }
                timeChoicesL1[i-1] = timeChoicesL2
            }

            this.conditions[0].choices = timeChoicesL1
            this.conditions[1].choices = timeChoicesL1
        },
        data() {
            return {
                total_h: document.body.clientHeight,
                defaultAvatar: `this.src="${require('@/assets/back9.png')}"`,
                nums: [{
                    num: '加载中...',
                    title: '总金额',
                }, {
                    num: '加载中...',
                    title: '总订单数',
                }],
                conditions: [
                    {
                        id: '起始时间',
                        title: '起始时间',
                        isChoosing: false,
                        defaultIndex: new Date().getMonth(),
                        // mouted中获取子选项
                        choices: []
                    },
                    {
                        id: '终止时间',
                        title: '终止时间',
                        isChoosing: false,
                        defaultIndex: new Date().getMonth(),
                        // mouted中获取子选项
                        choices: []
                    },
                    {
                        id: '订单状态',
                        title: '订单状态',
                        isChoosing: false,
                        choices: [{text: '全部', value: -1}, {text: '待接单', value: 0}, {text: '派送中', value: 1}, {text: '已送达', value: 2}, {text: '已完成', value: 3}, {text: '已取消', value: 4}]
                    }
                ],

                refreshing: false,
                loading: false,
                finished: false,
                serial_number: 1,

                // orderList: [{
                //     "client_id": "下单者id",
                //     "completed_time_string": "订单完成时间（只有已完成状态的订单这个字段才有数据）",
                //     "create_time_string": "订单创建时间",
                //     "deliver_time_period_string": "送达时间段",
                //     "num_of_packages": "包裹数量",
                //     "order_id": "订单id1",
                //     "order_status": "待接单",
                //     "pickup_address": "快递点地址",
                //     "recipient_address": "收件地址",
                //     "remarks": "下单者备注",
                //     "reward": "付款金额"
                // }, {
                //     "client_id": "下单者id2",
                //     "completed_time_string": "订单完成时间（只有已完成状态的订单这个字段才有数据）",
                //     "create_time_string": "订单创建时间",
                //     "deliver_time_period_string": "送达时间段",
                //     "num_of_packages": "包裹数量",
                //     "order_id": "订单id2",
                //     "order_status": "派送中",
                //     "pickup_address": "快递点地址",
                //     "recipient_address": "收件地址",
                //     "remarks": "下单者备注",
                //     "reward": "付款金额"
                // }, {
                //     "client_id": "下单者id3",
                //     "completed_time_string": "订单完成时间（只有已完成状态的订单这个字段才有数据）",
                //     "create_time_string": "订单创建时间",
                //     "deliver_time_period_string": "送达时间段",
                //     "num_of_packages": "包裹数量",
                //     "order_id": "订单id33",
                //     "order_status": "已完成",
                //     "pickup_address": "快递点地址",
                //     "recipient_address": "收件地址",
                //     "remarks": "下单者备注",
                //     "reward": "付款金额"
                // },{
                //     "client_id": "下单者id3",
                //     "completed_time_string": "订单完成时间（只有已完成状态的订单这个字段才有数据）",
                //     "create_time_string": "订单创建时间",
                //     "deliver_time_period_string": "送达时间段",
                //     "num_of_packages": "包裹数量",
                //     "order_id": "订单id32",
                //     "order_status": "已取消",
                //     "pickup_address": "快递点地址",
                //     "recipient_address": "收件地址",
                //     "remarks": "下单者备注",
                //     "reward": "付款金额"
                // }],
                orderList: [],
                
                order_status: -1,
                bottom_create_date: null,
                top_create_date: null,
                blur_search_context: '',

                isInputingBlurSearchKey: false,

                isConfirmCancel: false,

                // 正在处理的订单
                orderOnHandling: {},
                isReallocating: false,


                // 快递员模糊搜索相关 ↓
                blur_search_context_forCourier: '',
                refreshing_forCourier: false,
                loading_forCourier: false,
                finished_forCourier: false,
                serial_number_forCourier: 1,
                indexOfCourierChosen: -1,
                // courierList: [{
                //     "avatar_url": "派送员的 fanbook 头像 url",
                //     "complete_order_nums": "派送员已完成订单数",
                //     "courier_id": 1,
                //     "courier_status": "派送员接单状态（0正常接单，1暂停接单）",
                //     "fanbook_nick_name": "派送员的 fanbook 昵称",
                //     "money_could_withdraw": "派送员剩余可提现金额",
                //     "money_earned": "派送员总收入",
                //     "ongoing_order_nums": "派送员目前未完成的订单数",
                //     "phone_number": "派送员手机号",
                //     "real_name": "派送员真名",
                //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
                //     "remarks_at_register": "派送员入驻时填写的备注",
                //     "total_take_order_nums": "派送员接取订单总数"
                // },{
                //     "avatar_url": "派送员的 fanbook 头像 url",
                //     "complete_order_nums": "派送员已完成订单数",
                //     "courier_id": 2,
                //     "courier_status": "派送员接单状态（0正常接单，1暂停接单）",
                //     "fanbook_nick_name": "派送员的 fanbook 昵称",
                //     "money_could_withdraw": "派送员剩余可提现金额",
                //     "money_earned": "派送员总收入",
                //     "ongoing_order_nums": "派送员目前未完成的订单数",
                //     "phone_number": "派送员手机号",
                //     "real_name": "派送员真名",
                //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
                //     "remarks_at_register": "派送员入驻时填写的备注",
                //     "total_take_order_nums": "派送员接取订单总数"
                // },{
                //     "avatar_url": "派送员的 fanbook 头像 url",
                //     "complete_order_nums": "派送员已完成订单数",
                //     "courier_id": 3,
                //     "courier_status": "派送员接单状态（0正常接单，1暂停接单）",
                //     "fanbook_nick_name": "派送员的 fanbook 昵称",
                //     "money_could_withdraw": "派送员剩余可提现金额",
                //     "money_earned": "派送员总收入",
                //     "ongoing_order_nums": "派送员目前未完成的订单数",
                //     "phone_number": "派送员手机号",
                //     "real_name": "派送员真名",
                //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
                //     "remarks_at_register": "派送员入驻时填写的备注",
                //     "total_take_order_nums": "派送员接取订单总数"
                // },{
                //     "avatar_url": "派送员的 fanbook 头像 url",
                //     "complete_order_nums": "派送员已完成订单数",
                //     "courier_id": 4,
                //     "courier_status": "派送员接单状态（0正常接单，1暂停接单）",
                //     "fanbook_nick_name": "派送员的 fanbook 昵称",
                //     "money_could_withdraw": "派送员剩余可提现金额",
                //     "money_earned": "派送员总收入",
                //     "ongoing_order_nums": "派送员目前未完成的订单数",
                //     "phone_number": "派送员手机号",
                //     "real_name": "派送员真名",
                //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
                //     "remarks_at_register": "派送员入驻时填写的备注",
                //     "total_take_order_nums": "派送员接取订单总数"
                // }],
                courierList: [],
                timerForCourier: null
            }
        },
        methods: {
            onRefresh() {
                this.finished = false
                this.serial_number = 1
                this.orderList = []
                this.loading = true
                this.getOrderList().then(() => {
                    this.refreshing = false
                })
            },
            getOrderList() {
                
                getOrderListAPI({
                    blur_search_context: this.blur_search_context,
                    bottom_create_date: this.bottom_create_date,
                    top_create_date: this.top_create_date,
                    order_status: this.order_status,
                    serial_number: this.serial_number
                }).then(res => {
                    this.orderList = this.orderList.concat(res)

                    let length = res.length
                    if(length < 10) {
                        this.finished = true
                    } else  {
                        this.serial_number++
                    }
                    this.loading = false
                }, () => {
                    this.finished = true
                    this.loading = false
                })
                return Promise.resolve()
            },
            confirmChosen(data, item) {
                // console.log(data, item)
                data.isChoosing = false
                if(item.id === '起始时间' || item.id === '终止时间') {
                    item.title = data.join('')

                    let date = new Date()
                    // console.log(date)
                    date.setMonth(data[0].slice(0, 2) - 1)
                    date.setDate(data[1].slice(0, 2) - 0)
                    date.setHours(data[2].slice(0, 2) - 0)
                    date.setMinutes(0)
                    date.setMilliseconds(0)
                    let dateStr = format(date)
                    // console.log(data)
                    // console.log(date)
                    if(item.id === '起始时间') {
                        this.bottom_create_date = dateStr
                    } else {
                        this.top_create_date = dateStr
                    }
                } else if(item.id === '订单状态') {
                    item.title = data.text
                    this.order_status = data.value
                }

                item.isChoosing = false
                this.onRefresh()
            },
            confirmBlurKey() {
                this.isInputingBlurSearchKey = false
                this.onRefresh()
            },
            cancelOrder(order) {
                this.orderOnHandling = order
                this.isConfirmCancel = true
            },
            checkDetail(order) {
                this.$router.push({
                    name: "orderDetail",
                    params: {
                        id: order.order_id
                    }
                });
            },
            confirmCancel() {
                // console.log(this.orderOnHandling)
                cancelOrderAPI({
                    orderId: this.orderOnHandling.order_id
                }).then(() => {
                    Toast('成功取消订单')
                    this.isConfirmCancel = false
                    this.onRefresh()
                })
            },
            changeCourier(order) {
                this.orderOnHandling = order
                this.isReallocating = true
            },
            onRefresh_forCourier() {
                this.finished_forCourier = false
                this.serial_number = 1
                this.courierList = []
                this.loading_forCourier = true
                this.getCourierList().then(() => {
                    this.refreshing_forCourier = false
                })
            },
            getCourierList() {
                getCouriers({
                    blur_search_context: this.blur_search_context_forCourier,
                    courier_status: 0, // 正常接单
                    serial_number: this.serial_number_forCourier
                }).then(res => {
                    this.courierList = this.courierList.concat(res)
                    
                    let length = res.length
                    if(length < 10) {
                        this.finished_forCourier = true
                    } else {
                        this.serial_number_forCourier++
                    }
                    this.loading_forCourier= false
                }, () => {
                    this.finished_forCourier = true
                    this.loading_forCourier= false
                })
                return Promise.resolve() 
            },
            inputKeyForCourier() {
                clearTimeout(this.timerForCourier)
                this.timerForCourier = setTimeout(() => {
                    // console.log(this.blur_search_context_forCourier)
                    this.onRefresh_forCourier()
                }, 500)
            },
            confirmAllocate() {
                if(this.orderOnHandling.order_status === '待接单') {
                    // 为带待接单的订单分配
                    allocate({
                        courierId: this.courierList[this.indexOfCourierChosen].courier_id,
                        orderId: this.orderOnHandling.order_id
                    }).then(() => {
                        Toast('成功选定派送员')
                        this.onRefresh()
                        this.isReallocating = false
                    })
                } else if(this.orderOnHandling.order_status === '派送中') {
                    // 为派送中的订单重分配
                    reallocate({
                        formerCourierId: this.orderOnHandling.courier_id,
                        orderId: this.orderOnHandling.order_id,
                        latterCourierId: this.courierList[this.indexOfCourierChosen].courier_id,
                    }).then(() => {
                        Toast('成功更换派送员')
                        // this.onRefresh()
                        this.isReallocating = false
                    })
                }
            }
        },

    }
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.main {
    background-image: url("@/assets/bg1.png");
}
.nums-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 99px;
    background: rgba(255,255,255,0.80);;
    .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        &:first-of-type {
            border-right: 1px solid rgba(125,124,123,1);
        }
        .num {
            font-size: 24px;
            color: rgba(232,95,95,1);
            font-weight: bold;
        }
        .title {
            font-size: 16px;
            color: rgba(88,74,72,1);
        }
    }
}


.list-box {
    margin: 0 4px;
    margin-top: 22px;
    background-color: hsla(23, 85%, 95%, 1);

    .select-box {
        display: flex;
        // justify-content: space-between;
        position: relative;
        align-items: center;
        margin-left: 26px;
        margin-right: 25px;
        height: 44px;
        .condition-box {
            display: flex;
            margin-top: 12px;
            margin-bottom: 11px;
            .item {
                display: flex;
                align-items: center;
                margin-right: 40px;
                font-size: 16px;
                font-weight: bold;
                color: hsla(7, 10%, 31%, 1);
                .title {
                    max-width: 85px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .label {
                    position: relative;
                    top: 5px;
                    right: -5px;
                    width: 6px;
                    height: 6px;
                    border: 6px solid hsla(8, 10%, 31%, 0);
                    border-top-color: hsla(8, 10%, 31%, 1);
                }
            }
        }
        .search-icon {
            position: absolute;
            right: -5px;
        }
    }
}

.blur-search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 60px;
    margin: 0 auto;
    // background-color: #FCF6F4;
    .enter-box {
        width: 300px;
        display: flex;
        align-items: center;
        margin-left: 15px;
        font-size: 17px;
        .icon {
            margin-right: 5px;
        }
    }
    .confirm {
        margin-right: 10px;
        font-size: 18px;
        color: hsla(30, 86%, 60%, 1);
        font-weight: bold;
    }
}

.order {
    width: 410px;
    margin: 0 auto;
    margin-bottom: 17px;
    padding: 0 17px;
    background-color: hsla(0, 0%, 100%, 0.7);
    position: relative;
    .status-label {
        position: absolute;
        top: 0px;
        right: 0px;
    }
    .up {
        height: 49px;
        line-height: 49px;
        font-size: 14px;
        color: hsla(30, 1%, 49%, 1);
        border-bottom: 1px solid hsla(25, 1%, 49%, 1);
    }
    .middle {
        border-bottom: 1px solid hsla(25, 1%, 49%, 1);
        .item {
            margin: 18px 0;
            display: flex;
            font-size: 14px;
            color: black;
            .item-name {
                margin-right: 5px;
            }
            // .item-value {}
            &.highlight {
                font-weight: bold;
                // .item-name {}
                .item-value {
                    color: hsla(30, 86%, 60%, 1);
                }
            }
        }
    }

    .down {
        display: flex;
        justify-content: flex-end;
        padding-top: 14px;
        padding-bottom: 8px;
        .button {
            margin-right: 9px;
            width: 72px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: hsla(36, 94%, 66%, 1);
            border: 1px solid hsla(36, 94%, 66%, 1);
            border-radius: 3px;
        }
    }
}

.cancel-box {
    display: flex;
    flex-direction: column;
    width: 380px;
    height: 190px;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    .title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: hsla(8, 10%, 31%, 1);
    }
    .buttons {
        display: flex;
        height: 49px;
        line-height: 49px;
        .confirm {
            text-align: center;
            border-top: 1px solid hsla(0, 0%, 46%, 1);
            width: 190px;
            border-right: 1px solid hsla(0, 0%, 46%, 1);
            color: hsla(26, 86%, 54%, 1);
        }
        .cancel {
            text-align: center;
            border-top: 1px solid hsla(0, 0%, 46%, 1);
            width: 190px;
            color: hsla(30, 1%, 49%, 1);
        }
    }
}


.reallocate-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: hsla(0, 0%, 100%, 1);
    .enter-box {
        display: flex;
        align-items: center;
        width: 360px;
        margin: 0 auto;
        margin-top: 35px;
        color: #584A48;
        font-size: 15px;
        background-color: #FCF6F4;
        border-radius: 5px;
        input {
            background-color: #FCF6F4;
        }
        .icon {
            margin-left: 15px;
            margin-right: 7px;
        }
    }
}

.courier-list {
    height: 285px;
    overflow-y: scroll;
}

.courier {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 77px;
    &:first-of-type {
        margin-top: 28px;
        border: none;
    }
    margin-top: 11px;
    margin-left: 34px;
    margin-right: 51px;
    border-top: 1px solid hsla(25, 1%, 49%, 0.5);
    .info {
        display: flex;
        align-items: center;
        .img {
            width: 60px;
            height: 60px;
            margin-right: 18px;
        }
        .real-name {
            color: hsla(8, 10%, 31%, 1);
            font-weight: bold;
            font-size: 18px;
        }
    }
    .label {
        width: 16px;
        height: 16px;
        border: 1px solid hsla(26, 86%, 54%, 1);
        border-radius: 50%;
        margin-right: 5px;
    }
    &.active {
        .label {
            display: flex;
            align-items: center;
            justify-content: center;

            &::before {
                content: '';
                width: 8px;
                height: 8px;
                background-color: hsla(26, 86%, 54%, 1);
                border-radius: 50%;
            }
        }
    }
    &.now {
        .label {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-color: #584A48;

            &::before {
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #584A48;
            }

            &::after {
                content: '当前派送员';
                position: absolute;
                width: 80px;
                left: -90px;
            }
        }



    }
}

.confirm-reallocate {
    text-align: center;
    height: 58px;
    line-height: 58px;
    background-color: hsla(25, 98%, 84%, 1);
    font-size: 20px;
    color: hsla(8, 10%, 31%, 1);
    font-weight: bold;
}
</style>