import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import tp from 'images/february-activity/tophold.jpg'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { newCatchToken, goLogin, alertNews } from 'func'
import * as Cookies from 'js-cookie'
import Api from 'api'
import PropTypes from 'prop-types'
import DrawModal from './drawModal'
class App extends React.Component {
  static propTypes={
    changeLoginStatus:PropTypes.func,
    readyGetRedPacketsReq:PropTypes.func,
    loginStatus:PropTypes.bool,
    redRecordNews:PropTypes.object,
    myRecordReq:PropTypes.func,
  }
  state={
    visible:false,
    tradeNews:{}
  }
  componentDidMount () {
    const { changeLoginStatus, readyGetRedPacketsReq, myRecordReq } = this.props
    newCatchToken(() => {
      if (!Cookies.get('token')) {
        changeLoginStatus(false)
      } else {
        Promise.resolve()
        .then(() => changeLoginStatus(true))
        .then(() => readyGetRedPacketsReq(() => changeLoginStatus(false)))
        .then(myRecordReq)
      }
    })
  }
  action=() => {
    // this.setState({ visible:true })
    const { redRecordNews, loginStatus } = this.props
    if (!loginStatus) {
      goLogin()
      return
    }
    const luckyCnt = redRecordNews.lucky_cnt || 0
    const tradeVolume = redRecordNews.trade_volume || 0
    const okAction = parseInt(tradeVolume / 1000000) > luckyCnt
    if (!okAction) {
      alertNews('交易量没达到')
    } else {
      Api.actionRedPackets()
      .then(res => {
        this.setState({ visible:true, tradeNews:res.lucky_draw_user || {} })
      })
    }
  }
  componentWillUnmount () {
    this.props.changeLoginStatus(false)
  }
  hide=() => {
    const { readyGetRedPacketsReq, myRecordReq } = this.props
    Promise.resolve()
    .then(() => this.setState({ visible:false }))
    .then(myRecordReq)
    .then(readyGetRedPacketsReq)
  }
  render () {
    const { redRecordNews, loginStatus } = this.props
    const { visible, tradeNews } = this.state
    const num = redRecordNews.lucky_cnt || 0
    return (
      <React.Fragment>
        <div className='red-packets-action'>
          <div className='blank' />
          <img src={tp} alt='' />
          <p>天厚实盘</p>
          <p>给你发了一个红包</p>
          <div className='action-btn' onClick={this.action}>开</div>
          {loginStatus && <p>您的开红包次数为<span>{num}</span>次</p>}
        </div>
        {visible && <DrawModal close={this.hide} news={tradeNews} />}
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
