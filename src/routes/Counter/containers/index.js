import { connect } from 'react-redux'
import { updateData, add, addCount } from '../modules/action'

import PageContainer from '../components'

// 输入逻辑
export const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add(),
  addCount,
}

// 输出逻辑
export const mapStateToProps = (state) => ({
  count: state.counter.count,
  addNum:state.counter.addNum
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
