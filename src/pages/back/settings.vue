<template>
  <div class="main">
    <Cellgroup :items="items"></Cellgroup>
  </div>
</template>

<script>
import Cellgroup from '@/components/cellgroup.vue';
export default {
    components: { Cellgroup },
    name:'set-tings',
    data() {
        return {
        items:[ {
          ico: require('@/assets/back7.png'),
          title: '身份信息',
          config: '',
          arrow: true,
          to:'/getin'
            },
            {
          ico: require('@/assets/back8.png'),
          title: '支付设置',
          config: '',
          arrow: true,
          to:'/getin'
        }]
        }
    }
}
</script>

<style scoped >
.main{
    padding-top: 30px;
    height: 850px;
    background: #fcf6f4;
}
</style>