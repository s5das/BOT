<template>
  <div class="box">
  <div class="jine">
    <div class="title">金额</div>
    <div class="content">¥ {{orderinfo.reward}}</div>
  </div>
  <div class="location">
    <div class="title">收件地址</div>
    <div class="content">{{orderinfo.deliver_address}}</div>
  </div>
  <div class="kuaididian">
    <div class="title">快递点</div>
    <div class="content">{{orderinfo.pickup_address}}</div>
  </div>
  <div class="size_num">
     <div class="size">
        <div class="title">快递规格</div>
    <div class="content">{{orderinfo.spec_name}}</div>
     </div>
      <div class="num">
        <div class="title">快递数量</div>
    <div class="content">{{orderinfo.num_of_packages}}</div>
      </div>
  </div>
  <div class="arrivetime"> 
    <div class="title">送达时间</div>
    <div class="content">{{orderinfo.deliver_time_period_string}}</div>
  </div>
  <div class="beizhu">
    <div class="title">备注</div>
    <div class="content">{{orderinfo.remarks}}</div>
  </div>
  <div class="status" v-if="orderinfo.order_status=='待接单'">
    <img src="@/assets/daijiedan.png" alt="">
  </div>
  <div class="status" v-if="orderinfo.order_status=='派送中'">
    <img src="@/assets/paisongzhong.png" alt="">

  </div>
  </div>
</template>

<script>

export default {
    name: 'order-info',
    props: ['orderinfo'],
    data() {
        return {
        }
  }
}
</script>

<style scoped lang="less">
.box{
    width: 386px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 10px 10px 0 0;

    padding: 42px 0 0 34px;
    padding-bottom: 2px;
    
    position: relative;
    margin: 0 auto;
.location,
.kuaididian,
.size,
.num,
.arrivetime,
.beizhu
{
    height: 62px;
    display: flex;
    flex-direction: column;
    justify-content:space-between ;
    margin-bottom: 16px;
    .title{
        color:#BBB;
        font-size: 16px;
    }
    .content{
       font-size: 16px;
    }
}
.jine{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content:space-between ;
    margin-bottom: 16px;
    .title{
        color:#BBB;
        font-size: 18px;
    }
    .content{
       font-size: 38px;
       font-weight: 600;
       color: #F19940;
    }
}
.size_num{
display: flex;
justify-content: flex-start;
.size{
    margin-right: 80px;
}
}
.status{
position: absolute;
height: 90px;
width: 90px;
top: 0;
right: 0;
img{
  height: 100%;
  width: 100%;
}
}
}

</style>