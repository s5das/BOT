<template>
  <div class="main" :style="{height:h+'px'}">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item) in records" :key="item.application_id">
          <div class="righttop">
            <img :src="ico_src[item.audit_status]" class="ico">
          </div>
          <div class="top">
            <div class="left">
              <img src="@/assets/back9.png">
            </div>
            <div class="right">
              <div class="name">{{item.real_name}}</div>
              <div>{{item.phone_number}}</div>
              <div>fanbook昵称：{{item.fanbook_nick_name}}</div>
              <div>备注：{{item.remarks||'暂无'}}</div>
              <div>
                {{item.apply_date_time}}
              </div>
            </div>
          </div>
          <div class="bottom" v-if="item.audit_status==0">
            <button class="btn1" @click="pass(item.application_id)">通过</button>
            <button class="btn2" @click="reject(item.application_id)">拒绝</button>
          </div>
          <div style="width: 200px;word-wrap: break-word;" v-if="item.audit_status==2">
            拒绝理由：{{item.reason_for_rejection}}
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
      <div class="dialog_content">
        <div class="title">拒绝理由</div>
        <div class="in1"><input type="text" placeholder="请输入拒绝理由" v-model="reject_reason" maxlength="250"></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import serviceAxios from '@/http';
import { Toast } from 'vant'
import { Dialog } from 'vant';
export default {

  name: 'set-down',
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
  mounted() {
    if ('WebSocket' in window) {
      //后边是订阅的topic名称
      this.websocket = new WebSocket(`wss://www.gzxunyustf.top/fanbook/deliverbot/refreshList/${localStorage.getItem('guildid')}/${3}`);
  
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
  },
  methods: {

    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.serialnumber = 1
      this.onLoad()
    },

    onLoad() {
      setTimeout(() => {

        if (this.refreshing) {
          this.records = []
          this.refreshing = false;
        }

        // 发起请求获取数据
        serviceAxios({
          method: 'get',
          url: `/fanbook/deliverbot/back/admin/audit/get_register_applications/${this.serialnumber}`
        }).then((res) => {
          // 加入数据
          this.records = this.records.concat(res)
          // 数据小于10条证明已经请求完成
          if (res.length < 10) {
            this.finished = true
          }
          this.loading = false
          this.serialnumber++
        },
          // 请求失败
          () => {
            this.finished = true
            this.loading = false
          }
        )

      }, 1000);
    },


    pass(id) {
      Dialog.confirm({
        title: '确认通过',
        message: '是否确认通过',
      })
        .then(() => {
          serviceAxios({
            method: 'get',
            url: `/fanbook/deliverbot/back/admin/audit/pass_register_application/${id}`
          }).then(
            () => {
              Toast.success('操作成功');
              this.refreshing = true;
              this.websocket.send(`${localStorage.getItem('guildid')}:${3}`)
            }, () => { Toast.fail('操作失败') })
        })

    },

    reject(id) {

      this.show = true;
      this.reject_id = id

    },

    beforeClose(action, done) {

      if (action === 'confirm') {

        if (this.reject_reason) {
          serviceAxios({
            method: 'post',
            url: '/fanbook/deliverbot/back/admin/audit/reject_register_application',
            data: { application_id: this.reject_id, reject_reason: this.reject_reason }
          }).then(() => {

            this.reject_reason = '';
            this.reject_id = '';
            this.refreshing = true;
            this.websocket.send(`${localStorage.getItem('guildid')}:${3}`)
            done()

          },
            () => { done(false) }
          )
        } else {
          Toast.fail('拒绝理由不能为空')
          done(false)
        }
      } else {
        this.reject_reason = ''
        this.reject_id = ''
        done()
      }
    }
  },
}

</script>

<style scoped lang="less">
.main {
  padding-top: 20px;
  box-sizing: border-box;
  background: url('@/assets/bg1.png');
  overflow: scroll;
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
  .item {
    width: 370px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    position: relative;
    .top {
      height: 164px;
      display: flex;
      border-bottom: 1px solid #bbb;

      .left {
        height: 80px;
        width: 80px;
        margin-right: 20px;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 15px;
        color: #bbb;

        .name {
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }
      }
    }

    .bottom {
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 12px;

      .btn1 {
        width: 58px;
        height: 24px;
        background-color: #fab855;
        color: #fff;
        margin-right: 15px;
        border-radius: 5px;
      }

      .btn2 {
        width: 58px;
        height: 24px;
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