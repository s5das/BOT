<!-- 抢单详情页 -->
<template>
    <div>
        <!-- 1 待接单 -->
        <div v-if="orderInfo.order_status === '待接单'">
            <Orderinfo :orderinfo="orderInfo"/>
            <div class="buttons">
                <div @click="grab" class="button">我要抢单</div>
            </div>
        </div>

        <!-- 2 派送中 -->
        <div v-if="orderInfo.order_status === '派送中'">
            <Successhead>
                <template v-slot:content>
                    <div>
                        抢单成功
                    </div>
                </template>
            </Successhead>
            <Orderinfo :orderinfo="orderInfo"/>
            <Userinfo :orderinfo="orderInfo"/>
            <div class="buttons">
                <div @click="isContactChoicesShow = true" class="button">联系Ta</div>
                <div @click="showConfirmBox" class="button highlight">确认送达</div>
            </div>
            <van-popup v-model="isConfirmBoxShow">
                <div class="confirm-box">
                    <div class="title">
                        确认送达
                    </div>
                    <div class="content">
                        若该订单已送达, 请点击提交
                    </div>
                    <div class="pop-buttons">
                        <div @click="confirmSent" class="button">提交</div>
                        <div @click="cancel" class="button">取消</div>
                    </div>
                </div>
            </van-popup>
            <van-popup v-model="isContactChoicesShow">
                <div class="contact-choices">
                    <div class="top">
                        <div @click="isContactChoicesShow = false" class="button">取消</div>
                        <div class="title">联系收件人</div>
                        <div @click="contact" class="button">确认</div>
                    </div>
                    <div class="choices-box">
                        <div @click="indexOfContactChoicesChosen = i" v-for="(item, i) in contactChoices" :key="i" :class="['choice', i === indexOfContactChoicesChosen ? 'chosen' : '']">{{item}}</div>
                    </div>
                </div>
            </van-popup>
        </div>

        <!-- 3 已送达 -->
        <div v-if="orderInfo.order_status === '已送达'" class="received-box">
            <div class="auto-confirm-prompt">
                <van-icon name="bell" color="#E99D42" size='21'/>
                <div class="prompt-text">
                    快递已送达, 待确认收货, 24小时后自动确认送货
                </div>
            </div>
            <Orderinfo :orderinfo="orderInfo"/>
            <Userinfo :orderinfo="orderInfo"/>
            <div class="buttons">
                <div @click="isContactChoicesShow = true" class="button">联系Ta</div>
                <div @click="showConfirmBox" class="button highlight">确认收货</div>
            </div>
            <van-popup v-model="isConfirmBoxShow">
                <div class="confirm-box">
                    <div class="title">
                        确认收货
                    </div>
                    <div class="content">
                        若已成功收货, 请点击确认
                    </div>
                    <div class="pop-buttons">
                        <div @click="confirmReceived" class="button">确认</div>
                        <div @click="cancel" class="button">取消</div>
                    </div>
                </div>
            </van-popup>
        </div>

        <!-- 4 已完成 -->
        <div v-if="orderInfo.order_status === '已完成'" class="completed-box">
            <div class="completed-prompt">
                <!-- 2022-08-07 16：00 确认收货 -->
            </div>
            <Orderinfo :orderinfo="orderInfo"/>
            <Userinfo :orderinfo="orderInfo"/>
            <div class="buttons">
                <div @click="isContactChoicesShow = true" class="button">联系Ta</div>
            </div>
        </div>

        <!-- 5 已取消 -->
        <div v-if="orderInfo.order_status === '已取消'">
            <Orderinfo :orderinfo="orderInfo"/>
        </div>
    </div>
</template>

<script>
import Orderinfo from '@/components/orderinfo.vue';
import Successhead from '@/components/successhead.vue'
import Userinfo from '@/components/userinfo.vue';
import { takeOrder, turnDelivered } from '@/http/api/courier';
import { completeOrder } from '@/http/api/user';
import { getDetails } from '@/http/api/general/generalOrderController';
import { Toast } from 'vant';
    
    export default {
    mounted() {
        this.orderId = this.$route.params.id;
        this.status = this.$route.params.status
        getDetails({
            orderId: this.orderId
        }).then(res => {
            this.orderInfo = res
            console.log(res)
        })
    },
    data() {
        return {
            orderId: -1,
            // status: '待抢单',
            // status: '派送中',
            // status: '已送达',
            status: '已完成',
            isConfirmBoxShow: false,
            isContactChoicesShow: false,
            contactChoices: [
                "打电话",
                "私聊"
            ],
            indexOfContactChoicesChosen: 0,
            type: [],
            orderInfo: {
                "courier_id": "派送员的用户id",
                "courier_name": "派送员名称",
                "courier_phone_number": "派送员电话号码",
                "create_time_string": "订单创建时间",
                "deliver_address": "收件地址",
                "deliver_time_period_string": "送达时间段",
                "num_of_packages": "包裹数量",
                "order_pic_urls": "客户上传到订单的图片的url地址列表",
                "order_status": "订单状态",
                "pickup_address": "快递点地址",
                "recipient_id": "客户的用户id",
                "recipient_name": "收件人名称",
                "recipient_phone_number": "收件人电话号码",
                "remarks": "客户备注",
                "reward": "付款金额",
                "spec_name": "规格名称"
            }
        };
    },
    methods: {
        async grab() {
            takeOrder({
                orderId: this.orderId
            }).then(() => {
                this.orderInfo.order_status = '派送中'
            })
        },
        contact() {
            let method = this.contactChoices[this.indexOfContactChoicesChosen]
            if(method === "打电话") {
                //
            } else if(method === "私聊") {
                //
            }
            this.isContactChoicesShow = false
        },
        showConfirmBox() {
            this.isConfirmBoxShow = true
        }, 
        confirmSent() {
            this.isConfirmBoxShow = false
            // 发送变更状态请求
            turnDelivered({
                orderId: this.orderId
            }).then(() => {
                this.orderInfo.order_status = '已送达'
                Toast('操作成功')
            })
        },
        cancel() {
            this.isConfirmBoxShow = false
        },
        confirmReceived() {
            this.isConfirmBoxShow = false
            // 发送变更状态请求
            completeOrder({
                orderId: this.orderId,
            }).then(() => {
                this.orderInfo.order_status = '已完成'
                Toast('操作成功')
            })
        }
    },
    components: { Orderinfo, Successhead, Userinfo }
}
</script>

<style lang="less" scoped>
.buttons {
    background-color: #FFFFFF;
    width: 366px;
    margin: 0 auto;
    min-height: 140px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-bottom: 50px;
    transform: translateY(-50px);
    .button {
        width: 289px;
        height: 40px;
        margin: 18px 0;
        margin-bottom: 5px;
        line-height: 40px;
        text-align: center;
        color: rgba(233, 157, 66, 100);
        border: 1px solid rgba(233, 157, 66, 100);
        border-radius: 22px;

        &.highlight {
            color: #FFF;
            background-color: rgba(233, 157, 66, 100);
        }
    }
}

.confirm-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 366px;
    height: 162px;
    font-size: 18px;
    text-align: center;

    .title {
        height: 40px;
        line-height: 40px;
    }

    .pop-buttons {
        display: flex;
        justify-content: space-between;
        .button {
            width: 40%;
            height: 40px;
            margin-bottom: 5px;
            line-height: 40px;
            font-size: 20px;
            &:first-of-type {
                color: rgba(234, 12, 12, 87);
            }
        }
    }
}

.contact-choices {
    width: 366px;
    .top {
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        font-size: 16px;

        .button {
            color: rgba(234, 12, 12, 73);
        }

        .title {
            color: rgb(234, 12, 12) 73%;
        }
    }
    .choices-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        box-sizing: border-box;
        // height: 164px;
        padding: 20px;
        .choice {
            margin: 10px 0;
            text-align: center;
            font-size: 16px;
            color: rgba(16, 16, 16, 100);
            &.chosen {
                color: rgba(16, 16, 16, 100);
                font-weight: 600;
            }
        }
    }
}

// 已送达
.received-box {
    position: relative;
    .auto-confirm-prompt {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 5px;
        .prompt-text {
            margin-left: 2px;
            font-size: 13px;
            color: rgba(79, 79, 79, 64);
        }
    }
}

// 已完成
.completed-box {
    position: relative;
    .completed-prompt {
        position: absolute;
        z-index: 999;
        margin-left: 40px;
        margin-top: 10px;
        height: 23px;
        line-height: 23px;
        color: rgba(79, 79, 79, 64);
        font-size: 13px;
    }
}
</style>