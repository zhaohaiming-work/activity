import { connect } from 'react-redux'
import { updateData, add, myRecordReq,
  readyGetRedPacketsReq, changeLoginStatus
 } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
export const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add(),
  myRecordReq:callback => myRecordReq(callback),
  readyGetRedPacketsReq,
  changeLoginStatus
}

// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.febAct.count,
  myRecordList:state.febAct.myRecordList,
  redRecordNews:state.febAct.redRecordNews,
  loginStatus:state.febAct.loginStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
