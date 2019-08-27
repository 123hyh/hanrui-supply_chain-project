import axios from 'axios'
let isProd = process.env.NODE_ENV != 'development'
import router from '@/router/index.js'
/**
 * @method splitDate 截取日期 年-月-日
 * @param { tableData } Array 列表数组
 * @param { keyArr } Array 字段数组
 */
const whiteList = function(dataTab, keyArr) {
  dataTab instanceof Array &&
    dataTab.map((e, i) => {
      keyArr.map(key => {
        e[key] &&
          (e[key] = e[key].includes(' ') ? e[key].split(' ')[0] : e[key])
      })
    })
}
/**
 * @params /apis 生产环境url
 * @params /service 开发环境url
 */
let instance = axios.create({
  baseURL: isProd ? '/apis' : '/service'
})
instance.interceptors.request.use(config => {
  return config
})

instance.interceptors.response.use(
  response => {
    let {
      data,
      status,
      headers: { 'x-auth-token': token }
    } = response
    return {
      data,
      status,
      token
    }
  },
  ({ response: { status, data } } = err) => {
    switch (status) {
      case 403:
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 400:
        return Promise.reject({
          status,
          message: data
        })
      case 401:
        return Promise.reject({
          status,
          message: data
        })
      case 500:
        return Promise.reject({
          status,
          message: data
        })
    }
  }
)
export { instance, isProd }
