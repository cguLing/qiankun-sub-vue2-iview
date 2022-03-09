/* eslint-disable */
import axios from '@/libs/axios'

// 获取动态
export const getMockMenuData = () => {
  return axios.request({
    url: 'get_mock_menu_data',
    method: 'post'
  })
}
