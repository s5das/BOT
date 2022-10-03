<template>
    <div class="main" :style="{height:h+'px'}">

        <div class="in1">
            <div class="find">
                <img src="@/assets/back10.png">
            </div>
            <input type="text" v-model="client_fanbook_nick_name" placeholder="请输入名称" @blur="search">
        </div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="item" v-for="(item,index) in client_id" :key="item">
                    <div class="ico"><img :src="avatar_url[index]"></div>
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
import serviceAxios from '@/http/api/back/httpForBack';
import { Toast } from 'vant';
export default {
    name: 'customer-manage',

    data() {
        return {
            h: document.body.clientHeight,
            finished: false,
            loading: false,
            refreshing: false,
            serial_number: 1,
            client_fanbook_nick_name: '',
            client_id: [],
            fanbook_nick_name: [],
            phone_number: [],
            total_create_order_num: [],
            avatar_url: []
        }
    },
    computed: {
        content() {
            if (this.client_fanbook_nick_name) {
                return this.client_fanbook_nick_name
            } else {
                return ''
            }

        }
    },
    methods: {
    
        onLoad() {
          setTimeout(() => {
            if (this.refreshing) {
                this.client_id = []
                this.avatar_url = []
                this.fanbook_nick_name = []
                this.phone_number = []
                this.total_create_order_num = []
                this.refreshing = false
            }

            serviceAxios({
                method: 'post',
                url: '/fanbook/deliverbot/back/admin/client/blur_search_clients',
                data: {
                    client_fanbook_nick_name: this.content,
                    serial_number: this.serial_number
                }
            }).then((res) => {
                for (var i = 0; i < res.length; i++) {
                    let temp = res[i]
                    this.client_id.push(temp.client_id)
                    this.avatar_url.push(temp.avatar_url)
                    this.fanbook_nick_name.push(temp.fanbook_nick_name)
                    this.phone_number.push(temp.phone_number)
                    this.total_create_order_num.push(temp.total_create_order_num)
                }

                if (res.length < 10) {
                    this.finished = true
                }
                this.serial_number++
                this.loading = false

            },
                () => {
                    Toast.fail('请求失败')
                    this.finished = true
                    this.loading = false
                }
            )
        }, 1000);
        },
        onRefresh() {
            this.loading = true
            this.finished = false
            this.serial_number = 1
            this.onLoad()
        },
        search() {
            this.refreshing = true
            this.onRefresh()
        }
    }

}
</script>

<style scoped lang="less">
.main {
    padding-top: 20px;
    box-sizing: border-box;
    background: url('@/assets/bg1.png');
    overflow: scroll;

    .in1 {
        height: 40px;
        width: 360px;
        margin: 0 auto;
        margin-bottom: 30px;
        display: flex;
        background-color: #fff;

        .find {
            flex: 1;
            display: flex;
            align-items: center;

            img {
                height: 70%;
                width: 70%;
            }
        }

        input {
            flex: 9;
        }

    }

    .item {
        display: flex;
        align-items: center;
        border-radius: 15px;
        height: 100px;
        width: 410px;
        margin: 0 auto;
        margin-top: 15px;
        background-color: #fff;

        .ico {
            margin-left: 20px;
            margin-right: 20px;
            height: 60px;
            width: 60px;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .detail {
            height: 79px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .title {
                font-weight: 600;
                font-size: 18px;
            }
        }
    }
}
</style>