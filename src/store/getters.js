// import { models } from '@/settings';

const getters = {
  // menuList: state => state.app.menuList,
  
  username: state => state.user.username,
  employeeName: state => state.user.employeeName,
  avatar: state => state.user.avatar,
  // [models.projects]: (state) => state[models.projects],

}
export default getters
