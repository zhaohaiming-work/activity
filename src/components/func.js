// 函数精封装
import { Toast } from 'antd-mobile'
import * as Cookies from 'js-cookie'
import createHistory from 'history/createHashHistory'
export const history = createHistory()
// 轻提示
export const alertNews = (news, time) => Toast.info(news, time || 1)
export const successAlert = (news, time) => Toast.success(news || '操作成功', time || 2)
export const failAlert = (news, time) => Toast.fail(news || '操作失败', time || 2)
export const loading = () => Toast.loading('Loading...', 300, () => { console.log('Load complete !!!') })
export const hideNews = () => Toast.hide()
// 获取url里面的参数

export const getUrlSearch = () => {
  const str = window.location.search.replace(/.{1}/, '')
  const hash = window.location.hash.replace(/#.*\?/, '')
  const urlStr = str || hash
  const arr = urlStr.split('&')
  if (urlStr) {
    const obj = {}
    arr.map(v => {
      const newArr = v.split('=')
      obj[newArr[0]] = newArr[1]
    })
    return obj
  }
  return {}
}

// 判断是否是安卓还是ios
export const isAndroid = () => {
  const { userAgent } = window.navigator
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1 // android终端或者uc浏览器
  return isAndroid === true
}

export const isIos = () => {
  const { userAgent } = window.navigator
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isiOS === true
}

// 通过地址栏拼接判断是安卓还是ios app
// const { native } = getUrlSearch()
// const judgeDevice = {
//   android:native === 'android_tophold',
//   ios:native === 'ios_tophold'
// }
// alert(judgeDevice)
// ios 的js注入口
const setupWebViewJavascriptBridge = callback => {
  // alert('苹果初始化连接')
  if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}
// 安卓的js注入口
const connectWebViewJavascriptBridge4Android = callback => {
  // alert('开始js桥接')
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady',
    function () { callback(window.WebViewJavascriptBridge) }, false
    )
  }
}
// 初始化 安卓桥接
connectWebViewJavascriptBridge4Android(function (bridge) {
  bridge.init(function (message, responseCallback) {})
})
// 初始化ios桥接
setupWebViewJavascriptBridge(function (bridge) {
  // alert('苹果第一次桥接')
  bridge.init(function (message, responseCallback) { })
})

// 处理ios的通用方法
export const hanlerIos = (config, callback) => {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('iosCallback', config, res => (callback && callback(res)))
  })
}

export const hanlerAndroid = (handle, config, callback) => {
  window.WebViewJavascriptBridge.callHandler(handle, config, res => (callback && callback(res)))
}

// 外部获取token
const getToken = (callback, config) => {
  // const { android, ios } = judgeDevice
  if (isAndroid()) {
    hanlerAndroid('token4Android', null, callback)
  } else if (isIos()) {
    hanlerIos('iosCallback', { handle:config }, callback)
  }
}

export const catchToken = (callback) => {
  let timer
  clearInterval(timer)
  // const { android, ios } = judgeDevice
  if (isAndroid() || isIos()) {
    timer = setInterval(() => {
      getToken((res) => {
        if (res) {
          clearInterval(timer)
          Cookies.set('token', res)
          callback && setImmediate(callback)
        } else {
          const token = Cookies.get('token')
          if (token) {
            clearInterval(timer)
            callback && setImmediate(callback)
            return
          }
          history.push('/login')
        }
      })
    }, 100)
  } else {
    callback && setImmediate(callback)
  }
}
