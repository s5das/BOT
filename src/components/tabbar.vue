<template>
  <div class="tabbar">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" @change="onChange">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="label-o">我的订单</van-tabbar-item>
    <van-tabbar-item icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
    name: 'tab-bar',
    data() {
        return {
            active:0
        }
    },
    methods: {

        onChange(index) {
            this.active = index
        }
    }
}
</script >

<style scoped>

</style>