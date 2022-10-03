
<template>
  <div class="main">
    <div class="box1">
      <div v-for="(item,index) of pagedata" :key="index" class="box2">
        <div class="pic">
          <img :src="item.src">
        </div>
        <div class="text1">
          {{item.text1}}
        </div>
        <van-button color="#EA0C0C" plain round size="mini" @click="handle(index)">{{item.text2}}</van-button>
      </div> 

    <SignupPopup :show="isCouierSignupPopupShow" @changeShow="changeShow"></SignupPopup>
    </div>
   
  </div>
</template>

<script>
import SignupPopup from '@/components/courier/signupPopup.vue';
// import { Toast } from 'vant';
import { getUserType } from '@/http/api/common';
import authorize from '@/utils/authorize'
import { TYPE } from '@/http/const/const';
import PubSub from 'pubsub-js';
export default {
    name: "home-page",
    data() {
      return {
        // tabbar id
            id:0,
            pagedata: [
                { text1: "我是客户", text2: "去下单", src: require("@/assets/customer.png") },
                { text1: "我是派送员", text2: "去抢单", src: require("@/assets/worker.png") }
            ],

            // 是否弹出 派送员入驻申请
            isCouierSignupPopupShow: false,

            // 用户身份
            typeOfUser: ''
        };
    },
  mounted() {
    PubSub.publish('changetabbar',this.id)
    this.isCouierSignupPopupShow = true
    // this.init();登录并缓存得到的结果
  },
  methods: {
    async init() {
      authorize();
    },
    handle(type) {
      // Toast(type)
      if (type === 1) {
        // 拿到类型数组
        getUserType().then(data => {
          this.typeOfUser = data.user_type
          // console.log(this.typeOfUser)
          if (TYPE.IDENTIFIED_COURIER !== this.typeOfUser) {
            // 未入驻 去申请入驻
            this.isCouierSignupPopupShow = true
          } else {
            // 已入驻 去抢单界面
            this.$router.push({ name: 'grabOrder' })
          }
        });
      } else {
        this.$router.push({
          path: '/front/placeorder'
        })
      }
    },
    changeShow(val) {
      this.isCouierSignupPopupShow = val
    }
  },
   components: { SignupPopup }
}
</script >

<style scoped lang="less">
  .main{
    padding: 15px;
    height: 800px;
    background-color: #EFEFEF ;
  }
.box1{
  display: flex;
  justify-content: space-around;
}

.box2{
  height: 210px;
  width: 170px;
  background-color: #fff;
  display: flex;
  border-radius: 7px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.text1{
  font-size: 14px;
}

</style>