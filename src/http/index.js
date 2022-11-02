import axios from "axios";
import { Toast } from "vant";
import serverConfig from "./config";
import router from "@/model/router";

// 创建axios实例
const serviceAxios = axios.create({
    baseURL: serverConfig.baseURL,
    timeout: serverConfig.timeout,
});


// 请求拦截
serviceAxios.interceptors.request.use(
    (config) => {
        // 业务逻辑

        // 如果开启token认证
        if(serverConfig.useTokenAuthorization) {
            config.headers["Authorization"] =   localStorage.getItem("token");
        } 

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// 响应拦截
serviceAxios.interceptors.response.use(
  (res) => {
        let data = res.data;
        // 处理自己的业务逻辑，比如判断 token 是否过期等等
        // 代码块
        if(res.data.code==1016){
          try{
            if(window.location.href.indexOf('front')!==-1){
              localStorage.clear()
              router.replace({
                path:'/',
                query:{
                  state:0
                }
              })
            }else{
              localStorage.clear()
              router.replace({
                path:'/',
                query:{
                  state:1
                }
              })
            }
          }
          catch{
            localStorage.clear()
            router.replace({
              path:'/',
              query:{
                state:0
              }
            })
          }

          
        }
        else if (res.data.code !== 0) {
          Toast(data.data)
          return Promise.reject(new Error(data.data))
        }
        // console.log(data.data)
        return data.data;
    },
    (error) => {
        let message = "";
        if (error && error.response) {
          switch (error.response.status) {
            case 302:
              message = "接口重定向了！";
              break;
            case 400:
              message = "参数不正确！";
              break;
            case 401:
              message = "您未登录，或者登录已经超时，请先登录！";
              break;
            case 403:
              message = "您没有权限操作！";
              break;
            case 404:
              message = `请求地址出错: ${error.response.config.url}`;
              break;
            case 408:
              message = "请求超时！";
              break;
            case 409:
              message = "系统已存在相同数据！";
              break;
            case 500:
              message = "服务器内部错误！";
              break;
            case 501:
              message = "服务未实现！";
              break;
            case 502:
              message = "网关错误！";
              break;
            case 503:
              message = "服务不可用！";
              break;
            case 504:
              message = "服务暂时无法访问，请稍后再试！";
              break;
            case 505:
              message = "HTTP 版本不受支持！";
              break;
            default:
              message = "异常问题，请联系管理员！";
              break;
          }
          Toast('请求失败')
        }
        return Promise.reject(message);
    }
)

export default serviceAxios;