<!-- 抢单详情页 -->
<template>
    <div>
        <div v-if="status === '待抢单'">
            <Orderinfo/>
            <div class="buttons">
                <div @click="grab" class="button">我要抢单</div>
            </div>
        </div>

        <div v-if="status === '派送中'">
            <Successhead v-show="status === '派送中'">
                <template v-slot:content>
                    <div>
                        抢单成功
                    </div>
                </template>
            </Successhead>
            <Orderinfo/>
            <Userinfo/>
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
    </div>
</template>

<script>
import Orderinfo from '@/components/orderinfo.vue';
import Successhead from '@/components/successhead.vue'
import Userinfo from '@/components/userinfo.vue';
    export default {
    mounted() {
        // let id = this.$route.params.id;
    },
    data() {
        return {
            status: '派送中',
            // status: '待抢单'
            isConfirmBoxShow: false,
            isContactChoicesShow: false,
            contactChoices: [
                "打电话",
                "私聊"
            ],
            indexOfContactChoicesChosen: 0
        };
    },
    methods: {
        grab() {

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

        },
        cancel() {
            this.isConfirmBoxShow = false
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
</style>