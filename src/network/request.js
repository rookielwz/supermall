import axios from 'axios'

export function request (config) {
  // 1.创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 2.axios 的拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 返回一个Promise
  return instance(config)
}
