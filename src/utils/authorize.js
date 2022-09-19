import { login } from '@/http/api/user'
// 登录并缓存得到的结果
export default function authorize() {
    window.fb.init({
        success: () => {
            window.fb.oAuth({ 'oAuthUrl': 'http://192.168.113.90:8080/redirect' }).then(function (res) {
                if (res.data && res.data.code) {
                    login(res.data.code).then(
                        (res) => {
                            localStorage.setItem('avatar_url', res.avatar_url)
                            localStorage.setItem('fanbook_nick_name', res.fanbook_nick_name)
                            localStorage.setItem('jwt_token', res.jwt_token)
                            localStorage.setItem('user_id', res.user_id)
                        }
                    )
                } else {
                    alert(res['errMsg']);
                }
            });
        }
    });
}  