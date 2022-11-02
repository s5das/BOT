<!-- 抢单详情页 -->
<template>
  <div class="margin-bottom-12px">
    <div v-if="iscurisior">
      <!-- 1 待接单 -->
      <div v-if="orderInfo.order_status === '待接单'">
        <Orderinfo class="margin-bottom-12px" :orderinfo="orderInfo" />
        <Userinfo
          v-if="user_id != undefined && user_id == orderInfo.recipient_id"
          :orderinfo="orderInfo"
        />
      </div>

      <!-- 2 派送中 -->
      <div v-if="orderInfo.order_status === '派送中'">
        <Successhead v-if="showhead">
          <template v-slot:content>
            <div>
              {{ msg }}
            </div>
          </template>
        </Successhead>
        <Orderinfo class="margin-bottom-12px" :orderinfo="orderInfo" />
        <Userinfo class="margin-bottom-12px" :orderinfo="orderInfo" />
        <CourierInfo :order="orderInfo"></CourierInfo>

      </div>

      <!-- 3 已送达 -->
      <div v-if="orderInfo.order_status === '已送达'" class="received-box">
        <div class="auto-confirm-prompt">
          <van-icon name="bell" color="#E99D42" size="21" />
          <div class="prompt-text">
            快递已送达, 待确认收货, 24小时后自动确认收货
          </div>
        </div>
        <Orderinfo class="margin-bottom-12px" :orderinfo="orderInfo" />
        <Userinfo :orderinfo="orderInfo" />
        <CourierInfo :order="orderInfo"></CourierInfo>
      </div>

      <!-- 4 已完成 -->
      <div v-if="orderInfo.order_status === '已完成'" class="completed-box">
        <div class="completed-prompt">
          <!-- 2022-08-07 16：00 确认收货 -->
        </div>
        <Orderinfo class="margin-bottom-12px" :orderinfo="orderInfo" />
        <Userinfo :orderinfo="orderInfo" />
        <CourierInfo :order="orderInfo"></CourierInfo>

      </div>

      <!-- 5 已取消 -->
      <div v-if="orderInfo.order_status === '已取消'">
        <Orderinfo :orderinfo="orderInfo" />
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Orderinfo from "@/components/orderinfo.vue";
import Successhead from "@/components/successhead.vue";
import Userinfo from "@/components/userinfo.vue";
import { takeOrder, turnDelivered } from "@/http/api/courier";
import { completeOrder } from "@/http/api/user";
import { getDetails } from "@/http/api/general/generalOrderController";
import { Toast } from "vant";
import CourierInfo from "@/components/courierInfo.vue";
import { getPrivateChannelName } from "@/http/api/general/generalOrderController";
import { getUserType } from "@/http/api/common";
import { TYPE } from "@/http/const/const";
export default {

  // mode: 0:我的发布进入
  // mode: 1:我的订单进入
  // mode: 2:去抢单进入
  beforeMount() {
        this.showhead = false
    },
  mounted() {
    this.orderId = this.$route.params.id;
    this.status = this.$route.params.status;
    getDetails({
      orderId: this.orderId,
    }).then((res) => {
      this.orderInfo = res;
      console.log(res);
      // Toast(res.courier_id)
    }),
      // Toast(this.user_id)
      (this.user_id = localStorage.getItem("user_id"));
    // Toast(this.user_id)
    if ("WebSocket" in window) {
      //后边是订阅的topic名称
      this.websocket = new WebSocket(
        `wss://www.gzxunyustf.top/fanbook/deliverbot/refreshList/${localStorage.getItem(
          "guildid"
        )}/${1}`
      );
    } else {
      Toast.fail("不支持websocket");
    }
  },
  beforeDestroy() {
    this.websocket.close();
  },
  data() {
    return {
      showhead: true,
      msg: "抢单成功",
      orderId: -1,
      iscurisior: true,
      // status: '待抢单',
      // status: '派送中',
      // status: '已送达',
      status: "已完成",
      isConfirmingSent: false,
      isConfirmingReceived: false,
      isConfirmingContact: false,
      isConfirmingExit: false,
      indexOfContactChoicesChosen: 0,
      type: [],
      orderInfo: {
        courier_id: "派送员的用户id",
        courier_name: "派送员名称",
        courier_phone_number: "派送员电话号码",
        create_time_string: "订单创建时间",
        deliver_address: "收件地址",
        deliver_time_period_string: "送达时间段",
        num_of_packages: "包裹数量",
        order_pic_urls: "客户上传到订单的图片的url地址列表",
        order_status: "订单状态",
        pickup_address: "快递点地址",
        recipient_id: "客户的用户id",
        recipient_name: "收件人名称",
        recipient_phone_number: "收件人电话号码",
        remarks: "客户备注",
        reward: "付款金额",
        spec_name: "规格名称",
      },
      private_channel_name: "",
      user_id: "",
    };
  },
  methods: {
    async grab() {
      takeOrder({
        orderId: this.orderId,
      }).then(() => {
        this.orderInfo.order_status = "派送中";
        this.websocket.send(`${localStorage.getItem("guildid")}:${1}`);
      });
    },
    contact() {
      getPrivateChannelName({
        orderId: this.orderId,
      }).then((data) => {
        this.isConfirmingContact = false;
        this.private_channel_name = data.private_channel_name;
        this.isConfirmingExit = true;
      });
    },
    exit() {
      window.fb.closeWindow();
    },
    confirmSent() {
      // 发送变更状态请求
      turnDelivered({
        orderId: this.orderId,
      }).then(() => {
        this.orderInfo.order_status = "已送达";
        Toast("操作成功");
        this.isConfirmingSent = false;
      });
    },
    confirmReceived() {
      // 发送变更状态请求
      completeOrder({
        orderId: this.orderId,
      }).then(() => {
        this.orderInfo.order_status = "已完成";
        Toast("操作成功");
        this.isConfirmingReceived = false;
      });
    },
  },
  components: { Orderinfo, Successhead, Userinfo, CourierInfo },
};
</script>

<style lang="less" scoped>
.margin-bottom-12px {
  margin-bottom: 12px;
}

.confirm-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 366px;
  height: 162px;
  font-size: 18px;
  text-align: center;

  .title {
    height: 40px;
    line-height: 40px;
  }

  .pop-buttons {
    display: flex;
    justify-content: space-between;
    .button {
      width: 40%;
      height: 40px;
      margin-bottom: 5px;
      line-height: 40px;
      font-size: 20px;
      &:first-of-type {
        color: rgba(234, 12, 12, 87);
      }
    }
  }
}

// 已送达
.received-box {
  position: relative;
  .auto-confirm-prompt {
    position: absolute;
    left: -30px;
    top: 0;
    z-index: 999;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 5px;
    .prompt-text {
      margin-left: 2px;
      font-size: 13px;
      color: rgba(79, 79, 79, 64);
    }
  }
}

// 已完成
.completed-box {
  position: relative;
  .completed-prompt {
    position: absolute;
    z-index: 999;
    margin-left: 40px;
    margin-top: 10px;
    height: 23px;
    line-height: 23px;
    color: rgba(79, 79, 79, 64);
    font-size: 13px;
  }
}

.confirm-box {
  width: 380px;
  height: auto;
  .top {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;
    img {
      width: 25px;
      height: 25px;
    }
    .title {
      margin-left: 1px;
      color: rgba(88, 74, 72, 1);
      font-size: 20px;
    }
  }
  .prompt {
    margin: 0 46px;
    margin-top: 22px;
    margin-bottom: 36px;
    .line {
      font-size: 18px;
      color: rgba(88, 74, 72, 1);
    }
  }
  .buttons-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(118, 118, 118, 1);
    .button {
      width: 50%;
      height: 49px;
      line-height: 49px;
      color: rgba(125, 124, 123, 1);
      font-size: 20px;
      font-weight: bold;
    }
    .highlight {
      color: rgba(239, 124, 38, 1);
      border-right: 1px solid rgba(118, 118, 118, 1);
    }
  }
}
</style>
