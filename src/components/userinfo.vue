<template>
  <div class="box">
    <div class="head">
      <div class="left">
        收件人信息
      </div>
      <div class="right">
        (以下信息仅该单的派送员可见)
      </div>
    </div>
    <div class="info">
      <div class="name_phone">
        <div class="name">
          <div class="title">收件人</div>
          <div class="content">{{orderinfo.recipient_name}}</div>
        </div>
        <div class="phone">
          <div class="title">手机号</div>
          <div class="content">{{orderinfo.recipient_phone_number}}</div>
        </div>
      </div>
      <div class="pic">
        <div class="img1" v-for="(item,index) in orderinfo.order_pic_urls" :key="item" @click="showpic(index)"> <img :src="item" ></div>
      </div>
    </div>
    <van-overlay :show="show" >
      <div class="wrapper" @click.stop="show=false">
        <div class="block">
          <img class="big" :src="big_pic_url">
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>

export default {
  name: 'user-info',
  props: ['orderinfo'],
  data() {
    return {
      show: false,
      big_pic_url : ''
    }
  },
  mounted() {
    console.log(this.orderinfo);
  },
  methods:{
    showpic(index){
      this.big_pic_url = this.orderinfo.order_pic_urls[index]
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
.block {
  width: 80%;
  height: 500px;
  .big{
    width: 100%;
    height: auto;
  }
}

.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
}

.box {
  width: 418px;
  height: 232px;
  margin: 0 auto;
  background-color: rgba(255,255,255,0.8);

  display: flex;
  flex-direction: column;

  .head {
    font-size: 18px;
    display: flex;
    padding-top: 30px;
    padding-left: 33px;

    .left {
      font-weight: 600;
      margin-right: 10px;
    }

    .right {
      font-size: 15px;
      color: rgba(125,124,123,1);
    }
  }

  .info {
    margin-top: 14px;
    .name_phone {
      padding: 0 36px;
      display: flex;
      justify-content: space-between;

      .name,
      .phone {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 16px;

        .title {
          margin-bottom: 3px;
          color: rgba(125,124,123,1);
          font-size: 14px;
        }

        .content {
          color: rgba(88,74,72,1);
          font-size: 16px;
        }
      }
      .phone {
        padding-right: 92px;
      }
    }

    .pic {
      margin-top: 5px;
      padding-left: 28px;
      width: 382px;
      display: flex;
    .img1{
      width: 100px;
      height: 66px;
      margin-right: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    
    }

    }
  }
}
</style>