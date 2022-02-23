/* eslint-disable */
import axios from '@/libs/api.request'

// 获取动态
export const getMockMenuData = () => {
  return axios.request({
    url: 'get_mock_menu_data',
    method: 'post'
  })
}
