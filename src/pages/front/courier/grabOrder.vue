<!-- 抢单列表页 -->
<template>
    <div class="main">
        <div class="condition">
            <div v-for="item in conditions" :key="item.id" :class="['item', item.id === idOfActivated ? 'isActivated' : '']" @click="conditionClickHandler(item)">
                <div class="item-name">{{item.name}}</div>
                <!-- 小三角 -->
                <div class="label"></div>
            </div>
        </div>
        <!-- 某个条件激活时展开, 即idOfActivated !== -1 -->
        <div v-if="idOfActivated !== -1" class="condition-detail">
            <div class="choices">
                <div @click="choicesClickHandler(item)" :class="['choice', conditions[idOfActivated].idOfChosen === item.id ? 'isActivated' : '']" v-for="item in conditions[idOfActivated].choices" :key="item.id">
                    <div class="label"></div>
                    <div class="name">{{item.name}}</div>
                </div>
            </div>
            <div class="complete" @click="complete">
                完成
            </div>
        </div>

        <!-- 订单 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list class="orders" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrders">
                <OrderInGrabList v-for="item in orders" :key="item.id" :order-info="item"></OrderInGrabList>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import OrderInGrabList from '@/components/order/orderInGrabList.vue'
import { showOrdersToTake } from '@/http/api/courier';
import format from '@/utils/format';
import { getAllSite } from '@/http/api/common'

    export default {
    name: "grabOrder",
    data() {
        return {
            conditions: [
                {
                    // 这里id才起标识作用
                    // 而名字会在complete中改变
                    id: 0,
                    name: "金额",
                    // 子选项应该在conditionsCilckHandler中获取
                    // 这里先用假数据
                    idOfChosen: 0,
                    choices: [
                        {
                            id: 0,
                            name: "金额不限",
                            value: 0
                        },
                        {
                            id: 1,
                            name: "金额降序",
                            value: 1
                        },
                        {
                            id: 2,
                            name: '金额升序',
                            value: 2
                        }
                    ]
                },
                {
                    id: 1,
                    name: "快递点",
                    idOfChosen: 0,
                    choices: [
                        {
                            id: 0,
                            name: "快递点不限",
                            value: null
                        }
                    ]
                },
                {
                    id: 2,
                    name: "送达时间",
                    idOfChosen: 0,
                    choices: [
                        {
                            id: 0,
                            name: "时间不限",
                            value: null
                        }
                    ]
                }
            ],
            
            // 当由折叠变展开时, old_conditions复制conditions
            // 若用户不确认, 直接折叠, 将old_conditions赋给conditions, 使conditions与展开前一样
            old_conditions: {},
            // idOfActivated: -1,
            idOfActivated: -1,
            
            // 第一次请求是请求第一页
            // 每页10条数据
            pageNum: 1,

            loading: false,
            finished: false,

            refreshing: false,

            // 假数据, 等后端部署之后清空orders
            orders: []
        };
    },
    mounted() {

    },
    methods: {
        async onRefresh() {
            this.orders.length = 2
            this.pageNum = 1
            this.orders = []
            this.getOrders()
            this.refreshing = false
        },
        async getOrders() {
            let before_time = this.conditions[2].choices[this.conditions[2].idOfChosen].value
            let ordered_by_reward_desc = this.conditions[0].choices[this.conditions[0].idOfChosen].value
            let pickup_address = this.conditions[1].choices[this.conditions[1].idOfChosen].value
            let serial_number = this.pageNum
            // console.log(this.conditions[1].choices[this.conditions[1].idOfChosen])
            let params = {
                    before_time,
                    ordered_by_reward_desc,
                    pickup_address,
                    serial_number,
                }

            showOrdersToTake(params).then(orders_new => {
                // console.log(orders_new)
                this.orders = this.orders.concat(orders_new)

                let length = orders_new.length
                if(length < 10) this.finished = true
                else this.pageNum++
            })

            this.loading = false
        },
        async conditionClickHandler(item) {
            if (item.id === this.idOfActivated) {
                // 点中的是已展开的, 则将选项复原至展开前
                this.conditions[0].idOfChosen = this.old_conditions.idOfChosen0
                this.conditions[1].idOfChosen = this.old_conditions.idOfChosen1
                this.conditions[2].idOfChosen = this.old_conditions.idOfChosen2
                this.old_conditions = {}

                // 折叠
                this.idOfActivated = -1;
            }
            else {
                // 点中的是未展开的

                // 存旧选择
                if(JSON.stringify(this.old_conditions) === '{}') {
                    this.old_conditions = {
                        idOfChosen0: this.conditions[0].idOfChosen,
                        idOfChosen1: this.conditions[1].idOfChosen,
                        idOfChosen2: this.conditions[2].idOfChosen,
                    }
                }

                // 1 这里应该获取子选项
                if(item.id === 1) {
                    // 获取快递点子选项
                    let choices = [
                        {
                            id: 0,
                            name: "快递点不限",
                            value: null
                        },
                    ]
                    let siteArray = await getAllSite()
                    console.log(siteArray)
                    let length = siteArray.length
                    if(length !== undefined) {
                        for(let i = 1; i <= length; ++i) {
                            choices.push({
                                id: i,
                                name: siteArray[i-1].pickup_address,
                                value: siteArray[i-1].pickup_address
                            })
                        }
                    }
                    this.conditions[1].choices = choices
                }

                if(item.id === 2) {
                    // 获取时间的子选项
                    // 第0个为不限, 其余24个为往后的24个整点
                    let dateOfNow = new Date()
                    let hourOfNow = dateOfNow.getHours()
                    let choices = [
                        {
                            id: 0,
                            name: '时间不限',
                            value: null
                        }
                    ]
                    for(let i = 1; i <= 24; ++i) {
                        let hour = (hourOfNow + i) % 24;

                        let data = new Date()
                        data.setMilliseconds(0)
                        data.setMinutes(0)
                        data.setHours(data.getHours() + i)

                        choices.push({
                            id: i,
                            name: `${hour <= hourOfNow ? '次日 ' : ''}${hour < 10 ? '0' + hour : hour}:00之前`,
                            value: format(data)
                        })
                    }
                    this.conditions[2].choices = choices
                }

                // 2 展开
                this.idOfActivated = item.id;
            }

        },
        choicesClickHandler(item) {
            this.conditions[this.idOfActivated].idOfChosen = item.id;
        },
        complete() {
            // 更换condition名字, 并收起
            this.conditions.forEach(c => {
                c.name = c.choices[c.idOfChosen].name;
            });
            this.idOfActivated = -1;
            this.old_conditions = {}


            this.onRefresh()
        }
    },
    components: { OrderInGrabList }
}
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.main {
    background: url("@/assets/background/front.png");
    background-color: #EFEFEF;

    .condition {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        background-color: rgba(255,255,255,0.5);
        width: 100%;
        height: 42px;
        
        border-radius: 5px;
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 33%;
            padding: 0 18px;
            text-align: center;
            color: rgba(88,74,72,1);
            font-size: 16px;
            overflow: hidden;

            &:hover {
                cursor: pointer;
            }

            // 三角
            .label {
                position: relative;
                top: 3px;
                right: 5px;
                box-sizing: border-box;
                width: 6px;
                height: 6px;
                border: rgba(154, 154, 154, 0) solid 6px;
                border-top: rgba(154, 154, 154, 1) solid 6px;
            }

            // 条件被选中
            &.isActivated {
                color: rgba(239,124,38,1);
                // 三角向上
                .label {
                    top: -2px;
                    border: rgba(239,124,38,0) solid 6px;
                    border-bottom: rgba(239,124,38,1) solid 6px;
                }
            }
        }
    }


    .condition-detail {
        z-index: 999;
        position: fixed;
        top: 42px;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 208px;

        .choices {
            // background-image: url("@/assets/background/front.png");
            // background-position: 800px;
            background-color: #FDEEE3;
            height: 208 - 51px;
            overflow-y: scroll;

            .choice {
                display: flex;
                align-items: center;
                height: 45px;
                line-height: 45px;
                margin-left: 28px;
                margin-top: 3px;
                color: rgba(88,74,72,1);
                font-size: 18px;
                .label {
                    width: 14px;
                    height: 14px;
                    border: rgba(239,124,38,1) solid 1px;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 7px;
                }

                &.isActivated {
                    color: rgba(239,124,38,1);

                    .label {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: rgba(234, 12, 12, 73) solid 1px;
                        border-radius: 50%;
                        &::before {
                            width: 7px;
                            height: 7px;
                            content: "";
                            border-radius: 50%;
                            background-color: rgba(239,124,38,1);
                        }
                    }
                }
            }
        }
        .complete {
            height: 51px;
            color: rgba(88,74,72,1);
            font-weight: bold;

            line-height: 45px;
            
            
            font-size: 20px;
            text-align: center;
            background-color: rgba(254,208,175,1);
        }
    }

    .orders {
        margin-top: 56px;
        min-height: 800px;
    }
}
</style>