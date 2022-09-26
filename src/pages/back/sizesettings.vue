<template>
    <div class="main">
        <div id="my-navigation" class="navigation">
      <div v-for="(item,index) in name" :key="item" :class="{item:true}" @click="select(item)" :data-id="item">
        <div class="name"> 
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut"
          appear
          >
          <div :class="{circle2:selected.indexOf(item)!=-1,circle1:selected.indexOf(item)==-1}" v-if="status==1"></div>
          </transition>
          {{item}}
        </div> 
        <div v-if="status==1" class="more"><img src="@/assets/back14.png" class="more_ico"></div>
          <div class="detail">
              <div class="reward">{{reward[index]}}元</div>
              <div class="rate">提成比例{{rate[index]}}%</div>
          </div>
      </div></div>
      <div class="bottom">
          <div class="left" @click="handle1">{{box_text[status][0]}}</div>
          <div class="right" @click="handle2">{{box_text[status][1]}}</div>
      </div>
    </div>
  </template>
  
  <script>
import serviceAxios from '@/http';
import Sortable from 'sortablejs';
  import 'animate.css'
  export default {
  
      name: 'size-settings',
  
      data() {
          return {
              reward: [10, 20, 30],
              name: ['大件（3-5kg）', '中件（1-2kg）', '小件（1kg以下）'],
              rate: [0.1, 0.2, 0.3],
              
              location_name: '',
              status: 0,
              box_text: [['新建', '管理'], ['返回', '删除']],
              selected: [],
              arr_aftermove: [],
              sortable:''           
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
                  this.sortable.option('disabled',true)
                  this.selected = []
              }
  
          },
  
          handle2() {
              if (this.status == 0) {
                  this.status = 1
                  this.sortable.option('disabled', false)
              } else {
                  if (this.selected.length>0) {
                      let final_reward = []
                      let final_rate = []
                      let final_name = []
                      for (let i = 0; i < this.arr_aftermove.length; i++) {
                          if (this.selected.indexOf(this.arr_aftermove[i]) === -1) {
                              let a = this.name.indexOf(this.arr_aftermove[i])
                              final_reward.push(this.reward[a])
                              final_rate.push(this.rate[a])
                              final_name.push(this.name[a])
                          }
                      }
                      console.log(final_reward);
                      console.log(final_rate);
                      console.log(final_name);
                      serviceAxios({
                          method: 'post',
                          url: '/fanbook/deliverbot/back/admin/specs/reset_spec_list',
                          data: {
                              reward_per_package: final_reward,
                              royalty_rate: final_rate,
                              specification_name: final_name
                          }
                      }).then(() => { this.status = 0; this.sortable.option('disabled', false); this.getInfo() })
                  }
              }
  
          }, 
  
          select(item) {
              if (this.status == 1) {
                  if (this.selected.indexOf(item) === -1) {
                      this.selected.push(item)                    
                  } else {
                      this.selected.splice(this.selected.indexOf(item),1)
                  }
   
              }
              console.log(this.selected);
          }
          },
          mounted() {
              this.getInfo();
            this.arr_aftermove =this.name
            var el = document.getElementById('my-navigation');
            //设置配置
            var ops = {
                animation: 200,
                group: '',
                draggable: '.item', // 要拖动的目标
                disabled: true, //是否禁用拖拽和排序
                dataIdAttr: 'data-id', //指定获取拖动后排序的属性
                //拖动结束
                onEnd:()=> {
                    //获取拖动后的排序
                    this.$nextTick(() => {
                    var arr = this.sortable.toArray();
                    // arr数组里的值是 data-id 的顺序
                    this.arr_aftermove = arr
                    console.log(this.arr_aftermove);
                    })

                },
            };
            //初始化
            this.sortable = Sortable.create(el, ops);
          }
  }
  
  </script>
  
  <style scoped lang="less">
    .more{
     position: absolute;
     right: 40px;
     top: 32.5px;
     height: 15px;
     width: 15px;
    .more_ico{
        width: 100%;
        height: 100%;
    }}
  .main{
      padding-top:30px;
      .item{
          height:80px;
          width: 365px;
          margin: 0 auto; 
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 15px;
          font-weight: 600;
          background: #fff;
          text-indent: 25px;
          position: relative;
           .name{
            display: flex;
            align-items: center;
            width: 200px;
            .circle1{
            height: 10px;
            width: 10px;
            border-radius: 7.5px;
            border: #EF7C26 1px solid;
            margin-left: 10px;
            margin-right: 10px;
          }
            .circle2{
                height: 11px;
                width: 11px;
                border-radius: 7.5px;
                background-color: #EF7C26;
                margin-left: 10px;
                margin-right: 10px;
            }
          }

      }
      .detail{

         color: #bbb;
         margin-right: 50px;
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