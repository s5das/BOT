<template>
    <div class="box" :style="{height:h +'px'}">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
      data() {
        return {
            h: 0
        }
      },
      mounted() {
        this.h = document.body.clientHeight
      }
    }
</script>

<style lang="less" scoped>
.box{
  user-select: none;
  background: #fcf6f4;
}
</style>