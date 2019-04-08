import axios from 'axios'
const baseURL='http://localhost:8888/api/private/v1'
//设置axios全局请求根路径
axios.defaults.baseURL=baseURL
//添加请求拦截器
axios.interceptors.request.use(function (config){
  //将token给到一个前后台约定好的key中，作为请求发送
  let token=localStorage.getItem('mytoken')
  if(token){
    config.headers['Autnorization']=token
  }
  return config;
},function(error){
  return Promise.reject(error);
})
// axios.proprety.$http
//登录验证
export const checkUser=params=>{
  return axios.post('login',params).then(res=>res.data)
}