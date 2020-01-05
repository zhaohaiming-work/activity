import React from 'react'
import { Button } from 'antd-mobile'
import propTypes from 'prop-types'
import Jingjing from './jingjing'
import { connect } from 'react-redux'
import './style'
import { mapStateToProps, mapDispatchToProps } from '../containers'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
class Counter extends React.Component {
  componentDidMount () {

  }
  add=() => {
    this.props.addCount()
  }
  crop =() => {
    // image in dataUrl
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL())
  }
  render () {
    console.log(this.props)
    const { addNum } = this.props
    return (
      <div>
        <Cropper
          ref='cropper'
          src='http://n.sinaimg.cn/ent/transform/20151128/EDPn-fxmcnkr7640437.jpg'
          style={{ height: 400, width: '100%' }}
          aspectRatio={1 / 1}
          guides={false}
          crop={this.crop}
          />
      </div >
    )
  }
}
Counter.propTypes = {
  addNum:propTypes.number,
  addCount:propTypes.func,
  // match:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
