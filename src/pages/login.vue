<template>
  <div class="main">
    <button @click="close" class="btn">点击关闭登录界面</button>
  </div>
</template>

<script>

// import { login} from '@/http/api/user'
// import { Dialog } from 'vant';
export default {
  name: 'log-in',
    props:['code'],
    methods: {
        close() {
        window.close()
        },
    },
  mounted() {
        localStorage.setItem('code',this.code)
        }
        

    
}
</script>

<style scoped lang="less">
.main{
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
      .btn{
        width: 150px;
        height: 50px;
        font-size: 15px;
        color: white;
        background-color: orange;
        border-radius: 15px;
      }
}
</style>