// ------------------------------------
// Constants
// ------------------------------------
import Api from 'api'
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')
export const MYRECORDLIST = Symbol('我的红包记录的数据请求')
export const READYGETREDPACKETS = Symbol('2019迎新春抽红包数据')
export const LOGINSTATUS = Symbol('登录状态')

// ------------------------------------
// Actions
// ------------------------------------
export function changeLoginStatus (data) {
  return {
    type:LOGINSTATUS,
    payload:data
  }
}
export const readyGetRedPacketsReq = (callback) => (dispatch, getState) => {
  Api.readyGetRedPackets()
  .then(res => {
    dispatch({
      type:READYGETREDPACKETS,
      payload:res || {}
    })
  })
  .catch(callback)
}
export const myRecordReq = (callback) => (dispatch, getState) => {
  Api.myRedPacketsRecord({ page:1, per_page:200 })
  .then(res => {
    dispatch({
      type:MYRECORDLIST,
      payload:res.lucky_draw_users || []
    })
  })
  .catch(callback)
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
