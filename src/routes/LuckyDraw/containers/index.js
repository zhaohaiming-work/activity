import { connect } from 'react-redux'
import { updateData, add, userNewsReq,
   changeLoginStatus, jpcReq, changeJpc,
   actionDraw, visibleRuleModal,
   changeModalType, changeUserNews,
   changeJifen
  } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
export const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add(),
  userNewsReq: call => userNewsReq(call),
  changeLoginStatus:data => changeLoginStatus(data),
  jpcReq:data => jpcReq(data),
  changeJpc:data => changeJpc(data),
  actionDraw:data => actionDraw(data),
  visibleRuleModal:data => visibleRuleModal(data),
  changeModalType:data => changeModalType(data),
  changeUserNews:data => changeUserNews(data),
  changeJifen:data => changeJifen(data)
}

// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.luckyDraw.count,
  userNews:state.luckyDraw.userNews,
  loginStatus:state.luckyDraw.loginStatus,
  jpcList:state.luckyDraw.jpcList,
  visibleModal:state.luckyDraw.visibleModal,
  isGz:state.luckyDraw.isGz,
  userDraw:state.luckyDraw.userDraw,
  jifen:state.luckyDraw.jifen,
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
