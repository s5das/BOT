<template>
  <div class="main" :style="{height:h+'px'}">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item) in records" :key="item.application_id">
          <div class="righttop">
            <img :src="ico_src[item.audit_status]" class="ico">
          </div>
          <div class="top">
            订单时间：{{item.apply_create_time}}
          </div>
          <div class="middle">
            <div>申请金额：{{item.money_to_withdraw}}元</div>
            <div>名称：{{item.courier_real_name}}</div>
            <div>手机号：{{item.courier_phone_number}}</div>
            <div>fanbook昵称：{{item.courier_fanbook_nick_name}}</div>
            <div v-if="item.audit_status == 0 || item.audit_status == 1">提现方式：线下提现</div>
          </div>
          <div class="bottom" v-if="item.audit_status == 0">
            <button class="btn1" @click="pass(item.application_id)">通过</button>
            <button class="btn2" @click="reject(item.application_id)">拒绝</button>
          </div>
          <div class="reason_show" v-if="item.audit_status == 2">
            拒绝原因：{{item.reason_for_rejection}}
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
      records:[],

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
          this.records = []
          this.refreshing = false
        }

        serviceAxios({
          method: 'get',
          url: `/fanbook/deliverbot/back/admin/audit/get_withdraw_money_applications/${this.serialnumber}`
        }).then((res) => {
          this.records = this.records.concat(res)
          if (res.length < 10) {
            this.finished = true
          }
          this.loading = false
          this.serialnumber++
        },
          () => {
            // Toast.fail('请求失败');
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
          }).then(
            () => {
              Toast.success('操作成功');
              this.refreshing = true;
              this.websocket.send(`${localStorage.getItem('guildid')}:${2}`)
            },
            () => { })
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
          }).then(
            () => {
              this.reject_reason = '';
              this.reject_id = '';
              this.refreshing = true;
              this.onRefresh();
              this.websocket.send(`${localStorage.getItem('guildid')}:${2}`)
              done();

            }, () => { done(false) })
        } else {
          Toast.fail('拒绝理由不能为空')
          done(false)
        }
      } else {
        this.reject_reason = ''
        this.reject_id = ''
        done()
      }
    },
  },
  mounted() {
    if ('WebSocket' in window) {
      //后边是订阅的topic名称
      this.websocket = new WebSocket(`wss://www.gzxunyustf.top/fanbook/deliverbot/refreshList/${localStorage.getItem('guildid')}/${2}`);

    } else {
      Toast.fail('不支持websocket')
    }
    this.websocket.onmessage = (event) => {
      const receiveid = event.data.split(':')[0]
      if (receiveid == localStorage.getItem('guildid')) {
        this.onRefresh()
      }

    }
  },
  beforeDestroy() {
    this.websocket.close()
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
    width: 370px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    position: relative;
    border-radius: 15px;
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
    .reason_show{
      margin-top: 3px;
      word-wrap: break-word;
      color: red;
      font-size: 15px;
      width: 200px;

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