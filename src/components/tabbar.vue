<template >
    <div class="main">
        <div class="item" @click="handel(1)">
            <img class="ico" :src="img1list[status1]">
            <div class="title">主页</div>
        </div>
        <div class="item2" @click="handel(2)">
            <div class="box">
                <img class="ico2" :src="img2list[status2]">
            </div>
            <div class="title">我的订单</div>
        </div>
        <div class="item" @click="handel(3)">
            <img class="ico" :src="img3list[status3]">
            <div class="title">个人中心</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'tab-bar',
    data(){
        return {
                img1list:[require('@/assets/f2.png'),require('@/assets/f5.png')],
                img2list:[require('@/assets/f4.png'),require('@/assets/f3.png')],
                img3list:[require('@/assets/f1.png'),require('@/assets/f6.png')],
                status1:1,
                status2:0,
                status3:0,
        }
    },
    methods:{
        handel(index){
            if(index==1){
                this.status1=1
                this.status2=0
                this.status3=0
                this.img1 = 
                this.$router.push(
                    {
                        path:'/front/homepage'
                    }
                )
            }else if(index==2){
                this.status1=0
                this.status2=1
                this.status3=0
                this.$router.push(
                    {
                        path:'/front/order'
                    }
                )
            }else{
                this.status1=0
                this.status2=0
                this.status3=1
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