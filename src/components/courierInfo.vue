<template>
    <div class="box">
        <div class="title">派送员信息</div>
        <div class="infos">
            <div class="item">
                <div class="item-name">派送员</div>
                <div class="item-value">{{order.courier_name}}</div>
            </div>
            <div class="item">
                <div class="item-name">手机号</div>
                <div class="item-value">{{order.courier_phone_number}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['order']
    }
</script>

<style lang="less" scoped>
.box {
    width: 418px;
    background-color: rgba(255,255,255,0.8);
    margin: 0 auto;

    .title {
        margin-left: 33px;
        padding-top: 30px;
        font-size: 18px;
        color: rgba(88,74,72,1);
    }

    .infos {
        display: flex;
        justify-content: space-between;
        margin: 0 36px;
        padding-right: 92px;
        margin-top: 14px;
        .item {
            display: flex;
            flex-direction: column;
            height: 46px;
            .item-name {
                margin-bottom: 3px;
                font-size: 14px;
                color: rgba(125,124,123,1);
            }
            .item-value {
                font-size: 16px;
                color: rgba(88,74,72,1);
            }
        }
    }
}
</style>