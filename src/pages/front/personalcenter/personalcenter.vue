<template>
  <div class="main">
    <div class="box1">
      <div class="photo">
        <img :src="src">
      </div>
      <div class="name">{{name}}</div>
      <div class="box2">
      <div class="bar" v-for="(item,index) in barlist" :key="index" @click="handleclick(index)">
           <div><img :src="item.ico"></div>
           <div>{{item.text}}</div>
      </div>
    </div>
    </div>

    <div class="box3">
      <div class="title">服务统计</div>
      <div class="content">

        <van-cell-group>
        <van-cell title="总收入金额" title-class="cell_title"   :icon="require('@/assets/money.png')"  clickable :value="statistics.money_could_withdraw|| '请求错误'" />
        <div class="line"></div>
        <van-cell title="未提现金额" title-class="cell_title"   :icon="require('@/assets/finish2.png')" :to="{path:'withdraw'}" clickable :value="statistics.money_earned || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="全部订单数" title-class="cell_title"   :icon="require('@/assets/order2.png')"  clickable :value="statistics.total_take_order_nums || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="已完成订单数" title-class="cell_title"  :icon="require('@/assets/mail.png')" clickable :value="statistics.finished_order_nums || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="未完成订单数" title-class="cell_title"  :icon="require('@/assets/mail2.png')" clickable :value="statistics.ongoing_order_nums || '请求错误'" is-link/>
      </van-cell-group>

      </div>
    </div>
  </div>
</template>

<script >
import PubSub from 'pubsub-js';
import serviceAxios from '@/http';


export default {
    name: "personal-center",
    data() {
        return {
            // tabbar id
           id: 2,
           statistics: {},
           src:localStorage.getItem('avatar_url'),
           name: localStorage.getItem('fanbook_nick_name'),
            barlist: [{
                    ico: require("@/assets/order.png"),
                    text: "全部订单"
                }, {
                    ico: require("@/assets/time.png"),
                    text: "待接单"
                }, {
                    ico: require("@/assets/car.png"),
                    text: "进行中"
                }, {
                    ico: require("@/assets/finish.png"),
                    text: "已完成"
                },
            ]
        };
    },
    methods: {
        handleclick(index) {
            switch (index) {
                case 0:
                    this.$router.replace({ path: "/order?condition=0" });
                    break;
                case 1:
                    this.$router.replace({ path: "/order?condition=1" });
                    break;
                case 2:
                    this.$router.replace({ path: "/order?condition=2" });
                    break;
                case 3:
                    this.$router.replace({ path: "/order?condition=3" });
                    break;
            }
        }
    },
    mounted() {
        PubSub.publish("changetabbar", this.id);
        serviceAxios({
            method: "get",
            url: "/fanbook/deliverbot/general/user_center/get_statistics"
        }).then((res) => { this.statistics = res; });
    }
}

</script>

<style scoped lang="less">
  .main{
    height: 800px;
    background-color: #EFEFEF ;
  }
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