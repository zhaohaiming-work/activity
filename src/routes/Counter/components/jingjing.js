import React from 'react'
import { Button } from 'antd-mobile'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../containers'
class Counter extends React.Component {
  render () {
    console.log(this.props)
    const { addNum } = this.props
    return (
      <div>
        <h1>白晶晶：{addNum}</h1>
      </div >
    )
  }
}
Counter.propTypes = {
  addNum:propTypes.number,
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
