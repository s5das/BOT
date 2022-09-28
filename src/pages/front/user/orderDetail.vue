<!-- 抢单详情页 -->
<template>
    <div>
        <!-- 1 待接单 -->
        <div v-if="status === '待接单'">
            <Orderinfo/>
        </div>

        <!-- 2 派送中 -->
        <div v-if="status === '派送中'">
            <Orderinfo/>
            <Userinfo/>
            <div class="buttons-box">
                <div @click="isContactChoicesShow = true" class="button">联系Ta</div>
            </div>
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
        <div v-if="status === '已送达'" class="received-box">
            <div class="auto-confirm-prompt">
                <van-icon name="bell" color="#E99D42" size='21'/>
                <div class="prompt-text">
                    快递已送达, 待确认收货, 24小时后自动确认送货
                </div>
            </div>
            <Orderinfo/>
            <Userinfo/>
            <div class="buttons-box">
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

        <!-- 4 已完成 -->
        <div v-if="status === '已完成'" class="completed-box">
            <div class="completed-prompt">
                <!-- 2022-08-07 16：00 确认收货 -->
            </div>
            <Orderinfo/>
            <Userinfo/>
            <div class="buttons-box">
                <div @click="isContactChoicesShow = true" class="button">联系Ta</div>
            </div>
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

        <!-- 5 已取消 -->
        <div v-if="status === '已取消'">
            <Orderinfo/>
        </div>
    </div>
</template>

<script>
import Orderinfo from '@/components/orderinfo.vue';
import Userinfo from '@/components/userinfo.vue';
import { takeOrder, turnDelivered } from '@/http/api/courier';
import { completeOrder } from '@/http/api/user';

    export default {
    mounted() {
        this.orderId = this.$route.params.id;
        this.status = this.$route.params.status
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
        };
    },
    methods: {
        async grab() {
            takeOrder({
                orderId: this.orderId
            }).then(() => {
                this.status = '派送中'
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
                this.status = '已送达'
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
                this.status = '已完成'
            })
        }
    },
    components: { Orderinfo, Userinfo }
}
</script>

<style lang="less" scoped>
.buttons-box {
    background-color: #FFFFFF;
    background-color: black;
    width: 418px;
    // margin: 0 auto;
    min-height: 140px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-bottom: 50px;
    transform: translateY(-50px);
    .button {
        width: 418px;
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
    width: 418px;
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
    width: 418px;
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