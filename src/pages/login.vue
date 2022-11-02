<template>
  <div class="main"></div>
</template>

<script>
import { login, login_back } from "@/http/api/user";
import { Dialog } from "vant";
import judgeClient from "@/utils/judgeClient";

export default {
  name: "log-in",
  props: ["code"],
  
  mounted() {
    let state = localStorage.getItem("state");
    localStorage.setItem("plantform", judgeClient());
    if (state === "1") {
      // 管理员登录
      login_back(this.code).then(
        // 登录成功进入主页
        (res) => {
          localStorage.setItem("avatar_url", res.avatar_url);
          localStorage.setItem("fanbook_nick_name", res.fanbook_nick_name);
          localStorage.setItem("token", res.jwt_token);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("lastLoginTime", new Date().getTime());

          
          if(localStorage.getItem("plantform")=='IOS'){
            this.$router.replace({
            path: '/back'
          })
          }else{
            Dialog.alert({
            title: "提示",
            message: "授权成功！请再次点击机器人命令登陆～",
          }).then(() => {
            window.fb.closeWindow();
          });
          }
        },
        // 登录失败退出
        () => {
          Dialog.alert({
            title: "登录失败",
            message: "权限不足",
          }).then(() => {
            window.fb.closeWindow();
          });
        }
      );
    } else {
      // 普通用户登陆
      login(this.code).then(
        (res) => {
          localStorage.setItem("avatar_url", res.avatar_url);
          localStorage.setItem("fanbook_nick_name", res.fanbook_nick_name);
          localStorage.setItem("token", res.jwt_token);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("lastLoginTime", new Date().getTime());
          // 得到参数后刷新页面
          if(localStorage.getItem('plantform')=='IOS'){
            this.$router.replace({
            path: '/front'
          })
          }else{
            Dialog.alert({
            title: "提示",
            message: "授权成功！请再次点击机器人命令登陆～",
          }).then(() => {
            window.fb.closeWindow();
          });
          }

        },
        () => {
          Dialog.alert({
            title: "登录失败",
            message: "请联系管理员",
          }).then(() => {
            window.fb.closeWindow();
          });
        }
      );
    }
  },
};
</script>

<style scoped lang="less">
.main {
  height: 800px;
  background: #fcf6f4;
}
</style>
