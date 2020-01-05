// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')

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
