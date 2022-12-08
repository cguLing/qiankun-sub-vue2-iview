import axios from '@/libs/api.request'

export const infoGet = () => {
  return axios.request({
    url: '/api/v1/subapp/devops/home/card/analysis/',
    method: 'get'
  })
}
export const mouthGet = () => {
  return axios.request({
    url: '/api/v1/subapp/devops/home/month/analysis/',
    method: 'get'
  })
}