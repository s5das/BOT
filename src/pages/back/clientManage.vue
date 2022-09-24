<template>
    <div>
        <div class="search">
            <van-icon name="search" size="20"></van-icon>
            <input type="text" placeholder="请输入名称" @input="keyChangeHandler">
        </div>
        
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getClientInfos">
                <div class="list">
                    <div class="client-info" v-for="item in clientInfos" :key="item.client_id">
                        <div class="left-img"></div>
                        <div class="right-info">
                            <div class="name">{{item.fanbook_nick_name}}</div>
                            <div class="item">{{item.phone_number}}></div>
                            <div class="item">{{item.total_create_order_num}}</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { blurSearchClients } from '@/http/api/back/clientController';
    export default {
        data() {
            return {
                timer: null,
                key: '',

                serial_number: 1,
                finished: false,
                refreshing: false,
                loading: false,

                clientInfos: [{
                    "client_id": "客户的id",
                    "fanbook_nick_name": "客户1",
                    "phone_number": "133366666666",
                    "total_create_order_num": 11
                },{
                    "client_id": "客户的id1",
                    "fanbook_nick_name": "客户2",
                    "phone_number": "133366666666",
                    "total_create_order_num": 11
                },{
                    "client_id": "客户的id2",
                    "fanbook_nick_name": "客户3",
                    "phone_number": "133366666666",
                    "total_create_order_num": 11
                }]
            }
        },
        methods: {
            onRefresh() {
                this.serial_number = 1
                this.finished = false
                this.clientInfos = []
                this.getClientInfos()
                this.refreshing = false
            },
            keyChangeHandler(e) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    // console.log(e.data)
                    this.key = e.data
                    this.onRefresh()
                }, 1000)
            },
            getClientInfos() {
                blurSearchClients({
                    client_fanbook_nick_name: this.key === '' ? null : this.key,
                    serial_number: this.serial_number
                }).then(res => {
                    this.clientInfos = [...this.clientInfos, ...res]
                    let length = res.length
                    if(length < 10) {
                        this.finished = true
                    } else {
                        this.serial_number++
                    }
                    this.loading = false
                }, () => {
                    this.loading = false
                })
                this.loading = true
            }
        },
    }
</script>

<style lang="less" scoped>
.search {
    display: flex;
    align-items: center;
    width: 80%;
    height: 40px;
    margin: 0 auto;
    padding-left: 3px;
    border-radius: 5px;
    background-color: #FFFFFF;
}

.list {
    margin-top: 20px;
    min-height: 800px;

    .client-info{
        display: flex;
        align-items: center;
        background-color: #FFF6F1;
        width: 360px;
        height: 100px;
        margin: 20px auto;
        .left-img {
            margin-right: 10px;
            width: 60px;
            height: 60px;
            margin-left: 26px;
        }
        .right-info {
            display: flex;
            flex-direction: column;
            .name {
                font-size: 18px;
                color: rgba(88,74,72,1);
            }
            .item {
                font-size: 16px;
                color: rgba(125,124,123,1);
            }
        }
    }
}
</style>