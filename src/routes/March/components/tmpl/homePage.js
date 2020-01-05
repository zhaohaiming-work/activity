import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import PropTypes from 'prop-types'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { connect } from 'react-redux'
import { banner, hd1 } from './imgConfig'
import AcTwo from './acTwo'
import AcThree from './acThree'
import { newCatchToken } from 'func'
import * as Cookies from 'js-cookie'

class App extends React.Component {
  static propTypes = {
    changeLoginStatus: PropTypes.func,
    treeNewsReq: PropTypes.func,
    resetNews: PropTypes.func,
    treeNews:PropTypes.object,
    loginStatus:PropTypes.bool
  }
  componentDidMount () {
    const { changeLoginStatus, treeNewsReq, resetNews } = this.props
    newCatchToken(() => {
      if (Cookies.get('token')) {
        changeLoginStatus(true)
        setImmediate(treeNewsReq)
      } else {
        changeLoginStatus(false)
        resetNews()
      }
    })
  }
  componentWillUnmount () {
    this.props.changeLoginStatus(false)
    this.props.resetNews()
  }
  render () {
    const { treeNews, loginStatus } = this.props
    return (
      <React.Fragment>
        <div className='march-container'>
          <img src={banner} alt='' style={{ width: '100%', height: 'auto', marginTop: 15 }} />
          <img className='march-img-common' src={hd1} alt='' />
          {
            loginStatus && <div className='march-trade'>
              当前交易量: {parseInt(treeNews.trade_volume || 0)}，充值量: {parseInt(treeNews.deposit_volume || 0)}
            </div>
          }
          <AcTwo />
          <AcThree />
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
