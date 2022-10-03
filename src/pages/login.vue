<template>
  <div class="main">

  </div>
</template>

<script>

import { login, login_back } from '@/http/api/user'
import { Dialog } from 'vant';
export default {
  name: 'log-in',
  props: ['code'],

  mounted() {

    let state = localStorage.getItem('state')
    if (state === '1') {
      login_back(this.code).then(
        (res) => {
          if (res.avatar_url) {
            localStorage.setItem('avatar_url', res.avatar_url)
            localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
            localStorage.setItem('token', res.jwt_token)
            localStorage.setItem('user_id', res.user_id)
          }
        }
      ).then(()=>{
        if (localStorage.getItem('token')) {
          localStorage.setItem('lastLoginTime',new Date().getTime())
          this.$router.push({
            path: '/back'
          })
        } else {
          Dialog({ message: '权限不足' });
        }
      })
    } else {
      login(this.code).then(
        (res) => {
          if (res.avatar_url) {
            localStorage.setItem('avatar_url', res.avatar_url)
            localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
            localStorage.setItem('token', res.jwt_token)
            localStorage.setItem('user_id', res.user_id)
          }
        }
      ).then(()=>{
        if (localStorage.getItem('token')) {
          localStorage.setItem('lastLoginTime',new Date().getTime())
          this.$router.push({
            path: '/front'
          })
        } else {
          Dialog({ message: '授权失败' });
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: 800px;
  background: #fcf6f4;
}
</style>