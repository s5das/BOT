<template>
  <div></div>
</template>

<script>
import loginStatus from "@/utils/loginStatus";
import { Toast } from "vant";
export default {
  name: "log-in2",
  props: ["state"],
  methods: {
    fbinit() {
      return new Promise((resolve) => {
        window.fb.init({
          success: () => {
            resolve("initsuccess");
          },
        });
      });
    },
  },
  data() {
    return {
      h: document.body.clientHeight,
    };
  },
  mounted() {
    const router = this.$router
    this.fbinit()
      .then(
        () => {
          try {
            let a = window.fb.getCurrentGuild();
            return a;
          } catch {
            Toast.fail("请在fanbook小程序端访问");
            return new Promise(() => {});
          }
        },
        () => {
          Toast.fail("平台内部错误请联系管理员");
          return new Promise(() => {});
        }
      )
      .then((v) => {
        const former_guildid = localStorage.getItem("guildid");
        // 同服务器登录

        if (former_guildid == v.id) {
          // 判断有无过期或更改登录状态
          if (loginStatus() && this.state == localStorage.getItem("state")) {
            // 跳过登录
            if (this.state == 0) {
                router.replace({
                path: "/front",
              });
            } else {
                router.replace({
                path: "/back",
              });
            }
          } else {
            // 登录过期
            localStorage.clear();
            localStorage.setItem("state", this.state);
            localStorage.setItem("guildid", v.id);
            window.fb
              .oAuth({
                oAuthUrl:
                  "https://www.gzxunyustf.top/fanbook/deliverbot/general/redirect",
              })
              .then(function (res) {
                if (res.data && res.data.code) {
                    router.replace(
                    {
                        path:'/login',
                        query:{
                            code:decodeURIComponent(res.data.code)
                        }
                    }
                  )
                } else {
                  Toast.fail('登录失败')
                }
              });
          }
        } else {
          // 不同服务器登录
          localStorage.clear();
          localStorage.setItem("state", this.state);
          localStorage.setItem("guildid", v.id);
          window.fb.oAuth({
            oAuthUrl:
              "https://www.gzxunyustf.top/fanbook/deliverbot/general/redirect",
          })
          .then(function (res) {
                if (res.data && res.data.code) {
                  router.replace(
                    {
                        path:'/login',
                        query:{
                            code:decodeURIComponent(res.data.code)
                        }
                    }
                  )
                } else {
                    Toast.fail('登录失败')
                }
              });
        }
      });
  },
};
</script>

<style scoped lang="less"></style>
