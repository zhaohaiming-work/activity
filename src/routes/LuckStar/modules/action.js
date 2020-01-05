// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DATA = Symbol('update-data')// Symbol创建
export const ADD = Symbol('add')
export const AA = Symbol('创建')
// ------------------------------------
// Actions
// ------------------------------------
// 异步的函数

export const yibu = () => (dispatch, getState) => {
  setTimeout(() => {
    console.log('111')
    dispatch({
      type:ADD,
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
