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
        <div v-for="(item, i) in orders" :key="item.id" :class="['order', i === 0 ? 'first' : '']">
            <div class="up">
                <div class="item">
                    <div class="item-name">收获地址: </div>
                    <div class="item-value">{{item.receiveAddress}}</div>
                    <div class="price">￥{{item.price}}</div>
                </div>
                <div class="item">
                    <div class="item-name">快递点: </div>
                    <div class="item-value">{{item.expressSite}}</div>
                </div>
            </div>
            <div class="down">
                <div class="item">
                    <div class="item-name">快递件数:</div>
                    <div class="item-value">{{item.numOfExpress}}</div>
                </div>
                <div class="item">
                    <div class="item-name">送达时间:</div>
                    <div class="item-value">{{item.timeOfArrive}}</div>
                </div>
                <div class="item">
                    <div class="item-name">快递备注:</div>
                    <div class="item-value">{{item.remarks}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'

    export default {
        name: 'grabOrder',
        data() {
            return {
                conditions: [
                    {
                        // 这里id才起标识作用
                        // 而名字会在complete中改变
                        id: 0,
                        name: '金额高低',
                        // 子选项应该在conditionsCilckHandler中获取
                        // 这里先用假数据
                        idOfChosen: 0,
                        choices: [
                            {
                                id: 0,
                                name: '金额高低',
                            },
                            {
                                id: 1,
                                name: '时间先后',
                            }
                        ]
                    },
                    {
                        id: 1,
                        name: '快递点',
                        idOfChosen: 0,
                        choices: [
                            {
                                id: 0,
                                name: '不限',
                            },
                            {
                                id: 1,
                                name: '深大一区',
                            },
                            {
                                id: 2,
                                name: '深大二区',
                            },
                            {
                                id: 3,
                                name: '深大三区',
                            },
                            {
                                id: 4,
                                name: '深大四区',
                            },
                            {
                                id: 5,
                                name: '深大五区',
                            },
                            {
                                id: 6,
                                name: '深大六区',
                            },
                        ]

                    },
                    {
                        id: 2,
                        name: '送达时间',
                        idOfChosen: 0,
                        choices: [
                            {
                                id: 0,
                                name: "不限"
                            },
                            {
                                id: 1,
                                name: "17:00之前"
                            },
                            {
                                id: 2,
                                name: "18:00之前"
                            },
                            {
                                id: 3,
                                name: "19:00之前"
                            },
                        ]
                    }
                ],
                idOfActivated: -1,
                orders: [
                    {
                        id: 0,
                        receiveAddress: '西南一区乔羽阁',
                        expressSite: '深大一区',
                        price: '5.00',
                        numOfExpress: 1,
                        timeOfArrive: '2022-08-07 15:00 ~ 18:00',
                        remarks: '这是快递备注1'
                    },
                    {
                        id: 1,
                        receiveAddress: '西南二区乔羽阁',
                        expressSite: '深大二区',
                        price: '5.50',
                        numOfExpress: 2,
                        timeOfArrive: '2022-08-08 15:00 ~ 18:00',
                        remarks: '这是快递备注2'
                    },
                    {
                        id: 2,
                        receiveAddress: '西南四区乔羽阁',
                        expressSite: '深大三区',
                        price: '5.50',
                        numOfExpress: 2,
                        timeOfArrive: '2022-08-08 15:00 ~ 18:00',
                        remarks: '这是快递备注2'
                    },
                    {
                        id: 3,
                        receiveAddress: '西南四区乔羽阁',
                        expressSite: '深大四区',
                        price: '5.50',
                        numOfExpress: 2,
                        timeOfArrive: '2022-08-08 15:00 ~ 18:00',
                        remarks: '这是快递备注2'
                    },
                ]
            }
        },
        methods: {
            conditionClickHandler(item) {
                if(item.id === this.idOfActivated) {
                    // 点中的是已展开的, 则收起
                    this.idOfActivated = -1
                } else {
                    // 点中的是未展开的
                    this.idOfActivated = item.id
                }

                // 这里应该获取子选项
            },
            choicesClickHandler(item) {
                this.conditions[this.idOfActivated].idOfChosen = item.id
            },
            complete() {
                // 更换condition名字, 并收起
                this.conditions.forEach(c => {
                    c.name = c.choices[c.idOfChosen].name
                })
                this.idOfActivated = -1

                // 根据选中的条件发起请求
                Toast(
                    "按condition请求订单数组\n" +
                    this.conditions[0].name + '\n' +
                    this.conditions[1].name + '\n' +
                    this.conditions[2].name + '\n' 
                )
            }
        }
    }
</script>

<style lang="less" scoped>
.main {
    background-color: #EFEFEF;
    font-family: PingFangSC-regular;

    .condition {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        width: 100%;
        height: 42px;
        
        border-bottom: #ddd solid 1px;
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 33%;
            padding: 0 20px;
            text-align: center;
            color: rgba(16, 16, 16, 100);
            font-size: 14px;

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
                border: #FFFFFF solid 6px;
                border-top: rgba(154, 154, 154, 64) solid 6px;
            }

            // 条件被选中
            &.isActivated {
                color: rgba(234, 12, 12, 73);
                // 三角向上
                .label {
                    top: -2px;
                    border: #FFFFFF solid 6px;
                    border-bottom: rgba(234, 12, 12, 73) solid 6px;
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
            height: 208 - 45px;
            background-color: #FFF;
            overflow-y: scroll;

            .choice {
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                margin-left: 28px;
                font-family: SourceHanSansSC-regular;
                color: rgba(93, 93, 93, 100);
                font-size: 14px;
                .label {
                    width: 14px;
                    height: 14px;
                    border: rgba(217, 217, 217, 100) solid 2px;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 5px;
                }

                &:hover {
                    cursor: pointer;;
                }

                &.isActivated {
                    color: rgba(234, 12, 12, 73);

                    .label {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: rgba(234, 12, 12, 73) solid 2px;
                        border-radius: 50%;
                        overflow: visible;
                        &::before {
                            width: 10px;
                            height: 10px;
                            color: #000;
                            content: "";
                            border-radius: 50%;
                            background-color: rgba(234, 12, 12, 73);
                        }
                    }
                }
            }
        }
        .complete {
            height: 45px;
            color: rgba(255, 255, 255, 100);

            line-height: 45px;
            
            
            font-size: 14px;
            text-align: center;
            font-family: Arial;
            background-color: rgba(234, 12, 12, 73);
        }
    }

    .order {
        display: flex;
        flex-direction: column;
        width: 362px;
        height: 187px;
        margin: 0 auto;
        margin-top: 14px;
        padding: 1px;
        background-color: #FFF;
        border-radius: 10px 10px 0 0;
        // 不知道为什么
        // &:first-of-type {}不生效
        // 只好用一个first类
        &.first {
            margin-top: 56px;
        }

        .up {
            position: relative;
            height: 70px;
            border-bottom: 1px solid #bbb;
            .price {
                position: absolute;
                right: 10px;
                top: 20px;
                width: 56px;
                height: 35px;
                font-size: 18px;
                color: rgba(234, 12, 12, 93);
            }

            .item-name {
                width: 54px;
                margin-right: 5px;
                font-size: 12px;
                color: rgba(102, 102, 102, 78);
            }
            .item-value {
                font-size: 14px;
                color:  #000;
            }
        }

        .item {
            display: flex;
            align-items: flex-end;
            margin-top: 10px;
            margin-left: 13px;
        }

        .down {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
                font-size: 14px;
            .item {
                margin-top: 0;
                .item-name {
                    width: 60px;
                    margin-right: 5px;
                    color: rgba(16, 16, 16, 100);
                }
                .item-value {
                        color:  rgba(16, 16, 16, 100);
                }
                &:last-of-type {
                    margin-bottom: 10px;
                }
            }
        }
    }

}
</style>