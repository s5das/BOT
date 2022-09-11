<template>
    <div class="order" @click="gotoOrderDetial(orderInfo.id)">
        <div class="up">
            <div class="item">
                <div class="item-name">收获地址: </div>
                <div class="item-value">{{orderInfo.receiveAddress}}</div>
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
                <div class="item-value">{{orderInfo.remarks}}</div>
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
        height: 187px;
        margin: 0 auto;
        margin-top: 14px;
        padding: 1px;
        background-color: #FFF;
        border-radius: 10px 10px 0 0;

        .up {
            position: relative;
            height: 70px;
            border-bottom: 1px solid #bbb;
            .price {
                position: absolute;
                right: 10px;
                top: 20px;
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
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
                font-size: 14px;
            .item {
                margin-top: 0;
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