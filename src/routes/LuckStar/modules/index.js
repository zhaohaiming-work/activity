import { UPDATE_DATA, ADD, AA } from './action'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_DATA]: (state, action) => {
    return {
      ...state,
      count: action.payload
    }
  },
  [ADD]: (state, action) => {
    const add = state.count
    return {
      ...state,
      count: add + 1
    }
  },
  // [AA]: (state, action) => {
  //   const add = state.num
  //   console.log(add)
  //   return {
  //     ...state,
  //     num: add + 1
  //   }
  // }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0,
  num:1
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
