import { UPDATE_DATA, ADD,
   MYRECORDLIST,
   READYGETREDPACKETS, LOGINSTATUS
  } from './action'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGINSTATUS]: (state, action) => {
    return {
      ...state,
      loginStatus:action.payload
    }
  },
  [READYGETREDPACKETS]: (state, action) => {
    return {
      ...state,
      redRecordNews: action.payload
    }
  },
  [MYRECORDLIST]: (state, action) => {
    return {
      ...state,
      myRecordList: action.payload
    }
  },
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
  count: 0,
  loginStatus:false,
  redRecordNews:{},
  myRecordList:[]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
