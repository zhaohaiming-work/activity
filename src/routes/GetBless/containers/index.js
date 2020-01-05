import { connect } from 'react-redux'
import { updateData, add } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
const mapDispatchToProps = {
  updateData: (data) => updateData(data),
  add: () => add()
}

// 输入逻辑
const mapStateToProps = (state) => ({
  count: state.getBless.count
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
