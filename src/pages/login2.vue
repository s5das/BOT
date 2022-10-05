<template>
<div></div>
</template>

<script>
import loginStatus from '@/utils/loginStatus'
export default {
    name: 'log-in2',
    props: ['state'],
    methods: {
        command1() {
            window.fb.init({
                success: () => {

                    window.fb.getCurrentGuild()
                        .then((v) => {
                            localStorage.setItem('guildid', v.id)
                        })
                        .then(
                            () => {
                                window.location.href = 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect'
                            },
                        )
                     
                    //浏览器调试代码
                    // .then(
                    //     (res) => {
                    //         let code = res.data.code
                    //         Toast(code)
                    //         login_back(localStorage.getItem('code')).then(
                    //             (res) => {
                    //                 if (res.avatar_url) {
                    //                     localStorage.setItem('avatar_url', res.avatar_url)
                    //                     localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
                    //                     localStorage.setItem('token', res.jwt_token)
                    //                     localStorage.setItem('user_id', res.user_id)
                    //                 }
                    //             }
                    //         )
                    //         setTimeout(() => {
                    //             if (localStorage.getItem('token')) {
                    //                 localStorage.setItem('id', "operator")
                    //                 this.$router.push({
                    //                     path: '/back'
                    //                 })
                    //             } else {
                    //                 Dialog({ message: '权限不足' });
                    //             }
                    //         }, 2000)
                    // },
                    // )
                }
            });
        },
    },
    data() {
        return {
            h: document.body.clientHeight
        }
    },
    mounted() {
        
        // 判断有无过期或更改登录状态
        if (loginStatus() && this.state == localStorage.getItem('state')) {
            // 跳过登录
            if (this.state == 0) {
                this.$router.push({
                    path: '/front'
                })
            } else {
                this.$router.push({
                    path: '/back'
                })
            }

        } else {
            localStorage.clear()
            localStorage.setItem('state', this.state)
            this.command1()
        }
    }
}
</script>

<style scoped lang="less">

</style>