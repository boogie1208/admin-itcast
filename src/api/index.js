import axios from 'axios'
const baseURL='http://localhost:8888/api/private/v1'
//设置axios全局请求根路径
axios.defaults.baseURL=baseURL
// axios.proprety.$http
//登录验证
export const checkUser=params=>{
  return axios.post('login',params).then(res=>res.data)
}