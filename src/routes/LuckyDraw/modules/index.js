import { UPDATE_DATA, ADD, USERNEWSREQ,
  LOGINSTATUS, JPCREQ, VISIBLERULEMODAL,
  CHANGEMODALTYPE, ACTIONDRAW, CHANGEJIFEN
} from './action'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGEJIFEN]: (state, action) => {
    return {
      ...state,
      jifen: action.payload
    }
  },
  [ACTIONDRAW]: (state, action) => {
    return {
      ...state,
      userDraw: action.payload
    }
  },
  [CHANGEMODALTYPE]: (state, action) => {
    return {
      ...state,
      isGz: action.payload
    }
  },
  [VISIBLERULEMODAL]: (state, action) => {
    return {
      ...state,
      visibleModal: action.payload
    }
  },
  [USERNEWSREQ]: (state, action) => {
    return {
      ...state,
      userNews: action.payload,
      jifen:action.payload.jifen
    }
  },
  [UPDATE_DATA]: (state, action) => {
    return {
      ...state,
      count: action.payload
    }
  },
  [LOGINSTATUS]: (state, action) => {
    return {
      ...state,
      loginStatus: action.payload
    }
  },
  [JPCREQ]: (state, action) => {
    return {
      ...state,
      jpcList: action.payload
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
  userNews:{},
  loginStatus:false,
  visibleModal:false,
  isGz:true,
  jifen:'',
  userDraw:{},
  jpcList:[{}, {}, {}, {}, {}, {}, {}, {}]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
