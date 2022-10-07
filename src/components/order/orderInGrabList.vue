<template>
    <div class="order" @click="gotoOrderDetial(orderInfo.order_id)">
        <div class="up">
            <div class="item">
                <div class="item-name">收获地址: </div>
                <div class="item-value">{{orderInfo.recipient_address}}</div>
                <div class="price">￥{{orderInfo.reward}}</div>
            </div>
            <div class="item">
                <div class="item-name">快递点: </div>
                <div class="item-value">{{orderInfo.pickup_address}}</div>
            </div>
        </div>
        <div class="down">
            <div class="item">
                <div class="item-name">快递件数:</div>
                <div class="item-value">{{orderInfo.num_of_packages}}</div>
            </div>
            <div class="item">
                <div class="item-name">送达时间:</div>
                <div class="item-value">{{orderInfo.deliver_time_period_string}}</div>
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
        // height: 187px;
        margin: 0 auto;
        margin-top: 14px;
        padding: 1px;
        background-color: rgba(255,255,255,0.65);
        border-radius: 10px 10px 0 0;

        .up {
            position: relative;
            // height: 70px;
            border-bottom: 1px solid #bbb;
            padding-bottom: 10px;
            .price {
                position: absolute;
                right: 10px;
                top: 20px;
                width: 56px;
                font-size: 20px;
                font-weight: 800;
                color: rgba(241,153,64,1);
            }

            .item-name {
                margin-right: 5px;
                font-size: 14px;
                color: rgba(102, 102, 102, 78);
            }
            .item-value {
                font-size: 16px;
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
            .item {
                display: flex;
                align-items: center;
                margin-top: 5px;
                .item-name {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    width: 5.5rem;
                    margin-right: 5px;
                    color: rgba(16, 16, 16, 100);
                }
                .item-value {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color:  rgba(16, 16, 16, 100);
                }
                &:last-of-type {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>