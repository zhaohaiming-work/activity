// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')
export const LOGINSTATUS = Symbol('更改登录状态')

// ------------------------------------
// Actions
// ------------------------------------
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
