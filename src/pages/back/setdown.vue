<template>
  <div class="main">

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
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
<van-dialog v-model="show"  show-cancel-button :before-close="beforeClose">
        <div class="dialog_content">
            <div class="title">拒绝理由</div>
            <div  class="in1"><input type="text" placeholder="请输入拒绝理由" v-model="reject_reason"></div>
        </div>
    </van-dialog>
  </div>
</template>

<script>
import serviceAxios from '@/http';
import {Toast} from 'vant'
export default {

  name: 'set-down',
  data(){
    return {
      show: false,
      loading:false,
      isLoading: false,
      finished: false,
      serialnumber: 1,
      id: [],
      time: [],
      nick_name: [],
      phone: [],
      real_name: [],
      remarks: [],
      reject_reason: '',
      reject_id:''
    }
  },

  methods: {
    getinfo(num) {
      serviceAxios({
        method: 'get',
        url:`/fanbook/deliverbot/back/admin/audit/get_register_applications/${num}`
      }).then((res) => {
        if (res.code == 0) {
          
          if (res.data.length != 0) {
        for (var i = 0; i < res.data.length; i++){
        let temp = res.data[i]
          this.id.push(temp.application_id)
           this.time.push(temp.apply_date_time)
           this.nick_name.push(temp.fanbook_nick_name)
           this.phone.push(temp.phone_number)
           this.real_name.push(temp.real_name)
           this.remarks.push(temp.remarks)          
        }          
          } else {
          this.finished=true
        }

        } else {
        Toast.fail('操作频繁')
 }
      }
      )
    },


    changeinfo(num) {
      serviceAxios({
        method: 'get',
        url:`/fanbook/deliverbot/back/admin/audit/get_register_applications/${num}`
      }).then((res) => {
        if (res.code == 0) {
          
        
        this.id = []
        this.time = []
        this.nick_name = []
        this.phone = []
        this.real_name =[]
        this.remarks = []
        for (var i = 0; i < res.data.length; i++){
           let temp = res.data[i]
           this.id.push(temp.application_id)
           this.time.push(temp.apply_date_time)
           this.nick_name.push(temp.fanbook_nick_name)
           this.phone.push(temp.phone_number)
           this.real_name.push(temp.real_name)
           this.remarks.push(temp.remarks)
          }
        } else {
          Toast.fail('操作频繁')
        }

      },
      ()=>{Toast.fail('获取信息失败')}
      )
    },
    onRefresh() {
         this.serialnumber=1
         this.changeinfo(this.serialnumber)
         this.serialnumber++
      this.isLoading = false
         this.finished = false
    },
    onLoad() {
        this.getinfo(this.serialnumber)
      this.serialnumber++
        this.loading = false
    },
    pass(id) {
      serviceAxios({
        method: 'get',
        url:`/fanbook/deliverbot/back/admin/audit/pass_register_application/${id}`
      }).then(() => { Toast.success('操作成功'); this.onRefresh()},()=>{Toast.fail('操作失败')})
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
                    url:'/fanbook/deliverbot/back/admin/audit/reject_register_application',
                    data:{application_id:this.reject_id,reject_reason:this.reject_reason}
                }).then((res) => {
                  if (res.code == 0) {
                    this.reject_reason = '';
                    this.reject_id = '';
                    this.onRefresh();
                    done()
                  } else {
                    done(false)
                  }

                })
            } else {
                done(false)
            }
        } else {
            this.reject_reason = ''
            this.reject_id=''
            done()
        }
        },
  },
  mounted() {
      this.getinfo(this.serialnumber);
      this.serialnumber++
    }
}
</script>

<style scoped lang="less">
    .main{
      padding-top:20px;
      .item{
        height: 214px;
        width: 370px;
        margin: 0 auto;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        .top{
            height: 140px;
            display: flex;
            border-bottom: 1px solid #bbb;
          .left{
              height: 80px;
              width: 80px;
              margin-right: 20px;
              img{
                height: 100%;
                width: 100%;
              }
          }
          .right{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: #bbb;
            .name{
              font-size: 17px;
              font-weight: 600;
              color: #000;
            }
          }
        }

        .bottom{
          height: 40px;
          display: flex;
          justify-content: flex-end;
          align-items:center;
          .btn1{
              width: 70px;
              height: 25px;
              background-color: #fab855;
              color:#fff;
              margin-right: 15px;
              border-radius: 5px;
          }
          .btn2{
              width: 70px;
              height: 25px;
              background-color: #fff;
              border: 1px solid #fab855;
              color: #fab855;
          }
        }
      }
      .dialog_content{
        height: 150px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .title{
           font-size: 18px;
           font-weight: 600;
           height:50px;
           line-height: 50px;
           text-align: center;
        } 
        .in1{
            display: flex;
            justify-content: center;
            align-items: center;
           height: 100px;
           input{
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