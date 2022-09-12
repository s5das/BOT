<template>
  <div>
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
          <div class="b3_left">体现至</div>
          <div class="b3_right">
          <div><img src="@/assets/wechat.png"></div>
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
      <div>{{item.way}}</div>
      <div>{{item.date}}</div>
     </div>
   
    <div class="bottom">
      <div class="left">
        <div style="margin-bottom:10px;font-size: 20px;">{{item.num}}</div>
        <div style="font-size:14px">提现金额（元）</div>
      </div>
      <div :class="item.status==='审核中'?'right1':'right2'">
          {{item.status}}
      </div>
    </div>
  </div>
  </div> </div>
</template>

<script>
export default {
    name: 'with-draw',
    data() {
        return {
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
    }
}
</script>
<style scoped lang="less">

.box1{
height: 170px;
background-color: #eb2929;
position: relative;
margin-bottom: 280px;

.title{
  position: absolute;
  top: 21px;
  left: 11px;
  color: #fff;
  font-weight: 500;
  font-size:15px ;
}
.money{
  font-size: 25px;
  color: #fff;
  position: relative;
  font-weight: 500;
  top: 80px;
  left: 11px;
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
padding: 16px 10px 16px 10px;
top: 145px;
border-radius: 6px;
left: 6px;

.b1{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
    
}
.b2{
display: flex;
align-content: center;
justify-content: space-around;
margin-bottom: 10px;
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
  border-radius: 25px;
  background: #ed4e4e;
}
}
}}
.list_status{
  width: 360px;
  margin: 0 auto;

  .items{
     padding: 10px;
     border-radius: 10px;
     background-color: #fff;
     margin-bottom: 32px;
    .head{
     height: 35px;
     display: flex;
     justify-content: space-between;
     line-height: 35px;
     border-bottom: #bbb 1px solid;
    }
    .bottom{
       height: 90px;
       background-color: #fff;
       display: flex;
       justify-content: space-around;

       .right1{
         color: #E99D42;
         font-size: 20px;
         line-height: 90px;

        }
       .right2{
         color: #EA0C0C;
         font-size: 20px;
         line-height: 90px;
       }
       .left{
          
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
       }
    }
  }
}
</style>