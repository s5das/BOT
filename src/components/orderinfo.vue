<template>
  <div class="box">
  <div class="jine">
    <div class="title">金额</div>
    <div class="content">¥ {{orderinfo.jine}}</div>
  </div>
  <div class="location">
    <div class="title">收件地址</div>
    <div class="content">{{orderinfo.location}}</div>
  </div>
  <div class="kuaididian">
    <div class="title">快递点</div>
    <div class="content">{{orderinfo.kuaididian}}</div>
  </div>
  <div class="size_num">
     <div class="size">
        <div class="title">快递规格</div>
    <div class="content">{{orderinfo.size}}</div>
     </div>
      <div class="num">
        <div class="title">快递数量</div>
    <div class="content">{{orderinfo.num}}</div>
      </div>
  </div>
  <div class="arrivetime"> 
    <div class="title">送达时间</div>
    <div class="content">{{orderinfo.arrivetime}}</div>
  </div>
  <div class="beizhu">
    <div class="title">备注</div>
    <div class="content">{{orderinfo.beizhu}}</div>
  </div>
  <div class="status">
    {{orderinfo.status}}
  </div>
  </div>
</template>

<script>
export default {
    name: 'order-info',
    props: [],
    data() {
        return {
            orderinfo: {
                status:'待接单',
                jine: '5.00',
                location: '收件地址',
                kuaididian: '深大一区',
                size: '大件（3-5kg）',
                num: 1,
                arrivetime: '2022-08-07  15：00 ~ 18:00',
                beizhu:'这是备注'
            }
        }
    }
}
</script>

<style scoped lang="less">
.box{
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    border-bottom: dashed 2px #BBB;
    padding: 42px 0 0 34px;
    position: relative;
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
       color: red;
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
top: 40px;
right: 26px;
font-size: 22px;
color: #E99D42 ;
}
}

</style>