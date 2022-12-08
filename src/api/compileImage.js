import axios from '@/libs/api.request'

export const compileImageGet = (params) => {
  return axios.request({
    url: '/api/v1/subapp/devops/compileImage/list/',
    method: 'get',
    params
  })
}