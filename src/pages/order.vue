<!-- 订单列表页 -->
<template>
  <div class="main">
    <div class="modes-box">
      <div @click="changeMode(i)" v-for="(item, i) in modes" :key="i" :class="['mode', i === idOfModeActivated ? 'isActivated' : '']">
        {{item.name}}
      </div>
    </div>
    <div class="conditions-box">
      <div @click="changeCondition(i)" v-for="(item, i) in modes[idOfModeActivated].conditions" :key="i" :class="['condition', i == modes[idOfModeActivated].idOfConditionActivated ? 'isActivated' : '']">
        {{item}}
      </div>
    </div>


    <div class="tools-box">
      <!-- 选择时间 -->
      <div @click="chooseTime" :class="['choose-time', isChoosingTime ? 'isActivated' : '']">
        订单时间
      </div>
      <!-- 关键词搜索 -->
      <van-icon name="search" size="20px"/>
    </div>

    <!-- 弹出层 - 日历 -->
    <van-calendar type="range" v-model="isChoosingTime"  @confirm="chooseTimeConfirm"/>
  
    <div class="orders" v-if="modes[idOfModeActivated].name === '我的接单'">
      <OrderOfMyGrap v-for="item in ordersOfMyGrab" :key="item.id" :order-info="item"></OrderOfMyGrap>
    </div>
    <div class="orders" v-else>
      <OrderOfMyRelease v-for="item in ordersOfMyRelease" :key="item.id" :order-info="item"></OrderOfMyRelease>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant'
import '../../node_modules/vant/lib/icon/local.css'
import OrderOfMyGrap from '@/components/order/orderOfMyGrab.vue'
import OrderOfMyRelease from '@/components/order/orderOfMyRelease.vue';


export default {
    name: "order-page",
    props:['condition'],
    data() {
        return {
            modes: [
                {
                    name: "我发布的",
                    idOfConditionActivated: 0,
                    conditions: ["全部", "待接单", "派送中", "已送达", "已完成", "已取消"]
                },
                {
                    name: "我的接单",
                    idOfConditionActivated: 0,
                    conditions: ["全部", "派送中", "已送达", "已完成"]
                }
            ],
            idOfModeActivated: 0,
            isChoosingTime: false,
            time: "",
            ordersOfMyGrab: [
                {
                    id: 0,
                    receiveAddress: "西南一区乔羽阁",
                    expressSite: "深大一区",
                    price: "5.00",
                    numOfExpress: 1,
                    timeOfArrive: "2022-08-07 15:00 ~ 18:00",
                    remarks: "这是快递备注1",
                    status: '派送中',
                    receiver: '朱猪猪',
                    teleNum: '18612345678'
                  },
                {
                    id: 1,
                    receiveAddress: "西南二区乔羽阁",
                    expressSite: "深大二区",
                    price: "5.50",
                    numOfExpress: 2,
                    timeOfArrive: "2022-08-08 15:00 ~ 18:00",
                    remarks: "这是快递备注2",
                    status: '已送达',
                    receiver: '朱猪猪',
                    teleNum: '18612345678'
                },
                {
                    id: 2,
                    receiveAddress: "西南四区乔羽阁",
                    expressSite: "深大三区",
                    price: "5.50",
                    numOfExpress: 2,
                    timeOfArrive: "2022-08-08 15:00 ~ 18:00",
                    remarks: "这是快递备注2",
                    status: '已完成',
                    receiver: '朱猪猪',
                    teleNum: '18612345678'
                },
            ],
            ordersOfMyRelease: [
                {
                    id: 0,
                    expressSite: "深大一区",
                    price: "5.00",
                    numOfExpress: 1,
                    timeOfCreated: "2022-08-07 14:00:00",
                    timeOfArrive: "2022-08-08 15:00 ~ 18:00",
                    remarks: "这是快递备注1",
                    status: '待接单',
                  },
                  {
                    id: 1,
                    expressSite: "深大一区",
                    price: "5.00",
                    numOfExpress: 1,
                    timeOfCreated: "2022-08-07 14:00:00",
                    timeOfArrive: "2022-08-08 15:00 ~ 18:00",
                    remarks: "这是快递备注1",
                    status: '派送中',
                    courier: '张三',
                  },
                  {
                    id: 2,
                    expressSite: "深大一区",
                    price: "5.00",
                    numOfExpress: 1,
                    timeOfCreated: "2022-08-07 14:00:00",
                    timeOfArrive: "2022-08-08 15:00 ~ 18:00",
                    remarks: "这是快递备注1",
                    status: '已送达',
                  },
            ]
        };
  },
  mounted() {
    this.changeCondition(this.condition || 0);
    
  }
    ,
    methods: {
        changeMode(i) {
            this.idOfModeActivated = i;
            this.getOrderList();
        },
        changeCondition(i) {
            this.modes[this.idOfModeActivated].idOfConditionActivated = i;
            this.getOrderList();
        },
        getOrderList() {
            // 根据 mode 和 condition 请求orderList
            // 如果time !== '', 还要根据time
            Toast(this.modes[this.idOfModeActivated].name + "\n" +
                this.modes[this.idOfModeActivated].conditions[this.modes[this.idOfModeActivated].idOfConditionActivated] + "\n" +
                this.time);
        },
        chooseTime() {
            this.isChoosingTime = true;
        },
        chooseTimeConfirm(data) {
            // console.log(data)
            this.time = data;
            this.isChoosingTime = false;
            this.getOrderList();
        }
  },

    components: { OrderOfMyGrap, OrderOfMyRelease }
}
</script>

<style lang="less" scoped>
.main {
  background-color: #EFEFEF;
  font-family: PingFangSC-regular;
  font-size: 14px;
}
.modes-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  border-bottom: 2px solid #BBB;
  background-color: #FFF;
  .mode {
    height: 44px;
    line-height: 44px;
    color: rgba(102, 102, 102, 78);
  }

  .mode.isActivated {
    position: relative;
    font-weight: 600;
    color: rgba(16, 16, 16, 100);
    border-bottom: 2px solid rgba(234, 12, 12, 93);
  }
}

.conditions-box {
  display: flex;

  width: 100%;
  height: 44px;
  // overflow-x: scroll;
  background-color: #FFF;

  .condition {
    flex: 1;
    height: 44px;
    line-height: 44px;
    width: 64px;
    text-align: center;
    color: rgba(102, 102, 102, 100);
  }

  .condition.isActivated {
    font-family: PingFangSC-bold;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
  }
}

.tools-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 37px;
  margin: 6px 30px 0 18px;

  .choose-time {
    font-size: 14px;
    color: rgba(16, 16, 16, 100);
    position: relative;
    &::after {
      position: absolute;
      right: -14px;
      top: 8px;
      box-sizing: border-box;
      width: 5px;
      height: 5px;
      border: 5px solid #EFEFEF;
      border-top: 5px solid rgba(154, 154, 154, 64);
      content: '';
    }

    &.isActivated::after {
      top: 4px;
      border: 5px solid #EFEFEF;;
      border-bottom: 5px solid rgba(154, 154, 154, 64);
    }
  }
}

.orders {
  transform: translateY(-10px);
  margin-bottom: 50px;
}
</style>