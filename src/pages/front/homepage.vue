
<template>
  <div class="main">
    <div class="box1">
      <div v-for="(item,index) of pagedata" :key="index" class="box2">
          <img class="pic" :src="item.src">
        <div class="text1">
          {{item.text1}}
        </div>
        <button class="btn" @click="handle(index)">{{item.text2}}</button>
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
    this.isCouierSignupPopupShow = true
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
  padding-top: 100px;
  display: flex;
  justify-content: center
}
.box1{
  height: 568px;
  width: 203px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box2{
  height: 225px;
  width: 203px;
  display: flex;
  border-radius: 7px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  color: #251B19;
  font-weight: 500;
  .pic{
    height: auto;
    width: 152px;
  }
  .btn{
    background: linear-gradient(#4F91E5,#697DFF);
    border-radius: 10px;
    height: 36px;
    width: 96px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
}
.text1{
  font-size: 14px;
}

</style>