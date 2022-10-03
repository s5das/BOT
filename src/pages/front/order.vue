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


    <!-- 弹出层 - 日历 -->
    <van-calendar type="range" v-model="isChoosingTime"  @confirm="chooseTimeConfirm"/>
  

    <!-- 订单 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list class="orders" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getOrderList">
          <div class="tools-box">
          <!-- 选择时间 -->
          <div @click="chooseTime" :class="['choose-time', isChoosingTime ? 'isActivated' : '']">
            订单时间
          </div>
          <!-- 关键词搜索 -->
           <BlurSearch class="search-area" @confirmKey="confirmKey" @clearKey="clearKey"></BlurSearch>
          </div>
          <div class="order" v-for="order in orderList" :key="order.order_id">
                <div class="status-label">
                    <img :src="require(`@/assets/orderStatus/${order.order_status}.png`)"/>
                </div>
                <div class="up">{{order.create_time_string}}</div>
                <div class="middle">
                    <div class="item">
                        <div class="item-name">快递点:</div>
                        <div class="item-value">{{order.pickup_address}}</div>
                    </div>
                    <div class="item">
                        <div class="item-name">快递件数:</div>
                        <div class="item-value">{{order.num_of_packages}}</div>
                    </div>
                    <div class="item">
                        <div class="item-name">送达时间</div>
                        <div class="item-value">{{order.deliver_time_period_string}}</div>
                    </div>
                    <div class="item">
                        <div class="item-name">快递备注:</div>
                        <div class="item-value">{{order.remarks}}</div>
                    </div>
                    <div class="item highlight">
                        <div class="item-name">付款金额:</div>
                        <div class="item-value">¥{{order.reward}}</div>
                    </div>
                </div>
                <div class="down">
                    <div @click="cancelOrder(order)" class="button" v-if="order.order_status in {'待接单': 0, '派送中': 1} && modes[idOfModeActivated].name === '我发布的'">取消订单</div>
                    <!-- <div @click="changeCourier(order)" class="button" v-if="order.order_status in {'待接单': 0, '派送中': 1}">{{order.order_status === '待接单' ? '选派送员' : '换派送员' }}</div> -->
                    <div @click="checkDetail(order)" class="button">查看详情</div>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import '../../../node_modules/vant/lib/icon/local.css'
import format from '@/utils/format';
import { getOrderList as getOrdersOfUser } from '@/http/api/user';
import { getTakenOrderList as getOrdersOfCourier } from '@/http/api/courier';
import BlurSearch from '@/components/common/blurSearch.vue';
import { cancelOrder } from '@/http/api/user';
import { Toast } from 'vant';
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
      orderList: [],
      refreshing: false,
      loading: false,
      finished: false,
      pageNum: 1,
    };
  },
  mounted() {
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

          this.orderList = this.orderList.concat(orders_new)
          this.loading = false
        }, () => {
            this.finished = true
            this.loading = false
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

          this.orderList = this.orderList.concat(orders_new)

          this.loading = false
        }, () => {
          this.finished = true
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
      this.orderList = []
      this.loading = true
      this.finished = false

      this.getOrderList().then(() => {
        this.refreshing = false
      })
    },
    cancelOrder(order) {
      console.log(order)
      cancelOrder({
        orderId: order.order_id
      }).then(() => {
        this.onRefresh()
        Toast('成功取消订单')
      })
    },
    checkDetail(order) {
      this.$router.push({
          name: "orderDetail",
          params: {
              id: order.order_id
          }
      });
    }
  },
  components: { BlurSearch },
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.main {
  background: url("@/assets/background/front.png");
  background-color: #EFEFEF;
  font-family: PingFangSC-regular;
  font-size: 14px;
}
.modes-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 410px;
  height: 44px;
  margin: 0 auto;
  background-color: rgba(255,255,255,0.5);
  border-radius: 5px;
  .mode {
    font-size: 18px;
    height: 52px;
    line-height: 52px;
    color: #584A48;
  }

  .mode.isActivated {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // font-weight: bold;
    color: rgba(16, 16, 16, 100);

    &::after {
      position: absolute;
      bottom: 0px;
      content: '';
      background-color: rgba(240,129,42,1);
      width: 83px;
      height: 3px;
    }
  }
}

.conditions-box {
  display: flex;
  margin-top: 5px;
  width: 100%;
  height: 40px;
  // overflow-x: scroll;
  background-color: rgba(255,255,255,0.5);

  .condition {
    flex: 1;
    height: 44px;
    line-height: 44px;
    width: 64px;
    text-align: center;
    font-size: 16px;
    color: rgba(125,124,123,1);
  }

  .condition.isActivated {
    font-family: PingFangSC-bold;
    font-weight: bold;
    color: rgba(88,74,72,1);
  }
}

.tools-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  margin: 6px 30px 0 18px;

  .choose-time {
    font-size: 16px;
    color: rgba(88,74,72,1);
    position: relative;
    &::after {
      position: absolute;
      right: -20px;
      top: 8px;
      box-sizing: border-box;
      width: 6px;
      height: 6px;
      border: 6px solid rgba(88,74,72,0);
      border-top: 6px solid rgba(88,74,72,1);
      content: '';
    }

    &.isActivated::after {
      top: 2px;
      border: 6px solid #EFEFEF;;
      border-bottom: 6px solid rgba(88,74,72,1);
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
  margin: 0 4px;
  margin-top: 11px;
  background-color: hsla(23, 85%, 95%, 1);
  .order {
    width: 410px;
    margin: 0 auto;
    margin-bottom: 17px;
    padding: 0 17px;
    background-color: hsla(0, 0%, 100%, 0.7);
    position: relative;
    .status-label {
        position: absolute;
        top: 0px;
        right: 0px;
    }
    .up {
        height: 49px;
        line-height: 49px;
        font-size: 14px;
        color: hsla(30, 1%, 49%, 1);
        border-bottom: 1px solid hsla(25, 1%, 49%, 1);
    }
    .middle {
        border-bottom: 1px solid hsla(25, 1%, 49%, 1);
        .item {
            margin: 18px 0;
            display: flex;
            font-size: 14px;
            color: black;
            .item-name {
                margin-right: 5px;
            }
            // .item-value {}
            &.highlight {
                font-weight: bold;
                // .item-name {}
                .item-value {
                    color: hsla(30, 86%, 60%, 1);
                }
            }
        }
    }

    .down {
        display: flex;
        justify-content: flex-end;
        padding-top: 14px;
        padding-bottom: 8px;
        .button {
            margin-right: 9px;
            width: 72px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: hsla(36, 94%, 66%, 1);
            border: 1px solid hsla(36, 94%, 66%, 1);
            border-radius: 3px;
        }
    }
}
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