import axios from 'axios'
import login from './login'
import tradeGift from './tradeGift'
import shareOrders from './shareOrder'
import market from './market'
import luckyDraw from './luckyDraw'
import trade from './trade'
import * as Cookies from 'js-cookie'
// 实例化 ajax请求对象
import { loading, hideNews, alertNews } from 'components/commonFun'
import host from './host'
import myTrade from './myTrade'
import noFarmers from './notFarmers'
import verfily from './verfily'
import dayGuess from './dayGuess'
const baseURL = host.baseUrl
let storeReq = []
const xhr = (url = baseURL) => {
  const ajaxinstance = axios.create({
    baseURL:url,
    timeout: 30000,
    headers: {
      responseType: 'json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  // 添加拦截器，处理 公用请求参数，和通用请求头部
  ajaxinstance
    .interceptors
    .request
    .use((config) => {
      loading()
      let javaToken = (Cookies.get('Authorization') || '').replace(/"/g, '')
      const token = (Cookies.get('token') || '').replace(/"/g, '')
      storeReq.push('小美女')
      config.headers['X-Access-Token'] = token
      config.headers['Authorization'] = `Bearer ${javaToken}`
      return config
    }, (error) => {
      storeReq.length = 0
      hideNews()
      return Promise.reject(error)
    })
  // 请求响应拦截器
  ajaxinstance
    .interceptors
    .response
    .use((response) => {
      // console.log(response)
      storeReq.shift()
      !storeReq.length && hideNews()
      const { data } = response
      data.headers = response.headers
      // TODO
      return data
    }, (err) => {
      storeReq.length = 0
      hideNews()
      const { response = {} } = err
      const { data = {}, status } = response
      // console.log(response)
      const { error } = data
      // console.log(response)
      if (+status !== 401) {
        alertNews(error)
      }
      return Promise.reject(response)
    })
  return ajaxinstance
}

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...login(xhr()),
  ...tradeGift(xhr()),
  ...shareOrders(xhr()),
  ...market(xhr),
  ...luckyDraw(xhr),
  ...trade(xhr),
  ...myTrade(xhr),
  ...noFarmers(xhr),
  // ...cm(xhr),
  ...verfily(xhr),
  ...dayGuess(xhr),
  // ...wonderful(xhr)
}
window.ar = xhr()
export default API
