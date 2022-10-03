<template>
  <div class="main">
    <div id="my-navigation" class="navigation">
    <div v-for="(item) in items" :key="item" :class="{item:true}" @click="select(item)" :data-id="item">
        <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        appear
        >
        <div :class="{circle2:selected.indexOf(item)!=-1,circle1:selected.indexOf(item)==-1}" v-if="status==1"></div>
        </transition>
        {{item}}
        <div v-if="status==1" class="more"><img src="@/assets/back14.png" class="more_ico"></div>
    </div></div>
    <div class="bottom">
        <div class="left" @click="handle1">{{box_text[status][0]}}</div>
        <div class="right" @click="handle2">{{box_text[status][1]}}</div>
    </div>
    <van-dialog v-model="show"  show-cancel-button :before-close="beforeClose">
        <div class="dialog_content">
            <div class="title">新建快递柜</div>
            <div  class="in1"><input type="text" placeholder="请输入快递柜名称" v-model="location_name"></div>
        </div>
    </van-dialog>
  </div>
</template>

<script>
import serviceAxios from '@/http';
import Sortable from 'sortablejs';
import 'animate.css'
export default {

    name: 'location-settings',

    data() {
        return {
            items: ['深大一区18546354','深大二区18546354','深大三区18546354' ], 
            show: false,
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
            url: '/fanbook/deliverbot/general/pickup_station/get_all',
            method: 'get',
            }).then((res) => {
                this.items=[]
                for (var i = 0; i < res.data.length; i++){
                    let temp = res.data[i]
                    this.items.push(temp.pickup_address)
                }
            })
        },


        handle1() {
            if (this.status == 0) {
                this.show = true              
            }
            if (this.status == 1) {
                this.status = 0
                this.sortable.option('disabled', true)
                this.getInfo()
                this.selected = []
                console.log(this.arr_aftermove);
                this.sortable.sort(this.items, true)
                console.log(this.arr_aftermove);
            }
        },


        beforeClose(action,done) {
        if (action === 'confirm') {
            if (this.location_name) {
                serviceAxios({
                    method: 'post',
                    url:'/fanbook/deliverbot/back/admin/pickup_stations/add',
                    data:{pickup_station_name:this.location_name}
                }).then(() => {
                    this.location_name = '';
                    this.getInfo();
                    done()
                }, () => { done(false) })
            } else {
                done(false)
            }
        } else {
            this.location_name = ''
            done()
        }
        },

        handle2() {
            if (this.status == 0) {
                this.status = 1
                this.sortable.option('disabled', false)
                this.arr_aftermove =this.items
            } else {
                let new_station_list = []
                for (let i = 0; i < this.arr_aftermove.length; i++) {
                    if (this.selected.indexOf(this.arr_aftermove[i]) === -1) {
                        new_station_list.push({ pickup_station_name: this.arr_aftermove[i] })
                    }
                }
                serviceAxios({
                    method: 'post',
                    url:'/fanbook/deliverbot/back/admin/pickup_stations/reset_station_list',
                    data: {
                        new_station_list
                    }
                }).then(() => {
                    this.status = 0; this.sortable.option('disabled', true);
                    this.getInfo();
                })
                
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
        },
        
        },

        mounted() {
            this.getInfo();
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
                    })

                },
            };
            //初始化
            this.sortable = Sortable.create(el, ops);
        }
}

</script>

<style scoped lang="less">


.main{
    padding-top:30px;
    .item{
        height:60px;
        width: 410px;
        margin: 0 auto; 
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        background: #fff;
        text-indent: 25px;
        position: relative;
    .more{
     position: absolute;
     right: 40px;
     top: 32.5px;
     height: 15px;
     width: 15px;
    .more_ico{
        width: 100%;
        height: 100%;
    }
}
    }
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