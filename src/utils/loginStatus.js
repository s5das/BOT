/**
 * 检测登录状态有效性
 * @returns {boolean}
 */
export default function loginStatus(){
  const expire = localStorage.getItem('lastLoginTime')
  const current = new Date().getTime()
  const change = 1000 * 60 * 60 * 12 - 60 * 1000
  const token = window.localStorage.getItem('token')
  return token && expire && current - parseInt(expire) < change
}
