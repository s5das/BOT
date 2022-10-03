<template >
    <div class="main">
        <div class="item" @click="handel(1)">
            <img class="ico" src="@/assets/f2.png">
            <div class="title">主页</div>
        </div>
        <div class="item2" @click="handel(2)">
            <div class="box">
                <img class="ico2" src="@/assets/f3.png">
            </div>
            <div class="title">我的订单</div>
        </div>
        <div class="item" @click="handel(3)">
            <img class="ico" src="@/assets/f1.png">
            <div class="title">个人中心</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'tab-bar',
    methods:{
        handel(index){
            if(index==1){
                this.$router.push(
                    {
                        path:'/front/homepage'
                    }
                )
            }else if(index==2){
                this.$router.push(
                    {
                        path:'/front/order'
                    }
                )
            }else{
                this.$router.push(
                    {
                        path:'/front/personalcenter'
                    }
                )
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .main{
        height: 70px;
        width: 100%;
        background-color: white;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        .item{
            height: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .ico{
                height: 45px;
                width: 45px;
            }
        }
        .item2{
            height: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .box{
                height: 45px;
                width: 45px;
                position: relative;
            }
            .ico2{
                position: absolute;
                height: 55px;
                width: 55px;
                top: -15px;
                right: -5px;
            }
        }
    }
</style>