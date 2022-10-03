<template>
  <div class="box">
    <div class="top">
    <div class="ico">
      <img src="../assets/tureico.png">
    </div>
    <div class="content">
    <slot name="content" ></slot>
  </div>
   </div>
    <div>
      <!-- <van-button color="#E99D42" plain size='small' round  @click="jump(index)">订单列表</van-button> -->
      <van-button color="#E99D42" plain size='small' round  @click="jump">订单列表</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'success-head',
  methods: {
    jump() {
      this.$router.push({
                path: '/front/order/courier',
            });
    }
  }
}
</script>

<style scoped lang="less">
.box{
    padding-top:20px ;
    display: flex;
    height: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    .top{
    width: 100%;
    display: flex;
    justify-content: center;
    .ico{
        margin-right: 17px ;
        height: 29px;
        width: 29px;
        img{
          height: 100%;
          width: auto;
        }
    }
    .content{
      height: 33px;
      line-height: 29px;
      font-size: 20px;
    }}

}
</style>