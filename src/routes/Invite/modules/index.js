import { UPDATE_DATA, ADD } from './action'

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
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
