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
    <div class="content">{{userinfo.name}}</div>
     </div>
     <div class="phone">
      <div class="title">手机号</div>
    <div class="content">{{userinfo.phone}}</div>
     </div>
    </div>
    <div class="pic">
    <img :src="userinfo.pic" >
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  props: ['id'],
  data() {
    return {
      userinfo: {
        name: '朱猪猪',
        phone: 18612345678,
        pic:require('@/assets/customer.png')
      }
    }
  }
}
</script>

<style scoped lang="less">
.box{
  margin:0 5px 5px 5px;
  background-color: #fff;
  padding: 20px 0 70px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
.head{
   font-size: 16px;
   display: flex;
   margin-bottom: 10px;
  .left{
   font-weight: 600;
   margin-right: 10px;
  }

  .right{
   color: #BBB;
  }
}
.info{
margin-left: 20px;
.name_phone{

display: flex;
justify-content: flex-start;
.name,
.phone
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
.name{
  margin-right: 80px;
}
}
.pic{
  width: 98px;  
  img{
    width: 100%;
    height: auto;
  }
}
}
}
</style>