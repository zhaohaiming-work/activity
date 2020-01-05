// ------------------------------------
// Constants
// ------------------------------------
import Api from 'api'
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')
export const LOGINSTATUS = Symbol('更改登录状态')
export const TRENEWSREQ = Symbol('植树节的信息')
export const RESETNEWS = Symbol('重置信息')

// ------------------------------------
// Actions
// ------------------------------------
export function resetNews () {
  return {
    type:RESETNEWS,
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
export function changeLoginStatus (data) {
  return {
    type:LOGINSTATUS,
    payload:data
  }
}
export const treeNewsReq = (callback) => (dispatch, getState) => {
  Api.marchTreeNews()
  .then(res => {
    dispatch({
      type:TRENEWSREQ,
      payload:res || {}
    })
  })
  .catch(callback)
}
