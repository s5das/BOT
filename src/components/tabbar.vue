<template>
  <div class="tabbar">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" >
    <van-tabbar-item  icon="home-o"  to="/">首页</van-tabbar-item>
    <van-tabbar-item  icon="label-o" to="/order">我的订单</van-tabbar-item>
    <van-tabbar-item  icon="user-o" to="/personalcenter">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name: 'tab-bar',
    data() {
        return {
            active:0
        }
    },
    methods: {
        
        change(_, res) {
            this.active = res
        }
    },
    mounted() {
        pubsub.subscribe('changetabbar', this.change)
    }
}
</script >

<style scoped>

</style>