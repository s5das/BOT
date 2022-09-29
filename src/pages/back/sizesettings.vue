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
import { Toast } from 'vant';
  export default {
  
      name: 'size-settings',
  
      data() {
          return {
              reward: [],
              name: [],
              rate: [],
              
              location_name: '',
              status: 0,
              box_text: [['新建', '管理'], ['返回', '确定']],
              selected: [],
              arr_aftermove: [],
              sortable:''           
          }
      },
  
      methods: {
  
  
          getInfo() {
              return serviceAxios({
              url: '/fanbook/deliverbot/general/order/get_specifications',
              method: 'get',
              }).then((res) => {
                      this.reward = []
                      this.name = []
                      this.rate = []
                      for (var i = 0; i < res.length; i++){
                        let temp = res[i]
                        this.reward.push(temp.reward_per_package)
                        this.name.push(temp.spec_name)
                        this.rate.push(temp.royalty_rate)                             
                      }
                          
              },
             ()=>{Toast.fail('请求频繁')}
              )
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
                  this.sortable.sort(this.name,true)
              }
  
          },
  
          handle2() {
              if (this.status == 0) {
                  this.status = 1
                  this.sortable.option('disabled', false)
                  this.arr_aftermove = this.name
              } else {
                      let new_spec_list = []
                      for (let i = 0; i < this.arr_aftermove.length; i++) {
                          if (this.selected.indexOf(this.arr_aftermove[i]) === -1) {
                              let a = this.name.indexOf(this.arr_aftermove[i])
                              new_spec_list.push({
                                  reward_per_package: this.reward[a],
                                  royalty_rate: this.rate[a],
                                  specification_name:this.name[a]
                              })
                              
                             
                          }
                      }
                     
                      console.log(new_spec_list);
                      serviceAxios({
                          method: 'post',
                          url: '/fanbook/deliverbot/back/admin/specs/reset_spec_list',
                          data: {
                            new_spec_list
                          }
                      }).then(() => { this.status = 0; this.sortable.option('disabled', false); this.getInfo() })
                  
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
        
            this.getInfo()
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
          height:86px;
          width: 410px;
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
            font-size: 18px;
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