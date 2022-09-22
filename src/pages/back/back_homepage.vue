<template>
  <div class="main">
    <div class="box1">
      <Cellgroup :items="items1"></Cellgroup>
    </div>
    <div class="box1">
      <Cellgroup :items="items2"></Cellgroup>
    </div>
    <div class="box1">
      <Cellgroup :items="items3"></Cellgroup>
    </div>
    <div class="box1">
      <Cellgroup :items="items4"></Cellgroup>
    </div>
  </div>
</template>
 
<script>
import Cellgroup from '@/components/cellgroup.vue'
export default {
  components:{Cellgroup},
  name: 'back-homepage',
  data() {
    return {
      items1: [
        {
          ico: require('@/assets/back1.png'),
          title: '入住审核',
          config: '',
          arrow: true,
          to:'/back/setdown'
        },
        {
          ico: require('@/assets/back2.png'),
          title: '提现审核',
          config: '',
          arrow: true,
          to:'/back/moneymanage'
        },
        {
          ico: require('@/assets/back3.png'),
          title: '派送员管理',
          config: '',
          arrow: true,
          to:'/login'
        }
      ],
      items2: [
        {
          ico: require('@/assets/back3.png'),
          title: '客户管理',
          config: '',
          arrow: true,
          to:'/back/customermanage'
        },
        {
          ico: require('@/assets/back4.png'),
          title: '订单管理',
          config: '',
          arrow: true,
          to:'/getin'
        }
      ],
      items3: [
        {
          ico: require('@/assets/back2.png'),
          title: '价格配置',
          config: '',
          arrow: true,
          to:'/back/sizesettings'
        },
        {
          ico: require('@/assets/back5.png'),
          title: '快递点配置',
          config: '',
          arrow: true,
          to:'/back/locationsettings'
        }
      ],
      items4: [
        {
          ico: require('@/assets/back6.png'),
          title: '设置',
          config: '',
          arrow: true,
          to:'/back/settings'
        }
      ],
    }


  } 
}
</script>

<style scoped lang="less">
  .main{

    background: #fcf6f4;
    height: 850px;
    padding-top: 30px;
  }
  .box1{
     margin-bottom: 30px;
  }
  body{
     background-color: pink ;
  }
</style>