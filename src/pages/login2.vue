<template>
    <div class="main" :style="{height:h+'px'}">
        <div class="head">登录界面</div>
        <div class="btn" >
            <div class="customer" @click="handdlecommand" ref="btn"><button>点击登录</button></div>
        </div>

    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { login, login_back } from '@/http/api/user'
import loginStatus from '@/utils/loginStatus'
export default {
    name: 'log-in2',
    props: ['state'],
    methods: {
        command1() {
            window.fb.init({
                success: () => {
                    window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then(
                        (res) => {
                            console.log(res);
                            login(localStorage.getItem('code')).then(
                                (res) => {
                                    if (res.avatar_url) {
                                        localStorage.setItem('avatar_url', res.avatar_url)
                                        localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
                                        localStorage.setItem('token', res.jwt_token)
                                        localStorage.setItem('user_id', res.user_id)
                                    }
                                }
                            )
                            setTimeout(() => {

                                if (localStorage.getItem('token')) {
                                    localStorage.setItem('id', "customer")
                                    this.$router.push({
                                        path: '/front'
                                    })
                                } else {
                                    Dialog({ message: '授权失败' });
                                }
                            }, 4000)
                        },
                    )
                }
            });
        },
        command2() {

            window.fb.init({
                success: () => {
                    window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then(
                        (res) => {
                            let code = res.data.code
                            Toast(code)
                            login_back(localStorage.getItem('code')).then(
                                (res) => {
                                    if (res.avatar_url) {
                                        localStorage.setItem('avatar_url', res.avatar_url)
                                        localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
                                        localStorage.setItem('token', res.jwt_token)
                                        localStorage.setItem('user_id', res.user_id)
                                    }
                                }
                            )
                            setTimeout(() => {
                                if (localStorage.getItem('token')) {
                                    localStorage.setItem('id', "operator")
                                    this.$router.push({
                                        path: '/back'
                                    })
                                } else {
                                    Dialog({ message: '权限不足' });
                                }
                            }, 2000)
                        },
                    )
                }
            });
        },

        handdlecommand() {
            if (this.state == '0') {
                this.command1()
            }
            else if (this.state == '1') {
                this.command2()
            }
        },
    },
    data() {
        return {
            h: document.body.clientHeight
        }
    },
    mounted() {
        console.log(loginStatus());
        // 判断有无过期或更改登录状态
        if(loginStatus()&&this.state == localStorage.getItem('state')){
        // 跳过登录
            if (this.state==0) {
                this.$router.push({
                    path: '/front'
                })
            } else {
                this.$router.push({
                    path: '/back'
                })
            }

    }else{
        localStorage.clear()
        localStorage.setItem('state', this.state)
    }
}}
</script>

<style scoped lang="less">
.main {
    background-color: #fcf6f4;

    .head {
        width: 100px;
        height: 50px;
        font-size: 22px;
        font-weight: 600;
        margin: 25px auto;
        margin-top: 0;
        line-height: 50px;
    }

    .btn {
        margin-top: 200px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .customer {

            button {
                width: 150px;
                height: 50px;
                background-color: orange;
                border-radius: 10px;
                font-size: 18px;
            }
        }
    }
}
</style>