<template>
  <div class="main">
    <div v-for="(item,index) in items" :key="item" :class="{item:true,selected:selected.indexOf(index)!=-1}" @click="select(index)">
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
import 'animate.css'
export default {

    name: 'location-settings',

    data() {
        return {
            items: ['深大一区18546354','深大二区18546354','深大三区18546354' ], 
            show: false,
            location_name: '',
            status: 0,
            box_text: [['新建', '管理'], ['返回', '删除']],
            selected : []           
        }
    },

    methods: {


        getInfo() {
            serviceAxios({
            url: '/fanbook/deliverbot/general/pickup_station/get_all',
            method: 'get',
        }).then((res)=>{this.items = res.data.pickup_address},(err)=>{console.log(err.message);})
        },


        handle1() {
            if (this.status == 0) {
                this.show = true              
            }
            if (this.status == 1) {
                this.status = 0
                this.selected = []
            }

        },


        beforeClose(action,done) {
        if (action === 'confirm') {
            if (this.location_name) {
                serviceAxios({
                    method: 'post',
                    url:'/fanbook/deliverbot/back/admin/pickup_stations/add',
                    data:{pickup_station_name:this.location_name}
                }).then(() => { this.location_name = ''; this.getInfo(); done()},()=>{done(false)})
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
            } else {
                let final_list = []
                for (let i = 0; i < this.items.length; i++) {
                    if (this.selected.indexOf(i) === -1) {
                        final_list.push(this.items[i])
                    }
                }
                console.log(final_list);
                serviceAxios({
                    method: 'post',
                    url:'/fanbook/deliverbot/back/admin/pickup_stations/reset_station_list',
                    data: {
                        pickup_station_name:final_list
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
        font-size: 15px;
        font-weight: 600;
        background: #fff;
        text-indent: 25px;
        .circle{
            height: 10px;
            width: 10px;
            border-radius: 5px;
            background-color: pink;
            margin-left: 10px;
            margin-right: 10px;
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