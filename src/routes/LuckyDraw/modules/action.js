// ------------------------------------
// Constants
// ------------------------------------
import Api from 'api'
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')
export const USERNEWSREQ = Symbol('用户信息获取')
export const LOGINSTATUS = Symbol('更改登录状态')
export const JPCREQ = Symbol('奖品池请求')
export const CHANGEJPC = Symbol('改变奖品池的数据-action')
export const ACTIONDRAW = Symbol('点击抽奖-action')
export const VISIBLERULEMODAL = Symbol('显示和隐藏规则和我的奖品弹窗')
export const CHANGEMODALTYPE = Symbol('改变弹窗的状态是规则还是我的奖品')
export const CHANGEJIFEN = Symbol('改变积分')

// ------------------------------------
// Actions
// ------------------------------------
export function changeJifen (data) {
  return {
    type:CHANGEJIFEN,
    payload:data
  }
}
export function changeModalType (data) {
  return {
    type:CHANGEMODALTYPE,
    payload:data
  }
}
export function visibleRuleModal (data) {
  return {
    type:VISIBLERULEMODAL,
    payload:data
  }
}
export const actionDraw = (callback) => (dispatch, getState) => {
  Api.newPointsLucky()
  .then(res => {
    callback && callback(res.lucky_draw_user || {})
    dispatch({
      type:ACTIONDRAW,
      payload:res.lucky_draw_user || {}
    })
  })
}
export function changeJpc (data) {
  return {
    type:JPCREQ,
    payload:data
  }
}

export const jpcReq = (callback) => (dispatch, getState) => {
  Api.luckyDrawJpc()
  .then(res => {
    localStorage.setItem('jpcList', JSON.stringify(res.lucky_draw_items || []))
    dispatch({
      type:JPCREQ,
      payload:(res.lucky_draw_items || []).map((v, i) => {
        v.active = false
        v.index = i
        return v
      })
    })
  })
  .catch(callback)
}
export const changeUserNews = (data) => {
  return {
    type:USERNEWSREQ,
    payload:data
  }
}
export const userNewsReq = (callback) => (dispatch, getState) => {
  Api.getLoginUserNews()
  .then(res => {
    dispatch({
      type:USERNEWSREQ,
      payload:res.user || {}
    })
  })
  .catch(callback)
}
export function changeLoginStatus (data) {
  return {
    type:LOGINSTATUS,
    payload:data
  }
}
export function add () {
  return {
    type:ADD
  }
}
export function updateData (data = 0) {
  return {
    type:UPDATE_DATA,
    payload:data
  }
}
