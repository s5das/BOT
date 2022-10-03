<template>
  <div class="main" :style="{height:h+'px'}">
    <div class="box1">
      <div class="photo">
        <img class="img1" :src="src">
      </div>
      <div class="name">{{name}}</div>
      <div class="box2">
        <div class="bar" v-for="(item,index) in barlist" :key="index" @click="handleclick(index)">
          <div><img class="img2" :src="item.ico"></div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>

    <div class="box3">
      <div class="title">服务统计</div>
      <div class="content">

        <Cellgroup :items="items" 
        :config="[statistics.money_earned,
                  statistics.money_could_withdraw,
                  statistics.total_take_order_nums,
                  statistics.finished_order_nums,
                  statistics.ongoing_order_nums]"
        ></Cellgroup>
      </div>
    </div>
  </div>
</template>

<script >
import serviceAxios from '@/http';
import Cellgroup from '@/components/cellgroup.vue';



export default {
  name: "personal-center",
  data() {
    return {
      // tabbar id
      h: document.body.clientHeight,
      id: 2,
      statistics: {},
      src: localStorage.getItem("avatar_url"),
      name: localStorage.getItem("fanbook_nick_name"),
      barlist: [{
        ico: require("@/assets/front6.png"),
        text: "全部订单"
      }, {
        ico: require("@/assets/front7.png"),
        text: "待接单"
      }, {
        ico: require("@/assets/front9.png"),
        text: "进行中"
      }, {
        ico: require("@/assets/front8.png"),
        text: "已完成"
      },
      ],
      items: [
      {
          ico: require('@/assets/front1.png'),
          title: '总收入金额',
          arrow: false,
          cancelborder:true
        },        {
          ico: require('@/assets/front5.png'),
          title: '未提现金额',
          to:'/front/withdraw',
          arrow: true,
          cancelborder:true
        },        {
          ico: require('@/assets/back2.png'),
          title: '全部订单数',
          arrow: true,
          cancelborder:true
        },        {
          ico: require('@/assets/front4.png'),
          title: '已完成订单数',
          arrow: true,
          cancelborder:true
        },        {
          ico: require('@/assets/front3.png'),
          title: '未完成订单数',
          arrow: true,
          cancelborder:true
        },
      ]
    };
  },
  methods: {

    handleclick(index) {
      switch (index) {
        case 0:
          this.$router.replace({ path: "/front/order?condition=0" });
          break;
        case 1:
          this.$router.replace({ path: "/front/order?condition=1" });
          break;
        case 2:
          this.$router.replace({ path: "/front/order?condition=2" });
          break;
        case 3:
          this.$router.replace({ path: "/front/order?condition=3" });
          break;
      }
    }
  },
  mounted() {
    serviceAxios({
      method: "get",
      url: "/fanbook/deliverbot/general/user_center/get_statistics"
    }).then((res) => { this.statistics = res; });
  },
  components: { Cellgroup }
}

</script>

<style scoped lang="less">
.main {
  background: url('@/assets/个人中心.png');

}

.box1 {
  height: 155px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 104px;

  .photo {
    height: 65px;
    width: 65px;
    margin-bottom: 10px;

    .img1 {
      width: 100%;
      height: 100%;
      border-radius: 32.5px;
    }
  }

  .name {
    color: #000;
    font-size: 16px;
  }
}

.box2 {
  width: 380px;
  height: 105px;
  background-color: #fff;
  position: absolute;
  top: 145px;
  border-radius: 6px;
  display: flex;

  .bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img2{
      height: 31px;
      width: 28px;
    }
  }
}

.box3 {
  width: 360px;
  height: 505px;
  background-color: #fffcfb;
  margin: 0 auto;
  padding: 10px;

  .title {
    height: 30px;
    font-size: 16px;
    font-weight: 500;
    margin-left:20px ;
    color: #000;
    margin-bottom: 12px;
  }

  .cell_title {
    font-weight: 600;
    line-height: 19px;
  }

  .line {
    height: 2px;
    border-bottom: 1px solid #bbb;
  }
}
</style>