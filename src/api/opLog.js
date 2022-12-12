import axios from '@/libs/api.request'

export const opLogGet = (params) => {
  return axios.request({
    url: '/api/v1/subapp/devops/opLog/list/',
    method: 'get',
    params
  })
}