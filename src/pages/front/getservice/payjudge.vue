<template>
  <div class="main">
    <van-dialog v-model="isShow" title="支付查询" :before-close="beforeClose">
      <div class="text">请确认是否已经完成支付</div>
    </van-dialog>

    <div class="loading" v-show="isloading">
      <van-loading
        size="80px"
        type="spinner"
        color="#f09c45"
        text-size="20px"
        vertical
        >加载中...</van-loading
      >
    </div>
    <div class="success" v-show="issuccess">支付成功</div>
    <div class="fail" v-show="isfail">支付失败</div>
  </div>
</template>
<script>
import { paycheck, wxpay } from "@/http/api/wx/wxpay";
import { Toast } from "vant";
import x2js from "x2js";
import { useStore } from "@/model/store";
import { storeToRefs } from "pinia";
let store = useStore();

export default {
  name: "judge-pay",
  data() {
    return {
      isloading: true,
      issuccess: false,
      isfail: false,
      status: storeToRefs(useStore()).status,
    };
  },
  computed: {
    isShow() {
      return this.status == 1;
    },
  },

  methods: {
    beforeClose(action) {
      if (action === "confirm") {
        setTimeout(() => {

          paycheck(localStorage.getItem("orderid")).then((res) => {
            let X2JS = new x2js();
            var jsonObj = X2JS.xml2js(res).xml;
            //   设置支付状态
            // 成功延时跳转到payfinish界面
            if (
              jsonObj.return_code == "SUCCESS" &&
              jsonObj.result_code == "SUCCESS" &&
              jsonObj.trade_state == "SUCCESS"
            ) {
              store.clear();
              this.status = 0;
              this.isloading = false;
              this.issuccess = true;
              this.isfail = false;
              localStorage.removeItem("orderid");
              localStorage.removeItem("jine");
              setTimeout(() => {
                this.$router.replace({
                  path: "/front/payfinish",
                  query: {
                    orderId: jsonObj.out_trade_no.slice(9),
                  },
                });
              }, 500);
            } else {
              // 失败延时回到homepage页面
              this.status=0;
              this.isloading = false;
              this.issuccess = false;
              this.isfail = true;
              localStorage.removeItem("orderid");
              localStorage.removeItem("jine");
              setTimeout(() => {
                this.$router.replace({
                  path: "/front/placeorder",
                });
              }, 3000);
            }
          });
        }, 2000);
      }
    },
  },

  mounted() {
    // 通过路由跳转进入
    if (this.status == 0) {
      this.status = 1;
      // 吊起微信支付     
      setTimeout(() => {
        wxpay(
          Number(localStorage.getItem("jine")),
          localStorage.getItem("orderid")
        );
      }, 500);
    } 
    


  },
};
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .fail,
  .success {
    font-size: 26px;
    font-weight: 600;
    color: #f09c45;
  }
  .loading {
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .text{
    margin:25px 0 ;
    width: 100%;
    text-align: center;
  }
}
</style>
