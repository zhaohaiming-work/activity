import React from 'react'
// import Api from 'api'
// import { Modal } from 'antd-mobile'
import PropTypes from 'prop-types'
import '../bless'
import modal from 'images/bless/modal.png'

// import { judgeDevice, alertNews, isHaveApp, goLogin } from 'components/commonFun'
class HomeView extends React.Component {
  static propTypes = {
    close:PropTypes.func,
    deposit:PropTypes.any
  }
  state={
    okSkip:true,
    okStart:false
  }
  render () {
    const { close, deposit } = this.props
    return (
      <React.Fragment>
        <div className='get-bless-mask-container'>
          <div className='mask' />
          <div className='mask-body'>
            <img src={modal} alt='' />
            <div className='money'>${deposit.amount || 0} <span>本金</span></div>
            <button onClick={close}>知道了</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
