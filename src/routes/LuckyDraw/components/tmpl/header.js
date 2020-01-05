import React from 'react'
import { connect } from 'react-redux'
import * as Cookies from 'js-cookie'
import PropTypes from 'prop-types'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { newCatchToken } from 'func'
import MyDrawModal from './myDrawModal'
class App extends React.Component {
  static propTypes={
    userNewsReq:PropTypes.func,
    changeLoginStatus:PropTypes.func,
    visibleRuleModal:PropTypes.func,
    changeModalType:PropTypes.func,
    visibleModal:PropTypes.bool,
    loginStatus:PropTypes.bool,
    jifen:PropTypes.any
  }
  componentDidMount () {
    const { userNewsReq, changeLoginStatus } = this.props
    newCatchToken(() => {
      if (!Cookies.get('token')) {
        changeLoginStatus(false)
      } else {
        changeLoginStatus(true)
        setImmediate(() => userNewsReq(() => changeLoginStatus(false)))
      }
    })
  }
  openRule=() => {
    const { visibleRuleModal, changeModalType } = this.props
    changeModalType(true)
    setImmediate(() => visibleRuleModal(true))
  }
  render () {
    // console.log(this.props)
    const { loginStatus, visibleModal, jifen } = this.props

    return (
      <React.Fragment>
        <div className='lucky-header'>
          <h2 style={{ opacity:`${+loginStatus}` }}>总积分：{jifen}</h2>
          <div className='draw-rule-container' onClick={this.openRule}>活动规则</div>
        </div>
        {visibleModal && <MyDrawModal />}
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
