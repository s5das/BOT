<template>
  <div class="main">
    <div class="head">登录界面</div>
    <div class="btn">
    <div class="customer" @click="handdlecommand" ref="btn"><button>点击登录</button></div>
    </div>

  </div>
</template>

<script>
import { Dialog} from 'vant';
import {login,login_back} from '@/http/api/user'
export default {
    name: 'log-in2',
    props:['state'],
    methods: {
        command1() {
            window.fb.init({
                success: () => {
                    window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then(
                        () => {
                            login(localStorage.getItem('code')).then(
                                (res) => {
                                    if (res.data.avatar_url) {
                                        localStorage.setItem('avatar_url', res.data.avatar_url)
                                        localStorage.setItem('fanbook_nick_name', res.data.fanbook_nick_name)
                                        localStorage.setItem('token', res.data.jwt_token)
                                        localStorage.setItem('user_id', res.data.user_id)                    
                                    }
                                }
                             )
                            setTimeout(() => {
                            
                            if (localStorage.getItem('token')) {
                                localStorage.setItem('id',"customer")
                                this.$router.replace({
                                    path:'/front'
                                })
                            } else {
                                Dialog({ message: '授权失败' });
                            }
                           },4000)
                        },
                    )
                            }
                        });
        },
        command2() {

            window.fb.init({
                success: () => {
                    window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then(
                        () => {
                            console.log(111);
                            login_back(localStorage.getItem('code')).then(
                                (res) => {
                                    if (res.data.avatar_url) {
                                        localStorage.setItem('avatar_url', res.data.avatar_url)
                                        localStorage.setItem('fanbook_nick_name', res.data.fanbook_nick_name)
                                        localStorage.setItem('token', res.data.jwt_token)
                                        localStorage.setItem('user_id', res.data.user_id)                    
                                    }
                                }
                             )
                            setTimeout(() => {
                            if (localStorage.getItem('token')) {
                                localStorage.setItem('id',"operator")
                                this.$router.replace({
                                    path:'/back'
                                })
                            } else {
                                Dialog({ message: '权限不足' });
                            }
                           },2000)
                        },
                    )
                            }
                        });
        },
            
    handdlecommand() {
        if (this.state == '0') {
            this.command1()
        }
        else if(this.state=='1') {
            this.command2()
            }        
        },
    },
    
    mounted() {
        
        let tempid = localStorage.getItem('id')
        if (tempid) {
            if (tempid === 'customer') {
                this.$router.replace({
                    path:'/front'
                })
            } else {
                this.$router.replace({
                    path:'/back'
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.main{
    height: 900px;
    background: url('@/assets/bg1.png');
    .head{
     width: 100px;
     height: 50px;
     font-size: 22px;
     font-weight: 600;
     margin: 25px auto;
     margin-top: 0;
     line-height: 50px;
}
    .btn{
        margin-top: 200px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .customer{

            button{
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