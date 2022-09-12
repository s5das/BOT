<template>
  <div>
    <div class="box1">
      <div class="photo">
        <img src="@/assets/customer.png">
      </div>
      <div class="name">{{name}}</div>
      <div class="box2">
      <div class="bar" v-for="(item,index) in barlist" :key="index">
           <div><img :src="item.ico"></div>
           <div>{{item.text}}</div>
      </div>
    </div>
    </div>

    <div class="box3">
      <div class="title">服务统计</div>
      <div class="content">

        <van-cell-group>
        <van-cell title="总收入金额" title-class="cell_title"   :icon="require('@/assets/money.png')"  clickable value="内容" />
        <div class="line"></div>
        <van-cell title="未提现金额" title-class="cell_title"   :icon="require('@/assets/finish2.png')" :to="{path:'withdraw'}" clickable value="内容" is-link/>
        <div class="line"></div>
        <van-cell title="全部订单数" title-class="cell_title"   :icon="require('@/assets/order2.png')"  clickable value="内容" is-link/>
        <div class="line"></div>
        <van-cell title="已完成订单数" title-class="cell_title"  :icon="require('@/assets/mail.png')" clickable value="内容" is-link/>
        <div class="line"></div>
        <van-cell title="未完成订单数" title-class="cell_title"  :icon="require('@/assets/mail2.png')" clickable value="内容" is-link/>
      </van-cell-group>

      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: 'personal-center',
  data() {
    return {
      name: 'fanbook昵称',
      barlist: [{
        ico: require('@/assets/order.png'),
        text: '全部订单'
      },
      {
        ico: require('@/assets/time.png'),
        text: '待接单'
        },
        {
        ico: require('@/assets/car.png'),
        text: '进行中'
        },
        {
        ico: require('@/assets/finish.png'),
        text: '已完成'
      },
      ]
  }
  }
}
</script>

<style scoped lang="less">
.box1{
height: 155px;
background-color: #eb2929;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 104px;
  .photo{
      height: 65px;
      width: 65px;
      margin-bottom: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 32.5px;
      }
  }
  .name{
   color: #fff;
   font-size: 16px;
  }
}
.box2{
width: 380px;
height: 105px;
background-color: #fff;
position: absolute;
top: 145px;
border-radius: 6px;
display: flex;
.bar{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
}
.box3{
  width: 360px;
  height: 505px;
  background-color: #fff;
  margin: 0 auto;
  padding: 10px;
  .title{
    height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
   border-bottom: #bbb solid 1px;
  }
  .content{
   
  }
  .cell_title{
    font-weight: 600;
    line-height: 19px;
  }
  .line{
    height: 2px;
    border-bottom: 1px solid #bbb;
  }
}
</style>