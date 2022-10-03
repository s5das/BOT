<template>
  <div class="main" :style="{height:h+'px'}">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item,index) in id" :key="item">
          <div class="righttop">
            <img :src="ico_src[status[index]]" class="ico">
          </div>
          <div class="top">
            订单时间：{{time[index]}}
          </div>
          <div class="middle">
            <div>申请金额：{{money[index]}}元</div>
            <div>名称：{{real_name[index]}}</div>
            <div>手机号：{{phone[index]}}</div>
            <div>fanbook昵称：{{nick_name[index]}}</div>
          </div>
          <div class="bottom">
            <button class="btn1" @click="pass(id[index])">通过</button>
            <button class="btn2" @click="reject(id[index])">拒绝</button>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
      <div class="dialog_content">
        <div class="title">拒绝理由</div>
        <div class="in1"><input type="text" placeholder="请输入拒绝理由" v-model="reject_reason"></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import serviceAxios from '@/http';
import { Toast } from 'vant'
import { Dialog } from 'vant';
export default {

  name: 'money-manage',
  data() {
    return {
      ico_src: [require('@/assets/back12.png'), require('@/assets/back11.png'), require('@/assets/back13.png')],
      show: false,
      loading: false,
      refreshing: false,
      finished: false,
      serialnumber: 1,
      id: [],
      time: [],
      status: [],
      nick_name: [],
      phone: [],
      real_name: [],
      money: [],
      reject_reason: '',
      reject_id: '',
      h: document.body.clientHeight
    }
  },

  methods: {


    onRefresh() {
      this.serialnumber = 1
      this.loading = true
      this.finished = false
      this.onLoad()
    },

    onLoad() {

      setTimeout(() => {
        if (this.refreshing) {
          this.id = []
          this.time = []
          this.status = []
          this.nick_name = []
          this.phone = []
          this.real_name = []
          this.money = []
          this.refreshing = false
        }

        serviceAxios({
          method: 'get',
          url: `/fanbook/deliverbot/back/admin/audit/get_withdraw_money_applications/${this.serialnumber}`
        }).then((res) => {
          for (var i = 0; i < res.length; i++) {
            let temp = res[i]
            this.id.push(temp.application_id)
            this.time.push(temp.apply_create_time)
            this.status.push(temp.audit_status)
            this.nick_name.push(temp.courier_fanbook_nick_name)
            this.phone.push(temp.courier_phone_number)
            this.real_name.push(temp.courier_real_name)
            this.money.push(temp.money_to_withdraw)
          }

          if (res.length < 10) {
            this.finished = true
          }
          this.loading = false
          this.serialnumber++
        },
          () => {
            Toast.fail('请求失败');
            this.loading = false
            this.finished = true
          }
        )
      }, 1000);

    },


    pass(id) {
      Dialog.confirm({
        title: '确认通过',
        message: '是否确认通过',
      }).then(
        () => {
          serviceAxios({
            method: 'get',
            url: `/fanbook/deliverbot/back/admin/audit/pass_withdraw_money_application/${id}`
          }).then(() => { Toast.success('操作成功'); this.refreshing=true;this.onRefresh() }, () => { Toast.fail('操作失败') })
        }
      )

    },

    reject(id) {
      this.show = true;
      this.reject_id = id;
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (this.reject_reason) {
          serviceAxios({
            method: 'post',
            url: '/fanbook/deliverbot/back/admin/audit/reject_withdraw_money_application',
            data: { application_id: this.reject_id, reject_reason: this.reject_reason }
          }).then(() => { this.reject_reason = ''; this.reject_id = ''; this.refreshing = true; this.onRefresh(); done() }, () => { done(false) })
        } else {
          done(false)
        }
      } else {
        this.reject_reason = ''
        this.reject_id = ''
        done()
      }
    },
  }
}
</script>

<style scoped lang="less">
.main {
  padding-top: 20px;
  box-sizing: border-box;
  background: url('@/assets/bg1.png');
  overflow: scroll;

  .item {
    height: 267px;
    width: 370px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    position: relative;

    .righttop {
      position: absolute;
      top: 0;
      right: 0px;
      height: 60px;
      width: 60px;

      .ico {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      height: 49px;
      display: flex;
      align-items: center;
      color: #bbb;
      font-size: 14px;
      border-bottom: 1px solid #bbb;
    }

    .middle {

      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 15px;
      font-weight: 500;
      color: #000;
      border-bottom: #bbb solid 1px;
    }

    .bottom {
      margin-top: 12px;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .btn1 {
        width: 70px;
        height: 25px;
        background-color: #fab855;
        color: #fff;
        margin-right: 15px;
        border-radius: 5px;
      }

      .btn2 {
        width: 70px;
        height: 25px;
        background-color: #fff;
        border: 1px solid #fab855;
        color: #fab855;
      }
    }
  }

  .dialog_content {
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: 600;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }

    .in1 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;

      input {
        height: 30px;
        width: 100%;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #bbb;
      }
    }
  }
}
</style>