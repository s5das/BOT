<template>
    <div class="order" @click="gotoOrderDetial(orderInfo.id)">
        <div class="up">
            <div class="item">
                <div class="item-name">收货地址: </div>
                <div class="item-value">{{orderInfo.receiveAddress}}</div>
                <div :class="['status', orderInfo.status === '已完成' ? 'finish' : '']">{{orderInfo.status}}</div>
                <div class="price">￥{{orderInfo.price}}</div>
            </div>
            <div class="item">
                <div class="item-name">快递点: </div>
                <div class="item-value">{{orderInfo.expressSite}}</div>
            </div>
        </div>
        <div class="down">
            <div class="item">
                <div class="item-name">快递件数:</div>
                <div class="item-value">{{orderInfo.numOfExpress}}</div>
            </div>
            <div class="item">
                <div class="item-name">送达时间:</div>
                <div class="item-value">{{orderInfo.timeOfArrive}}</div>
            </div>
            <div class="item">
                <div class="item-name">快递备注:</div>
                <div class="item-value">{{orderInfo.remarks||'暂无'}}</div>
            </div>
            <div class="item">
                <div class="item-name">收件人:</div>
                <div class="item-value">{{orderInfo.receiver}}</div>
            </div>
            <div class="item">
                <div class="item-name">手机号:</div>
                <div class="item-value">{{orderInfo.teleNum}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            orderInfo: Object,
        },
        methods: {
            gotoOrderDetial(id) {
            this.$router.push({
                name: "orderDetail",
                params: {
                    id: id
                }
            });
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
        padding: 1px;
        background-color: #FFF;
        border-radius: 10px 10px 0 0;
        font-family: PingFangSC-regular;

        .up {
            position: relative;
            height: 70px;
            border-bottom: 1px solid #bbb;

            .status {
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 16px;
                color: rgba(233, 157, 66, 100);
                &.finish {
                    color: rgba(233, 157, 66, 100);
                }
            }
            .price {
                position: absolute;
                right: 10px;
                top: 30px;
                width: 56px;
                height: 35px;
                font-size: 18px;
                color: rgba(234, 12, 12, 93);
            }

            .item-name {
                width: 54px;
                margin-right: 5px;
                font-size: 12px;
                color: rgba(102, 102, 102, 78);
            }
            .item-value {
                font-size: 14px;
                color:  #000;
            }
        }

        .item {
            display: flex;
            align-items: flex-end;
            margin-top: 10px;
            margin-left: 13px;
        }

        .down {
            display: flex;
            flex-direction: column;
            font-size: 13px;
            .item {
                margin-top: 8px;
                .item-name {
                    width: 60px;
                    margin-right: 5px;
                    color: rgba(16, 16, 16, 100);
                }
                .item-value {
                        color:  rgba(16, 16, 16, 100);
                }
                &:last-of-type {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>