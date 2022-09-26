<template>
  <div class="main">

       <div class="in1">
        <div class="find">
        <img src="@/assets/back10.png">
        </div>
        <input type="text" v-model="client_fanbook_nick_name" placeholder="请输入名称" @blur="search"></div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div class="item" v-for="(item,index) in client_id" :key="item">
                <div class="ico"><img src="@/assets/back9.png" ></div>
                <div class="detail">
                    <div class="title">{{fanbook_nick_name[index]}}</div>
                    <div>
                        <div>手机号：{{phone_number[index]}}</div>
                        <div>下单数：{{total_create_order_num[index]}}</div>
                    </div>
                </div>
            </div>
            </van-list>
                
        </van-pull-refresh>

  </div>
</template>

<script>
import serviceAxios from '@/http';
import { Toast } from 'vant';
export default {
    name: 'customer-manage',

    data() {
        return {
            finished:false,
            loading: false,
            isLoading: false,
            serial_number: 1,
            client_fanbook_nick_name: '',
            client_id: ['1','456'],
            fanbook_nick_name: ['coffee','wwt'],
            phone_number: ['1825496844','54456458'],
            total_create_order_num:['5646','57445'],
        }
    },
    computed:{
        content() {
            if (this.client_fanbook_nick_name) {
                return this.client_fanbook_nick_name               
            } else {
                return 'null'
            }

         }
    },
    methods:{
        getinfo(name,num) {
            serviceAxios({
                method: 'post',
                url: '/fanbook/deliverbot/back/admin/client/blur_search_clients',
                data: {
                    name,
                    num
                }
            }).then((res) => {
                    this.client_id.concat(res.client_id)
                    this.fanbook_nick_name.concat(res.fanbook_nick_name)
                    this.phone_number.concat(res.phone_number)
                    this.total_create_order_num.concat(res.total_create_order_num)
            },
                () => {
                    this.finished = true
                }
            )
        },
        changeinfo(name,num) {
            serviceAxios({
                method: 'post',
                url: '/fanbook/deliverbot/back/admin/client/blur_search_clients',
                data: {
                    name,
                    num
                }
            }).then((res) => {
                    this.client_id=res.client_id
                    this.fanbook_nick_name=res.fanbook_nick_name
                    this.phone_number=res.phone_number
                    this.total_create_order_num=res.total_create_order_num
            },
                () => {
                    Toast.fail('刷新失败')
                }
            )
        },
        onLoad() {
            this.getinfo(this.content, this.serial_number)
            this.serial_number++
            
        },
        onRefresh() {
            this.serial_number = 1
            this.changeinfo(this.content, this.serial_number);
            this.serial_number++
            this.isLoading =false
        },
        search() {
            this.changeinfo(this.content, 1)
            this.serial_number++
        }
    },
    mounted() {
        this.changeinfo(this.content, this.serial_number);
        this.serial_number ++
    }
}
</script>

<style scoped lang="less">

    .main{
        padding-top: 30px;
        .in1{
            height: 35px;
            width: 320px;
            margin: 0 auto;
            margin-bottom: 30px;
            display: flex;
            background-color: #fff;
            .find{
                flex: 1;
                display: flex;
                align-items: center;
                img{
                height: 70%;
                width: 70%;
            }
            }
            input{
                flex: 9;
            }

        }
        .item{
            display: flex;
            align-items: center;
            border-radius: 15px;
            height: 110px;
            width: 360px;
            margin: 0 auto;
            margin-top: 15px;
            background-color: #fff;
            .ico{
              margin-left: 20px;
              margin-right: 20px;
              height: 70px;
              width: 70px;
              img{
                height: 90%;
                width: 90%;
                }
            }
            .detail{
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title{
                   font-weight: 600px;
                   font-size: 18px;
                }
            }
        }
    }
</style>