<template>

    <div class="box" :style="{height:h +'px'}">
        <router-view></router-view>
        <Tabbar></Tabbar>
        <div class="block"></div>
    </div>


</template>

<script>
import Tabbar from '@/components/tabbar.vue';
    export default {
    components: { Tabbar },
    data() {
        return {
            h: document.body.clientHeight
        }
      }
}
</script>

<style lang="less" scoped>
.box{
  user-select: none;
  background: #fcf6f4;
  overflow-y: scroll;
}
.block{
  height: 70px;
  width: 100%;
}
</style>