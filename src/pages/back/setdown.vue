<template>
  <div class="main" :style="{height:h+'px'}">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item,index) in id" :key="item">
          <div class="top">
            <div class="left">
              <img src="@/assets/back9.png">
            </div>
            <div class="right">
              <div class="name">{{real_name[index]}}</div>
              <div>{{phone[index]}}</div>
              <div>fanbook昵称：{{nick_name[index]}}</div>
              <div>备注：{{remarks[index]}}</div>
              <div>
                {{time[index]}}
              </div>
            </div>
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
import serviceAxios from '@/http/api/back/httpForBack';
import { Toast } from 'vant'
import { Dialog } from 'vant';
export default {

  name: 'set-down',
  data() {
    return {
      show: false,
      loading: false,
      refreshing: false,
      finished: false,
      serialnumber: 1,
      id: [],
      time: [],
      nick_name: [],
      phone: [],
      real_name: [],
      remarks: [],
      reject_reason: '',
      reject_id: '',
      h: document.body.clientHeight
    }
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
          this.id = []
          this.time = []
          this.nick_name = []
          this.phone = []
          this.real_name = []
          this.remarks = []
          this.refreshing = false;
        }

        // 发起请求获取数据
        serviceAxios({
          method: 'get',
          url: `/fanbook/deliverbot/back/admin/audit/get_register_applications/${this.serialnumber}`
        }).then((res) => {
          // 加入数据
          for (var i = 0; i < res.length; i++) {
            let temp = res[i]
            this.id.push(temp.application_id)
            this.time.push(temp.apply_date_time)
            this.nick_name.push(temp.fanbook_nick_name)
            this.phone.push(temp.phone_number)
            this.real_name.push(temp.real_name)
            this.remarks.push(temp.remarks)
          }
          // 数据小于10条证明已经请求完成
          if (res.length < 10) {
            this.finished = true
          }
          this.loading = false
          this.serialnumber++
        },
          // 请求失败
          () => {
            Toast.fail('请求失败')
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
          }).then(() => { Toast.success('操作成功'); this.refreshing = true ; this.onRefresh() }, () => { Toast.fail('操作失败') })
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
            this.onRefresh();
            done()

          },
            () => { done(false) }
          )
        } else {
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

  .item {
    height: 214px;
    width: 370px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;

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