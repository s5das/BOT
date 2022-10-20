<template>
    <div></div>
</template>

<script>
// import loginStatus from '@/utils/loginStatus'
// import { Toast } from 'vant'
export default {
    name: 'log-in2',
    props: ['state'],
    // methods: {
    //     fbinit() {
    //         return new Promise(
    //             (resolve) => {
    //                 window.fb.init({
    //                     success: () => { resolve('initsuccess') }
    //                 })
    //             }
    //         )
    //     }
    // },
    data() {
        return {
            h: document.body.clientHeight
        }
    },
    // mounted() {
    //     this.fbinit()
    //         .then(
    //             () => {
    //                 try {
    //                     let a = window.fb.getCurrentGuild()
    //                     return a
    //                 } catch {
    //                     Toast.fail('请在fanbook小程序端访问')
    //                     return new Promise(() => { })
    //                 }
    //             },
    //             () => {
    //                 Toast.fail('平台内部错误请联系管理员')
    //                 return new Promise(() => { })
    //             }
    //         )
    //         .then(
    //             (v) => {
    //                 const former_guildid = localStorage.getItem('guildid')
    //                 // 同服务器登录
    //                 if (former_guildid == v.id) {
    //                     // 判断有无过期或更改登录状态
    //                     if (loginStatus() && this.state == localStorage.getItem('state')) {
    //                         // 跳过登录
    //                         if (this.state == 0) {
    //                             this.$router.push({
    //                                 path: '/front'
    //                             })
    //                         } else {
    //                             this.$router.push({
    //                                 path: '/back'
    //                             })
    //                         }

    //                     } else {
    //                         // 登录过期
    //                         localStorage.clear()
    //                         localStorage.setItem('state', this.state)
    //                         localStorage.setItem('guildid', v.id)
    //                         window.location.href = 'https://www.foodmemory.com.cn/fanbook/deliverbot/general/redirect'
    //                     }
    //                 } else {
    //                     // 不同服务器登录
    //                     localStorage.clear()
    //                     localStorage.setItem('state', this.state)
    //                     localStorage.setItem('guildid',v.id)
    //                     window.location.href = 'https://www.foodmemory.com.cn/fanbook/deliverbot/general/redirect'
    //                 }

    //             }
    //         )


    // }
    mounted(){
        localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlsZF9pZCI6NDEzMjk4NjMzNzM2MTkyMDAwLCJpZCI6NTYsImV4cCI6MTY2NzQ4MzE1MywiaWF0IjoxNjY1OTgxMTkxfQ.YaRtFGWsK44xtl4yXZ7MW6WjEREkqKiiyE2hKBXefE0')
        this.$router.replace({
            path:'/front'
        })
    }
}
</script>

<style scoped lang="less">

</style>