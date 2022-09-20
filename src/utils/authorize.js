// import { login } from '@/http/api/user'
// 登录并缓存得到的结果
export default function authorize() {
    window.fb.init({
        success: () => {
            window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then( (res)=> {
                if (res.data && res.data.code) {
                    // login(res.data.code).then(
                    //     (res) => {
                    //         localStorage.setItem('avatar_url', res.avatar_url)
                    //         localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
                    //         localStorage.setItem('token', res.jwt_token)
                    //         localStorage.setItem('user_id', res.user_id)
                    //     }
                    // )
                    console.log(res);
                } else {
                    alert(res['errMsg']);
                }
            },(err)=>{console.log(err);location.reload()});
        }
    });
}  