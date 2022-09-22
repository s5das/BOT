<template>
    <div class="main">
      <div v-for="(item,index) in name" :key="item" :class="{item:true,selected:selected.indexOf(index)!=-1}" @click="select(index)">
        <div class="name"> 
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut"
          appear
          >
          <div class="circle" v-if="status==1"></div>
          </transition>
          {{item}}
        </div> 
          <div class="detail">
              <div class="reward">{{reward[index]}}元</div>
              <div class="rate">提成比例{{rate[index]}}%</div>
          </div>
      </div>
      <div class="bottom">
          <div class="left" @click="handle1">{{box_text[status][0]}}</div>
          <div class="right" @click="handle2">{{box_text[status][1]}}</div>
      </div>
    </div>
  </template>
  
  <script>
  import serviceAxios from '@/http';
  import 'animate.css'
  export default {
  
      name: 'size-settings',
  
      data() {
          return {
              reward: [10, 20, 30],
              name: ['大件（3-5kg）', '中件（1-2kg）', '小件（1kg以下）'],
              rate:[0.1,0.2,0.3],
              location_name: '',
              status: 0,
              box_text: [['新建', '管理'], ['返回', '删除']],
              selected : []           
          }
      },
  
      methods: {
  
  
          getInfo() {
              serviceAxios({
              url: '/fanbook/deliverbot/general/order/get_specifications',
              method: 'get',
              }).then((res) => {
                  this.reward = res.data.reward_per_package
                  this.name = res.data.spec_name
                  this.rate = res.data.royalty_rate
              }, (err) => { console.log(err.message); })
          },
  
  
          handle1() {
              if (this.status == 0) {
                  this.$router.push({
                    path:'/back/gennewsize'
                  })            
              }
              if (this.status == 1) {
                  this.status = 0
                  this.selected = []
              }
  
          },
  
          handle2() {
              if (this.status == 0) {
                  this.status = 1
              } else {
                  let final_reward = []
                  let final_rate = []
                  let final_name =[]
                  for (let i = 0; i < this.reward.length; i++) {
                      if (this.selected.indexOf(i) === -1) {
                          final_reward.push(this.reward[i])
                          final_rate.push(this.rate[i])
                          final_name.push(this.name[i])
                      }
                  }

                  serviceAxios({
                      method: 'post',
                      url:'/fanbook/deliverbot/back/admin/specs/reset_spec_list',
                      data: {
                          reward_per_package: final_reward,
                          royalty_rate: final_rate,
                          specification_name:final_name
                      }
                  }).then(() => { this.status = 0; this.getInfo()})
              }
  
          }, 
  
          select(index) {
              if (this.status == 1) {
                  if (this.selected.indexOf(index) === -1) {
                      this.selected.push(index)                    
                  } else {
                      this.selected.splice(this.selected.indexOf(index),1)
                  }
  
              }
          }
          },
          mounted() {
              this.getInfo();
          }
  }
  
  </script>
  
  <style scoped lang="less">
  .selected{
      background-color: rgb(226, 241, 247) !important;
  }
  .main{
      padding-top:30px;
      .item{
          height:80px;
          width: 365px;
          margin: 0 auto; 
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 600;
          background: #fff;
          text-indent: 25px;
           .name{
            display: flex;
            align-items: center;
             .circle{
              height: 10px;
              width: 10px;
              border-radius: 5px;
              background-color: pink;
              margin-left: 10px;
              margin-right: 10px;
          }
          }

      }
      .detail{
         color: #bbb;
         margin-right: 10px;
         height:50px ;
         width: 150px;
         display: flex;
         flex-direction: column;
         align-items:flex-end;
         justify-content: space-between;
         .reward{
            
         }
         .rate{

         }
      }
      .bottom{
          position: fixed;
          height: 60px;
          width: 100%;
          bottom: 0px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          .left{
            width: 80px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            color: #EF7C26;
          }
          .right{
            width: 80px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            color: #EF7C26;
          }
      }
      .dialog_content{
          height: 150px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .title{
             font-size: 18px;
             font-weight: 600;
             height:50px;
             line-height: 50px;
             text-align: center;
          } 
          .in1{
              display: flex;
              justify-content: center;
              align-items: center;
             height: 100px;
             input{
              height: 30px;
              width: 100%;
              text-align: center;
              border-radius: 5px;
              border: 1px solid #bbb;
             }
          }
      }
  }
  </style>