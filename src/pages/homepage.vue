<template>
  <div>
  <div class="box1">
  <div v-for="(item,index) of pagedata" :key="index" class="box2">
    <div class="pic">
      <img :src="item.src">
    </div>
    <div class="text1">
      {{item.text1}}
    </div>
    <van-button color="#EA0C0C" plain round size="mini">{{item.text2}}</van-button>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'home-page',
  data() {
    return {
      pagedata:[{text1:'我是客户',text2:'去下单',src:require('@/assets/customer.png')},{text1:'我是派送员',text2:'去抢单',src:require('@/assets/worker.png')}]
    }
  }
}
</script >

<style scoped lang="less">
.box1{
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
}

.box2{
  height: 210px;
  width: 182px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.text1{
  font-size: 14px;
}
</style>