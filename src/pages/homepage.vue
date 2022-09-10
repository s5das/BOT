
<template>
  <div>
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

export default {
    name: "home-page",
    data() {
        return {
            pagedata: [
                { text1: "我是客户", text2: "去下单", src: require("@/assets/customer.png") },
                { text1: "我是派送员", text2: "去抢单", src: require("@/assets/worker.png") }
            ],

            // 是否弹出 派送员入驻申请
            isCouierSignupPopupShow: false,

            // 用户身份
            isCouier: true
        };
    },
  methods: {
    handle(type) {
      // Toast(type)
      if (type === 1) {
        if (!this.isCouier) {
          // 未入驻 去申请入驻
          this.isCouierSignupPopupShow = true
        } else {
          // 已入驻 去抢单界面
          this.$router.push({ name: 'grabOrder' })
        }
      } else {
        this.$router.push({
          path: '/placeorder'
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
.box1{
  display: flex;
  justify-content: space-around;
}

.box2{
  height: 210px;
  width: 182px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.text1{
  font-size: 14px;
}
</style>