import React from 'react'
import { connect } from 'react-redux'
import '../huodong.scss'
 // import { history } from 'func'
// import PropTypes from 'prop-types'// 校验
import { mapStateToProps, mapDispatchToProps } from '../../containers'

class App extends React.Component {
  render () {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>{ this.props.count }</h1>
        <button onClick={this.props.yibu}>
          点击
        </button>
      </React.Fragment>
    )
  }
}

// Add.propTypes = {
//   name:PropTypes.string,
//   output:PropTypes.function
// }
// props传值组建与组建之间得唯一的桥梁,组建的属性就是这个组建得props

export default connect(mapStateToProps, mapDispatchToProps)(App)
