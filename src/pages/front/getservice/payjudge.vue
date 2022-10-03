<template>
    <div class="main">
        <div class="loading" v-show="isloading">
            <van-loading size="80px" type="spinner" color="#f09c45" text-size="20px" vertical>加载中...</van-loading>
        </div>
        <div class="success" v-show="issuccess">支付成功</div>
        <div class="fail" v-show="isfail">支付失败</div>
    </div>
</template>
<script>
import { paycheck } from '@/http/api/wx/wxpay'
export default {
    name: 'judge-pay',
    data() {
        return {
            isloading: true,
            issuccess: false,
            isfail: false
        }
    },
    mounted() {
        let n = 0
        let timmer = setInterval(() => {
            paycheck().then(
                (res) => {
                    console.log(res);
                    // 设置支付状态

                    // // 成功延时跳转到payfinish界面
                    // if(status){
                    //     this.isloading = false
                    //     this.issuccess = false 
                    //     this.isfail = true 
                    //     setTimeout(()=>{this.$router.replace({
                    //         path:'/front/payfinish',
                    //         query:{
                    //             orderId
                    //         }
                    //     })},3000)
                    // }else{
                    //     // 失败延时回到homepage页面
                    //     this.isloading = false
                    //     this.issuccess =  true 
                    //     this.isfail = false
                    //     setTimeout(()=>{this.$router.replace({
                    //         path:'/front/homepage',
                    //     })},3000)
                    // }                    
                },
                (err) => { err.message })
            n++
            if (n >= 3) {
                clearInterval(timmer)
            }
        }, 3000);
    }
}
</script>
<style lang="less" scoped>
.main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
        height: 300px;
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>