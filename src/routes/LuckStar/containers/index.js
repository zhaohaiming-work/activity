import { connect } from 'react-redux'
import { updateData, add, yibu } from '../modules/action'

import PageContainer from '../components'

// 输出逻辑
export const mapDispatchToProps = {

  updateData: (data) => updateData(data),
  add: () => add(),
  yibu: () => yibu()
}

// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.demo.count,
  num:state.demo.num,
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
