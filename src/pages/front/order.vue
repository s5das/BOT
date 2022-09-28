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
        {{item.name}}
      </div>
    </div>


    <div class="tools-box">
      <!-- 选择时间 -->
      <div @click="chooseTime" :class="['choose-time', isChoosingTime ? 'isActivated' : '']">
        订单时间
      </div>
      <!-- 关键词搜索 -->
      <BlurSearch class="search-area" @confirmKey="confirmKey" @clearKey="clearKey"></BlurSearch>
    </div>

    <!-- 弹出层 - 日历 -->
    <van-calendar type="range" v-model="isChoosingTime"  @confirm="chooseTimeConfirm"/>
  

    <!-- 订单 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list class="orders" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderList">
          <div class="orders" v-if="modes[idOfModeActivated].name === '我的接单'">
            <OrderOfMyGrap v-for="item in ordersOfMyGrab" :key="item.id" :order-info="item"></OrderOfMyGrap>
          </div>
          <div class="orders" v-else>
            <OrderOfMyRelease @cancelSucceed="onRefresh" v-for="item in ordersOfMyRelease" :key="item.id" :order-info="item"></OrderOfMyRelease>
          </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import '../../../node_modules/vant/lib/icon/local.css'
import OrderOfMyGrap from '@/components/order/orderOfMyGrab.vue'
import OrderOfMyRelease from '@/components/order/orderOfMyRelease.vue';
import format from '@/utils/format';
import { getOrderList as getOrdersOfUser } from '@/http/api/user';
import { getTakenOrderList as getOrdersOfCourier } from '@/http/api/courier';
import { ORDER } from '@/http/const/const';
import PubSub from 'pubsub-js';
import BlurSearch from '@/components/common/blurSearch.vue';
export default {
  name: "order-page",
  props: ['condition'],
  data() {
    return {
      // tabbar id
      id: 1,
      
      modes: [
        {
          name: "我发布的",
          idOfConditionActivated: 0,
          // conditions: ["全部", "待接单", "派送中", "已送达", "已完成", "已取消"]，
          conditions: [
            {
              name: "全部",
              value: -1
            },
            {
              name: "待接单",
              value: 0
            },
            {
              name: "派送中",
              value: 1
            },
            {
              name: '已送达',
              value: 2
            },
            {
              name: '已完成',
              value: 3
            },
            {
              name: '已取消',
              value: 4
            }
          ]
        },
        {
          name: "我的接单",
          idOfConditionActivated: 0,
          // conditions: ["全部", "派送中", "已送达", "已完成", "已取消"]
          conditions: [
            {
              name: "全部",
              value: -1
            },
            {
              name: "派送中",
              value: 1
            },
            {
              name: '已送达',
              value: 2
            },
            {
              name: '已完成',
              value: 3
            },
            {
              name: '已取消',
              value: 4
            }
          ]
        }
      ],
      idOfModeActivated: 0,
      isChoosingTime: false,
      time: [],
      isInputingKey: false,
      blur_search_context: '',
      ordersOfMyGrab: [],
      ordersOfMyRelease: [],
      refreshing: false,
      loading: false,
      finished: false,
      pageNum: 1,
    };
  },
  mounted() {
    PubSub.publish('changetabbar',this.id)
    // console.log(this.$route.params)
    if (this.$route.params.mode === 'courier') {
      this.idOfModeActivated = 1
    }
    if(this.condition !== undefined) {
      this.changeCondition(this.condition);
    }

  },
  methods: {
    changeMode(i) {
      this.idOfModeActivated = i;
      this.phoneNum = ''
      this.name = ''
      this.time = []
      this.onRefresh();
    },
    changeCondition(i) {
      this.modes[this.idOfModeActivated].idOfConditionActivated = i;
      this.onRefresh()
    },
    getOrderList() {
      // 根据 mode 和 condition 请求orderList
      // 如果time !== '', 还要根据time
      
      let bottom_create_date = this.time[0] !== undefined ? this.time[0] : null
      let top_create_date = this.time[1] !== undefined ? this.time[1] : null
      let order_status = this.modes[this.idOfModeActivated].conditions[this.modes[this.idOfModeActivated].idOfConditionActivated].value
      if (this.idOfModeActivated === 0) {
        // 我的发布
        getOrdersOfUser({
          bottom_create_date,
          top_create_date,
          blur_search_context: this.blur_search_context,
          order_status,
          serial_number: this.pageNum
        }).then(orders_new => {
          let length = orders_new.length
          if (length < 10) this.finished = true
          else this.pageNum++

          orders_new.forEach(order => {
            this.ordersOfMyRelease.push({
              id: order[ORDER.order_id],
              expressSite: order[ORDER.pickup_address],
              price: order[ORDER.reward],
              numOfExpress: order[ORDER.num_of_packages],
              timeOfCreated: order[ORDER.create_time_string],
              timeOfArrive: order[ORDER.deliver_time_period_string],
              remarks: order[ORDER.remarks],
              status: order[ORDER.order_status],
            })
            this.loading = false
          }, () => {
            this.loading = false
          })
        })
      } else if (this.idOfModeActivated === 1) {
        // 我的抢单
        getOrdersOfCourier({
          bottom_create_date,
          top_create_date,
          blur_search_context: this.blur_search_context,
          order_status,
          serial_number: this.pageNum
        }).then(orders_new => {
          // console.log(orders_new)

          let length = orders_new.length
          if (length < 10) this.finished = true
          else this.pageNum++

          orders_new.forEach(order => {
            this.ordersOfMyGrab.push({
              id: order[ORDER.order_id],
              receiveAddress: order[ORDER.recipient_address],
              expressSite: order[ORDER.pickup_address],
              price: order[ORDER.reward],
              numOfExpress: order[ORDER.num_of_packages],
              timeOfArrive: order[ORDER.deliver_time_period_string],
              remarks: order[ORDER.remarks],
              status: order[ORDER.order_status],
              receiver: order[ORDER.recipient_name],
              teleNum: order[ORDER.recipient_phone_number]
            })
          })

          this.loading = false
        }, () => {
          this.loading = false
        })
      }
      return Promise.resolve()
    },
    chooseTime() {
      this.isChoosingTime = true;
    },
    chooseTimeConfirm(dates) {
      // console.log(data)
      this.time = dates.map(date => {
        date.setMinutes(0)
        date.setMilliseconds(0)
        date.setHours(0)
        return format(date).slice(0, 10)
      });
      this.isChoosingTime = false;
      this.onRefresh()
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

    onRefresh() {
      // console.log(1)
      this.pageNum = 1
      this.ordersOfMyGrab = []
      this.ordersOfMyRelease = []
      this.loading = true
      this.finished = false

      this.getOrderList().then(() => {
        this.refreshing = false
      })
    },
  },
  components: { OrderOfMyGrap, OrderOfMyRelease, BlurSearch }
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

  .search-area {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 220px;
    margin-left: 5px;

    .search-prompt {
      display: flex;
      align-items: center;
      .text {
        max-width: 200px;
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .clear {
        height: 100%;
        margin-left: 5px;
      }
    }
  }
}

.orders {
  transform: translateY(-10px);
  margin-bottom: 50px;
}

.search-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #E2E3E2;
  .item {
    width: 90%;
    height: 30px;
    margin: 10px 0;
    padding-left: 5px;
    border-radius: 20px;
    background-color: #FEFFFF;
  }

  .search {
    width: 50px;
    text-align: center;
    margin: 10px 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
}
</style>