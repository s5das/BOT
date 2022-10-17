<template>
  <div class="main" :style="{height:h+'px'}">
    <div class="box1">
      <div class="title">可提现金额 (元)</div>
      <div class="money">
        <div class="yuan1">¥</div>
        <div>{{max_num}}</div>
      </div>
      <div class="box2">
        <div class="b1">提现金额</div>
        <div class="b2">
          <div class="yuan2">¥</div>
          <div><input class="in" type="text" v-model="num"></div>
          <div style="color:#EA0C0C;line-height: 40px;" @click="getmax">全部提现</div>
        </div>
        <div class="b3">
          <div class="b3_left"></div>
          <div class="b3_right">
            <div><img style='margin-right: 5px;' src="@/assets/wechat.png"></div>
            <div>线下提现</div>
          </div>
        </div>
        <div class="b4">
          <button @click="withdrawmoney">申请提现</button>
        </div>
      </div>
    </div>
    <div class="list_status">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="items" v-for="(item) in details" :key="item.id">
            <div class="head">
              <div style="margin-left:20px">线下方式</div>
              <div style="margin-right:23px">{{item.apply_create_time}}</div>
            </div>

            <div class="bottom">
              <div class="left">
                <div style="margin-bottom:10px;font-size: 24px;color: #EA0C0C;font-weight: 600;">
                  {{item.money_to_withdraw}}</div>
                <div style="font-size:14px">提现金额（元）</div>
              </div>
              <div class="status" v-if="item.audit_status===0">
                <img class="statusico" src="@/assets/shenhe.png">
              </div>
              <div class="status" v-if="item.audit_status===1">
                <img class="statusico" src="@/assets/chengong.png">
              </div>
              <div class="status" v-if="item.audit_status===2">
                <img class="statusico" src="@/assets/reject.png">
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

    </div>
  </div>
</template>

<script>

import { sendrequest, getCouldWithdraw, getwithdrawinfo } from '@/http/api/courier'
import { Toast } from 'vant'
export default {
  name: 'with-draw',
  data() {
    return {
      finished: false,
      loading: false,
      refreshing: false,
      serialnumber: 1,
      h: document.body.clientHeight,
      num: '',
      max_num: 0,
      details: []
    }
  },
  methods: {
    getmax() {
      this.num = this.max_num
    },
    getmaxnum() {
      getCouldWithdraw().then((res) => { this.max_num = res.money_could_withdraw })
    },
    isNum(num) {
      if (num.match(/^\d+\b/) == null) {
        return false;
      } else {
        return true;
      }
    },
    withdrawmoney() {
      if (!this.isNum(this.num)) {
        Toast.fail(this.num + '不是数字')
      } else {
        if (this.num > this.max_num) {
          Toast.fail('请输入正确金额')
        } else {
          sendrequest(this.num).then(
            () => { Toast.success('已成功发起请求请联系管理员处理'); this.onRefresh(); this.num = '' },
            (err) => { Toast.fail(err.message) }
          )
        }
      }


    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.details = []
          this.refreshing = false
        }

        getwithdrawinfo(this.serialnumber).then(
          (res) => {
            this.details = this.details.concat(res)
            this.loading = false
            if (res.length < 10) {
              this.finished = true
            }
          },
          () => {
            this.loading = false
            this.finished = true
          }
        )
      }, 1000);

    },
    onRefresh() {
      this.loading = true
      this.refreshing = true
      this.finished = false
      this.serialnumber = 1
      this.onLoad()
    }
  },
  mounted() {
    this.getmaxnum()
  }
}
</script>
<style scoped lang="less">
.main {
  background: url('@/assets/个人中心.png');
}

.box1 {
  height: 170px;
  position: relative;
  margin-bottom: 280px;
  width: 428px;

  .title {
    position: absolute;
    top: 50px;
    left: 34px;
    color: #000;
    font-weight: 600;
    font-size: 15px;
  }

  .money {
    font-size: 30px;
    color: #E85F5F;
    position: relative;
    font-weight: 600;
    top: 80px;
    left: 34px;
    display: flex;
    width: 200px;

    .yuan1 {
      font-size: 15px;
      line-height: 30px;
    }

  }

  .box2 {
    width: 360px;
    height: 250px;
    background-color: #fff;
    position: absolute;
    padding: 16px 20px 16px 20px;
    top: 145px;
    border-radius: 6px;
    left: 14px;

    .b1 {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
      margin-bottom: 10px;

    }

    .b2 {
      display: flex;
      align-content: center;
      justify-content: space-around;
      margin-bottom: 10px;
      margin-left: 10px;

      .yuan2 {
        font-size: 35px;
        color: #000;
      }

      .in {
        height: 100%;
        color: #000;
        font-size: 20px;
        margin-left: 30px;
        width: 200px;
      }
    }

    .b3 {
      display: flex;
      justify-content: space-between;
      color: #101010;
      margin-bottom: 30px;
      margin-left: 10px;

      .b3_right {
        display: flex;
      }
    }

    .b4 {
      height: 51px;
      width: 312px;
      margin: 0 auto;

      color: #fff;

      button {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        background: linear-gradient(138deg, #FD9448, #FF7A55);
      }
    }
  }
}

.list_status {
  width: 400px;
  margin: 0 auto;

  .items {
    width: 380px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    margin-bottom: 32px;

    .head {
      height: 35px;
      display: flex;
      justify-content: space-between;
      line-height: 35px;
    }

    .bottom {
      height: 90px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;

      .status {
        display: flex;
        align-items: center;
      }

      .statusico {
        height: 60px;
        width: 75px;
      }

      .left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }
  }
}
</style>