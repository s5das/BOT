<template>
    <div class="main" :style="{height: total_h+'px'}">
        
        <!-- 派送员管理 -->
        <div class="filter-box">
            <div @click="isChoosingStatus = true" :class="['status-filter', isChoosingStatus ? 'active' : '']">
                <div class="title">{{status}}</div>
                <div class="label"></div>
            </div>
            <BlurSearch @confirmKey="confirmKey" @clearKey="clearKey"></BlurSearch>
        </div>



        <!-- 派送员信息列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getCourierInfos">
                <div class="list">
                    <div class="courierInfo" v-for="item in courierInfoS" :key="item.courier_id">
                    <div class="up">
                        <div @click="edit(item)" class="modify">
                            <!-- <van-icon color="#2B5ACC" name="edit" size='24'/> -->
                            <img src="@/assets/edit.png"/>
                        </div>
                        <div class="left">
                            <div class="up-img">
                                <!-- <img src="@/assets/back9.png" style="width: 60px; height: 60px; border-radius: 50%;"/> -->
                                <img :src="item.avatar_url" :onerror="defaultAvatar" style="width: 60px; height: 60px; border-radius: 50%;"/>
                            </div>
                            <div :class="['status', 's' + item.courier_status]">
                                {{{0: '正常接单', 1: '暂停接单'}[item.courier_status]}}
                            </div>
                        </div>
                        <div class="right">
                            <div class="name">{{item.real_name}}</div>
                            <div class="item">{{item.phone_number}}</div>
                            <div class="item">{{item.fanbook_nick_name}}</div>
                            <div class="item">{{item.remarks_at_register}}</div>
                            <div class="item">{{item.register_date}}</div>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="item">
                            <div class="l1">收入</div>
                            <div class="l2">{{item.money_earned}}</div>
                        </div>
                        <div class="item">
                            <div class="l1">余额</div>
                            <div class="l2">{{item.money_could_withdraw}}</div>
                        </div>
                    </div>
                    <div class="down">
                        <div class="item">
                            <div class="l1">全部订单</div>
                            <div class="l2">{{item.total_take_order_nums}}</div>
                        </div>
                        <div class="item">
                            <div class="l1">已完成订单</div>
                            <div class="l2">{{item.complete_order_nums}}</div>
                        </div>
                        <div class="item">
                            <div class="l1">未完成订单</div>
                            <div class="l2">{{item.ongoing_order_nums}}</div>
                        </div>
                    </div>
                    </div>
                </div>

            </van-list>
        </van-pull-refresh>


        <!-- 状态选择 弹出层 -->
        <van-popup class="status-pop" v-model="isChoosingStatus" position="top" duration="0.3">
            <div class="title" @click="isChoosingStatus = false">{{status}}</div>
            <div class="items">
                <div @click="chooseStatus(item.id)" :class="['item', idOfConditionsChosenBuf === item.id ? 'active' : '']" v-for="item in conditions" :key="item.id">
                    <div class="label"></div>
                    <div class="name">{{item.name}}</div>
                </div>
            </div>
            <div @click="confirmStatusChoose" class="confirm">完成</div>
        </van-popup>

        <!-- 编辑 弹出层 -->
        <van-popup v-model="isEditing">
            <div class="edit-box">
                <div class="title">编辑</div>
                <div class="item">
                    <div class="item-title">真实姓名</div>
                    <input class="input" type="text" v-model="real_name"/>
                </div>
                <div class="item">
                    <div class="item-title">手机号</div>
                    <input class="input" type="text" v-model="phone_number"/>
                </div>
                <div class="item">
                    <div class="item-title">备注</div>
                    <input class="input" type="text" v-model="remarks_at_register"/>
                </div>
                <div class="item">
                    <div class="item-title">接单状态</div>
                    <div class="courier-status" @click="isChoosingStatusInEditing = true">
                        <div class="value">{{{0: '正常接单', 1: '暂停接单'}[courier_status]}}</div>
                        <van-icon name="arrow" size='20'/>
                    </div>
                </div>
                <div class="buttons">
                    <div @click="confirmEdit" class="store">保存</div>
                    <div @click="cancelEdit" class="cancel">取消</div>
                </div>
            </div>
        </van-popup>

        <!-- 编辑 - 快递员状态选择 -->
        <van-popup v-model="isChoosingStatusInEditing" position="bottom">
            <van-picker title="接单状态" show-toolbar :columns="columns" @confirm="confirmChosenStatus" @cancel="isChoosingStatusInEditing = false"></van-picker>
        </van-popup>
    </div>
</template>

<script>
import { getCouriers, resetPrimaryInfo  } from '@/http/api/back/courierController';
import BlurSearch from '@/components/common/blurSearch.vue';
import { Toast } from 'vant';

    export default {
    data() {
        return {
            total_h: document.body.clientHeight,
            defaultAvatar: `this.src="${require('@/assets/back9.png')}"`,
            status: "接单状态",
            conditions: [{
                id: 0,
                name: '全部',
                value: -1
            },{
                id: 1,
                name: '正常接单',
                value: 0
            },{
                id: 2,
                name: '暂停接单',
                value: 1
            }],
            idOfConditionsChosenBuf: 0,
            idOfConditionsChosen: 0,
            isChoosingStatus: false,

            courier_name: '',
            courier_phone_number: '',
            serial_number: 1,

            refreshing: false,
            loading: false,
            finished: false,

            // courierInfoS: [{
            //     "avatar_url": "派送员的 fanbook 头像 url",
            //     "complete_order_nums": "100",
            //     "courier_id": "派送员的id",
            //     "courier_status": 0,
            //     "fanbook_nick_name": "派送员的 fanbook 昵称",
            //     "money_could_withdraw": "派送员剩余可提现金额",
            //     "money_earned": "派送员总收入",
            //     "ongoing_order_nums": "0",
            //     "phone_number": "派送员手机号",
            //     "real_name": "派送员真名",
            //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
            //     "remarks_at_register": "派送员入驻时填写的备注",
            //     "total_take_order_nums": "100"
            // }, {
            //     "avatar_url": "派送员的 fanbook 头像 url",
            //     "complete_order_nums": "派送员已完成订单数",
            //     "courier_id": "派送员的id2",
            //     "courier_status": 1,
            //     "fanbook_nick_name": "派送员的 fanbook 昵称",
            //     "money_could_withdraw": "派送员剩余可提现金额",
            //     "money_earned": "派送员总收入",
            //     "ongoing_order_nums": "派送员目前未完成的订单数",
            //     "phone_number": "派送员手机号",
            //     "real_name": "派送员真名",
            //     "register_date": "派送员入驻时间，格式：yyyy-MM-dd",
            //     "remarks_at_register": "派送员入驻时填写的备注",
            //     "total_take_order_nums": "派送员接取订单总数"
            // }],
            courierInfoS: [],
            courier_id: '',
            isEditing: false,
            
            phone_number: '',
            real_name: '',
            blur_search_context: '',
            remarks_at_register: '',
            courier_status: '',

            isChoosingStatusInEditing: false,
            columns: ['正常接单', '暂停接单']
        };
    },
    mounted() {
        this.edit(this.courierInfoS[0])
    },
    methods: {
        onRefresh() {
            this.serial_number = 1
            this.finished = false
            this.courierInfoS = []
            this.loading = true
            this.getCourierInfos().then(() => {
                this.refreshing = false
            })
        },
        confirmKey(data) {
            // console.log('confirmKey', data)
            this.blur_search_context = data.key

            this.onRefresh()
        },
        clearKey() {
            // console.log('clearKey')
            this.blur_search_context = ''
        
            this.onRefresh()
        },
        chooseStatus(id) {
            this.idOfConditionsChosenBuf = id
        },
        confirmStatusChoose() {
            this.idOfConditionsChosen = this.idOfConditionsChosenBuf
            this.status = this.conditions[this.idOfConditionsChosen].name
            this.isChoosingStatus = false
        
            this.onRefresh()
        },
        getCourierInfos() {
            let data = {
                blur_search_context: this.blur_search_context,
                courier_status: this.conditions[this.idOfConditionsChosen].value,
                serial_number: this.serial_number
            }
            console.log(data)
            getCouriers(
                data
            ).then(res => {
                this.courierInfoS = this.courierInfoS.concat(res)

                let length = res.length
                if(length < 10) {
                    this.finished = true
                } else {
                    this.serial_number++
                }
                
                this.loading = false
            }, () => {
                // 失败了就不请求了，重进页面才请求
                this.finished = true
                this.loading = false
            })
            return Promise.resolve()
        },
        edit(item) {
            console.log(item)
            this.real_name = item.real_name
            this.phone_number = item.phone_number
            this.remarks_at_register = item.remarks_at_register
            this.courier_status = item.courier_status
            this.courier_id = item.courier_id
            this.isEditing = true
        },
        cancelEdit() {
            this.isEditing = false
        },
        confirmEdit() {
            resetPrimaryInfo({
                courier_id: this.courier_id,
                courier_status: this.courier_status,
                phone_number: this.phone_number,
                real_name: this.real_name,
                remarks_at_register: this.remarks_at_register
            }).then(() => {
                Toast('修改成功')
                this.isEditing = false
            })
        },
        confirmChosenStatus(status) {
            this.courier_status = {'正常接单': 0, '暂停接单': 1}[status]
            this.isChoosingStatusInEditing = false
        }
    },
    components: { BlurSearch }
}
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.main {
    color: rgba(88,74,72,1);
    background-image: url("@/assets/bg1.png");
    overflow-y: scroll;
}
.filter-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: rgba(255,255,255,0.70);
    border-radius: 5px;
    padding-right: 29px;

    .status-filter {
        display: flex;
        align-items: center;
        margin-left: 34px;
        font-size: 16px;

        .label {
            position: relative;
            margin-left: 5px;
            top: 5px;
            box-sizing: border-box;
            width: 7px;
            height: 7px;
            border: 7px solid rgba(88,74,72,0);
            border-top-color: rgba(88,74,72,1);
        }
        &.active {
            color: rgba(239,124,38,1);
            .label {
                top: -1px;
                border: 7px solid rgba(88,74,72,0);
                border-bottom-color: rgba(239,124,38,1);
            }
        }   
    }
}

.status-pop {
    height: 210px;
    .title {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
        margin-left: 25px;
        font-size: 18px;
        color: rgba(239,124,38,1);
        &::after {
            content: '';
            position: relative;
            width: 7px;
            height: 7px;
            margin-left: 5px;
            top: -1px;
            border: 7px solid rgba(88,74,72,0);
            border-bottom-color: rgba(239,124,38,1);
            box-sizing: border-box;
        }
    }

    .items{
        height: 109px;
        overflow-y: scroll;
        .item {
            display: flex;
            align-items: center;
            margin-left: 25px;
            margin-bottom: 3px;
            height: 30px;
            line-height: 30px;
            .label {
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 1px solid rgba(239,124,38,1);
                border-radius: 50%;
            }
            .name {
                margin-left: 5px;
                font-size: 18px;
            }
        }

        .item.active {
            .label {
                display: flex;
                justify-content: center;
                align-items: center;
                &::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    background-color: rgba(239,124,38,1);
                    border-radius: 50%;
                }
            }
            .name {
                color: rgba(239,124,38,1);
            }
        }
    }

    .confirm {
        height: 51px;
        line-height: 51px;
        text-align: center;
        color: rgba(88,74,72,1);
        font-size: 20px;
        font-weight: bold;
        background-color: rgba(254,208,175,1);
    }
}

.list {
    margin-top: 15px;
    .courierInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        width: 410px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 15px;
        background-color: rgba(255,255,255,0.8);
        border-radius: 5px 5px 0px 0px;

        margin-bottom: 20px;
        .up {
            display: flex;
            justify-content: space-between;
            margin: 0 15px;
            margin-top: 13px;
            padding-bottom: 10px;

            border-bottom: 1px solid rgba(125,124,123,1);
            overflow-y: scroll;
            overflow: hidden;

            .modify {
                position: absolute;
                right: 25px;
                top: 15px;
                width: 20px;
                height: 20px;
            }
            .left {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 15px;
                margin-right: 15px;

                .up-img {
                    width: 60px;
                    height: 60px;
                }
                .status {
                    font-size: 10px;
                    height: 15px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    margin-top: 8px;
                    &.s0 {
                        color: rgba(49,218,34,1);
                        border-color: rgba(49,218,34,1);
                    }
                    &.s1 {
                        color: rgba(218,34,34,1);
                        border-color: rgba(218,34,34,1);
                    }
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                .name {
                    margin-bottom: 5px;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(88,74,72,1);
                }
                .item {
                    height: 30px;
                    line-height: 30px;
                    font-size: 15px;
                    color: rgba(125,124,123,1);
                }
            }
        }
        .middle {
            width: 100%;
            display: flex;
            margin-top: 10px;
            .item {
                font-size: 16px;
                color: rgba(125,124,123,1);
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                width: 50%;
            }
        }
        .down {
            width: 100%;
            display: flex;
            margin-top: 10px;
            padding: 10px 0;
            background-color: rgba(254,208,175,1);
            border-radius: 5px 5px 0px 0px;

            .item {
                font-size: 16px;
                color: rgba(88,74,72,1);
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                width: 33%;
            }
        }
    }
}

.edit-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    height: 420px;

    * {
        box-sizing: border-box;
    }

    margin: 0 auto;
    color: rgba(88,74,72,1);
    .title {
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        width: 300px;
        margin: 10px 0;
        border-bottom: 1px solid rgba(125,124,123,0.5);
        font-size: 20px;
        .item-title {
            margin-right: 40px;
        }

        .input {
            width: 160px;
            text-align: right;
        }
        .courier-status {
            display: flex;
            align-items: center;
            .value {
                margin-right: 5px;
            }
        }
    }
    .buttons {
        display: flex;
        align-items: center;
        width: 300px;
        margin-top: 45px;
        margin-bottom: 47px;
        justify-content: space-between;
        font-weight: bold;
        font-size: 18px;
        .store {
            width: 110px;
            height: 44px;
            background: #fed0af;
            line-height: 44px;
            text-align: center;
            border-radius: 5px;
        }
        .cancel {
            width: 110px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            border: 1px solid #fed0af;
            border-radius: 5px;
        }
    }
}
</style>