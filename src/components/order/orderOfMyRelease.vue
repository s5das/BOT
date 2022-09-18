<template>
    <div class="order">
        <div class="up">
            <div class="time-created">
                {{orderInfo.timeOfCreated}}
            </div>
            <div class="status">
                {{orderInfo.status}}
            </div>
        </div>
        <div class="middle">
            <div class="item">
                <div class="item-name">快递点:</div>
                <div class="item-value">{{orderInfo.expressSite}}</div>
            </div>
            <div class="item">
                <div class="item-name">快递件数:</div>
                <div class="item-value">{{orderInfo.numOfExpress}}</div>
            </div>
            <div class="item">
                <div class="item-name">送达时间:</div>
                <div class="item-value">{{orderInfo.timeOfArrive}}</div>
            </div>
            <div class="item">
                <div class="item-name">备注:</div>
                <div class="item-value">{{orderInfo.remarks}}</div>
            </div>
            <div class="item">
                <div class="item-name">付款金额:</div>
                <div class="item-value price">￥ {{orderInfo.price}}</div>
            </div>
        </div>
        <div class="down">
            <div v-if="orderInfo.courier !== undefined" class="courier">
                派送员: {{orderInfo.courier}}正在为您配送
            </div>
            <div class="buttons">
                <div @click="cancel" v-if="orderInfo.status === '待接单'" class="button cancel">取消订单</div>
                <div @click="gotoOrderDetail(orderInfo.id)" class="button detail">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
import { cancelOrder } from '@/http/api/user';
    export default {
        props: {
            orderInfo: Object
        },
        methods: {
            gotoOrderDetail(id) {
                this.$router.push({
                    name: "orderDetail/user",
                    params: {
                        id: id,
                        status: this.orderInfo.status
                    }
                });
            },
            cancel() {
                cancelOrder({
                    orderId: this.orderInfo.id
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.order {
    display: flex;
    flex-direction: column;
    width: 362px;
    margin: 0 auto;
    margin-top: 14px;
    border-radius: 10px 10px 0 0;
    background-color: #FFF;
    font-family: PingFangSC-regular;

    .up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 42px;
        padding: 0 13px;
        border-bottom: 1px solid rgba(187, 187, 187, 100);
        .time-created {
            font-size: 12px;
            color: rgba(153, 153, 153, 100);
        }
        .status {
            font-size: 16px;
            color: rgba(233, 157, 66, 100);
        }
    }
    .middle {
        border-bottom: 1px solid rgba(187, 187, 187, 100);
        .item {
            display: flex;
            margin: 10px;
            font-size: 14px;
            color: rgba(16, 16, 16, 100);

            .item-name {
                margin-right: 5px;
            }

            .price {
                font-size: 18px;
                color: rgba(234, 12, 12, 93);
                transform: translateY(-3px);
            }
        }
    }
    .down {
        display: flex;
        position: relative;
        width: 100%;
        // justify-content: space-between;
        align-items: center;
        height: 43px;
        padding: 0 10px;


        .courier {
            font-size: 14px;
            color: rgba(102, 102, 102, 78);
        }

        .buttons {
            position: absolute;
            right: 10px;
            font-size: 14px;
            display: flex;
            padding-right: 5px;
            .button {
                margin: 0 10px;
                padding: 0 5px;
                border: 1px solid;
                border-radius: 4px;
                height: 23px;
                line-height: 23px;
                font-size: 12px;
                text-align: center;
            }
            .cancel {
                color: rgba(24, 24, 24, 100);
                border-color: rgba(24, 24, 24, 100);
            }
            .detail {
                color: rgba(233, 157, 66, 100);
                border-color: rgba(233, 157, 66, 100);
            }
        }
    }
}
</style>