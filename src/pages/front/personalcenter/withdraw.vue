<template>
  <div class="main" :style="{height:h+'px'}">
    <div class="box1">
      <div class="title">可提现金额 (元)</div>
      <div class="money">
        <div class="yuan1">¥</div>
        <div>{{max_num}}</div>
      </div>
      <div class="box2">
        <div class="b1">提现金额</div>
        <div class="b2">
          <div class="yuan2">¥</div>
          <div><input class="in" type="text" v-model="num"></div>
          <div style="color:#EA0C0C;line-height: 40px;" @click="getmax">全部提现</div>
        </div>
        <div class="b3">
          <div class="b3_left">提现至</div>
          <div class="b3_right">
          <div><img style='margin-right: 5px;' src="@/assets/wechat.png"></div>
          <div>微信钱包</div>
        </div>
        </div>
        <div class="b4">
          <button>申请提现</button>
        </div>
      </div>
    </div>
    <div class="list_status">
    <div class="items" v-for="(item) in details" :key="item.id">
     <div class="head">
      <div style="margin-left:20px">{{item.way}}</div>
      <div style="margin-right:23px">{{item.date}}</div>
     </div>
   
    <div class="bottom">
      <div class="left">
        <div style="margin-bottom:10px;font-size: 24px;color: #EA0C0C;font-weight: 600;">{{item.num}}</div>
        <div style="font-size:14px">提现金额（元）</div>
      </div>
      <div class="status" v-if="item.status==='审核中'">
          <img class="statusico" src="@/assets/shenhe.png">
      </div>
      <div class="status" v-if="item.status==='提现成功'">
          <img class="statusico" src="@/assets/chengong.png">
      </div>
    </div>
  </div>
  </div> </div>
</template>

<script>
import serviceAxios from '@/http'
export default {
    name: 'with-draw',
    data() {
        return {
          h:document.body.clientHeight,
          num: '',
          max_num: 10000,
          details: [{
            id: '1321324',
            date: '2020-4-12 16:12:41',
            way:'中国工商银行',
            num: 300,
            status: '审核中'
          },
          {
            id: '1534654',
            date: '2020-4-12 16:12:41',
            way:'中国工商银行',
            num: 300,
            status: '提现成功'
          },
          ]
      }
  },
  methods: {
        getmax(){
          this.num = this.max_num
      }
  },
  mounted() {
    serviceAxios({
      method: 'get',
      url: '/fanbook/deliverbot/front/withdraw_money/get_could_withdraw'
    }).then((res) =>{this.max_num = res})
    }

}
</script>
<style scoped lang="less">
.main{
background: url('@/assets/个人中心.png');
}
.box1{
height: 170px;
position: relative;
margin-bottom: 280px;

.title{
  position: absolute;
  top: 50px;
  left: 34px;
  color: #000;
  font-weight: 600;
  font-size:15px ;
}
.money{
  font-size: 30px;
  color: #E85F5F;
  position: relative;
  font-weight: 600;
  top: 80px;
  left: 34px;
  display: flex;
  .yuan1{
    font-size: 15px;
    line-height: 30px;
  }

}
.box2{
width: 360px;
height: 250px;
background-color: #fff;
position: absolute;
padding: 16px 20px 16px 20px;
top: 145px;
border-radius: 6px;
left: 14px;

.b1{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;
    
}
.b2{
display: flex;
align-content: center;
justify-content: space-around;
margin-bottom: 10px;
margin-left: 10px;
.yuan2{
  font-size: 35px;
  color: #000;
}
.in{
    height: 100%;
    color: #000;
    font-size: 20px;
    margin-left: 30px;
  }
}

.b3{
display: flex;
justify-content: space-between;
color:#101010;
margin-bottom: 30px;
margin-left: 10px;
  .b3_right{
   display: flex;
  }
}

.b4{
height: 51px;
width: 312px;
margin: 0 auto;

color: #fff;
button{
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(138deg,#FD9448,#FF7A55);
}
}
}}
.list_status{
  width: 400px;
  margin: 0 auto;

  .items{
     width: 380px;
     padding: 10px;
     border-radius: 10px;
     background-color: #fff;
     margin-bottom: 32px;
    .head{
     height: 35px;
     display: flex;
     justify-content: space-between;
     line-height: 35px;
    }
    .bottom{
       height: 90px;
       background-color: #fff;
       display: flex;
       justify-content: space-around;
    .status{
      display: flex;
      align-items: center;
    }
    .statusico{
      height: 60px;
      width: 75px;
    }
       .left{
          
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
       }
    }
  }
}
</style>