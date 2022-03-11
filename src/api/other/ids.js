
import axios from '@/libs/api.request'
// 用户信息
export const userinfoGet = () => {
  return axios.request({
    url: '/auth/realms/sso/openid-rest/userinfo',
    method: 'get'
  })
}