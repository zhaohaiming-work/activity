import { connect } from 'react-redux'
import { updateData, add, changeLoginStatus } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
export const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add(),
  changeLoginStatus
}

// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.dayGuess.count,
  loginStatus:state.dayGuess.loginStatus,
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
