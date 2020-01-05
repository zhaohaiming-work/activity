// import React from 'react'
import { Toast, Modal } from 'antd-mobile'
import * as Cookies from 'js-cookie'
import createHistory from 'history/createHashHistory'
import Api from 'api'
import Loadable from 'react-loadable'
import Loading from 'components/Loading'
import { injectReducer } from 'store/reducers'
const alertMod = Modal.alert
export const history = createHistory()
// -------------------------
// 定义全局变量token
let token = ''
// 轻提示
export const alertNews = (news, time) => Toast.info(news, time || 1)
export const successAlert = (news, time) => Toast.success(news || '操作成功', time || 2)
export const failAlert = (news, time) => Toast.fail(news || '操作失败', time || 2)
export const loading = () => Toast.loading('Loading...', 30, () => { console.log('Load complete !!!') })
export const hideNews = () => Toast.hide()
export const goLogin = (url) => {
  alertMod('提示', '您需要登录', [
    { text: '取消', onPress: () => null },
    { text: '确定', onPress: () => history.push(url || '/login/double-tw') },
  ])
}
// 代码拆分
export const Loader = im => Loadable({
  loader: () => im,
  loading: Loading
})
// 路由级别的拆分
export const pageRouter = (red, key, im) => {
  return (store) => {
    const reducer = red.default
    injectReducer(store, { key, reducer })
    return Loader(im)
  }
}
// 判断设备是安卓还是苹果
const ua = navigator.userAgent.toLowerCase() // 获取浏览器标识并转换为小写
const isPC = () => {
  const Agents = ['android', 'iphone', 'symbianOS', 'windows phone', 'ipad', 'ipod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (ua.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export const curConfig = {
  isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // 是否苹果
  isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1, // 是否安卓
  isPC: isPC(), // 是否PC
  isWeiXin: ua.match(/MicroMessenger/i) == 'micromessenger', // 是否微信
  isQQ: ua.indexOf(' qq/') > -1, // 是否QQ
  isApp: ua.indexOf('isApp') > -1, //是否某个应用
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
// ios
export function setupWebViewJavascriptBridge (callback) {
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

//  * 安卓js注入的入口
export function connectWebViewJavascriptBridge4Android (callback) {
  // alert('开始js桥接')
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          callback(window.WebViewJavascriptBridge)
        },
        false
    )
  }
}

//  * js给native发信息：返回键。只有帮助中心首页的返回键调用这个方法

export function back4Android () {
  window.WebViewJavascriptBridge.callHandler(
      // 这个submitFromWeb是native接收的方法
      'back4Android'
      , null
      , function (responseData) {}
  )
}
// 最新判断ios和安卓的方法
export const judgeDevice = {
  newJudgeAndroidApp:ua.indexOf('androidtophold') > -1,
  newJudgeIosApp:ua.indexOf('iostophold') > -1
}
// 获取token的方法
const getToken = (callback, config) => {
  // console.log(999)
  if (isAndroid()) {
    window.WebViewJavascriptBridge.callHandler(
      'token4Android'
      , null
      , res => {
        // token = res
        callback && callback(res)
      }
    )
  } else if (isIos()) {
    // alert('事件响应')
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('iosCallback', { handle:config }, res => {
        // alert(res)
        // token = res
        callback && callback(res)
      })
    })
  }
}
export const catchToken = (callback) => {
  let timer
  clearInterval(timer)
  if (curConfig.isAndroid || curConfig.isiOS) {
    timer = setInterval(() => {
      // alert('是从app里面打开的吧')
      getToken((res) => {
        if (res) {
          // alert(res)
          Cookies.set('token', res)
          const { location } = window
          const { hash } = location
          const ts = hash.replace(/#\//, '').replace(/\?.*/, '')
          if (ts === 'clear-markets') {
            Api.getJavaToken({
              'X-Access-Token':res
            })
            .then(re => {
              Cookies.set('Authorization', re.th_token)
              callback && setImmediate(callback)
              clearInterval(timer)
            })
            return
          }
          callback && setImmediate(callback)
          clearInterval(timer)
        } else {
          // alert('res为空')
          const token = Cookies.get('token')
          if (token) {
            callback && setImmediate(callback)
            clearInterval(timer)
          } else {
            const { location } = window
            const { hash } = location
            const ts = hash.replace(/#\//, '').replace(/\?.*/, '')
            switch (ts) {
              case 'double-ele':
              case 'double-tw':
                return
              default:
            }
            history.push(`/login/trade-gift`)
          }
        }
      })
    }, 100)
  } else {
    // alert('app外部打开的')
    callback && setImmediate(callback)
  }
}

// 获取token的方法
const newGetToken = (callback, config) => {
  const { newJudgeAndroidApp, newJudgeIosApp } = judgeDevice
  // console.log(999)
  if (newJudgeAndroidApp) {
    window.WebViewJavascriptBridge.callHandler(
      'token4Android'
      , null
      , res => {
        // token = res
        callback && callback(res)
      }
    )
  } else if (newJudgeIosApp) {
    // alert('事件响应')
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('iosCallback', { handle:config }, res => {
        // alert(res)
        // token = res
        callback && callback(res)
      })
    })
  }
}
export const newCatchToken = (callback, noTokenCallback) => {
  const { newJudgeAndroidApp, newJudgeIosApp } = judgeDevice
  let timer
  clearInterval(timer)
  if (newJudgeAndroidApp || newJudgeIosApp) {
    timer = setInterval(() => {
      // alert('是从app里面打开的吧')
      newGetToken((res) => {
        clearInterval(timer)
        if (res) {
          // alert(res)
          Cookies.set('token', res)
          callback && setImmediate(callback)
        } else {
          // alert('res为空')
          const token = Cookies.get('token')
          if (token) {
            callback && setImmediate(callback)
          } else {
            noTokenCallback ? noTokenCallback() : goLogin()
          }
        }
      })
    }, 100)
  } else {
    // alert('app外部打开的')
    callback && setImmediate(callback)
  }
}
/**
 * js给native发信息：打开"在线客服"
 */
export function onlineService4Android () {
  window.WebViewJavascriptBridge.callHandler(
      'onlineService4Android'
      , 'back'
      , function (responseData) {}
  )
}

// 处理ios的通用跳转
export const hanlerIos = (config, callback) => {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('iosCallback', { handle:config }, function responseCallback (responseData) {
      callback && callback(responseData)
    })
  })
}
/**
 * js给native发信息：打开指定动画。注意：xxx为动态id
 *
 */
export function guideId4Android (type, callback) {
  if (isAndroid()) {
    // 安卓的
    window.WebViewJavascriptBridge.callHandler(
      'guideId4Android'
      , type
      , res => {}
    )
  } else {
    hanlerIos(type, callback)
  }
}

// 好友邀请的接口 分享按钮的网桥
export const shareWeb = (config, callback) => {
  // alert('函数开始执行')
  if (isAndroid()) {
    window.WebViewJavascriptBridge.callHandler(
    'share4Android'
    , config
    , res => {
      callback && callback(res)
    }
  )
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('iosCallback', { handle:'share', url:config }, res => {
        // alert(res)
        callback && callback(res)
      })
    })
  }
}

// 打开交易记录
export const orderRecorder = (config = null, callback) => {
  // alert('函数开始执行')
  window.WebViewJavascriptBridge.callHandler(
    'tradeVol4Android'
    , config
    , res => {
      callback && callback(res)
    }
  )
}
// 获取url里面的参数

export const getUrlSearch = () => {
  const str = window.location.search.replace(/.{1}/, '')
  const arr = str.split('&')
  if (str) {
    const obj = {}
    arr.map(v => {
      const newArr = v.split('=')
      obj[newArr[0]] = newArr[1]
    })
    return obj
  }
  return {}
}
export const getUrlParameter = () => {
  const str = decodeURI(window.location.hash)
  const num = str.indexOf('?')
  const strs = str.substr(num + 1)
  const arr = strs.split('&')
  if (strs) {
    const obj = {}
    arr.map(v => {
      const newArr = v.split('=')
      obj[newArr[0]] = newArr[1]
    })
    return obj
  }
  return {}
}
// 跳转到app
export const isHaveApp = (router) => {
  let clickedAt = +new Date()
  var ua = window.navigator.userAgent.toLowerCase()
  // 微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tophold.xcfd&amp;g_f=991653'
  } else { // 非微信浏览器
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      window.setTimeout(() => {
        if (+new Date() - clickedAt < 3000) {
          window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tophold.xcfd&amp;g_f=991653'
        }
      }, 1500)
      window.location = (router || 'tophold://tophold.app/')
    } else if (navigator.userAgent.match(/android/i)) {
      window.location = (router || 'tophold://tophold.app/')
      setTimeout(() => {
        if (+new Date() - clickedAt < 3000) {
          window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tophold.xcfd&amp;g_f=991653'
        }
      }, 2000)
    }
  }
}

export default token
