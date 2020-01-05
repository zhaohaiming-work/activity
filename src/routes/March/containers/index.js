import { connect } from 'react-redux'
import { updateData, add, changeLoginStatus, treeNewsReq, resetNews } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
export const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add(),
  changeLoginStatus,
  treeNewsReq,
  resetNews
}

// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.march.count,
  loginStatus:state.march.loginStatus,
  treeNews:state.march.treeNews,
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
