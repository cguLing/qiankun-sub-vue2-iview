import axios from '@/libs/api.request'

export const infoGet = () => {
  return axios.request({
    url: '/api/v1/subapp/devops/home/card/analysis/',
    method: 'get'
  })
}