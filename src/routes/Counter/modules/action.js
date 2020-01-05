// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')
export const ADDCOUNT = Symbol('创建一个action')
// ------------------------------------
// Actions
// ------------------------------------
// 异步的action  ++ 累计加数

export const addCount = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({
      type:ADDCOUNT,
      payload:999
    })
  })
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
