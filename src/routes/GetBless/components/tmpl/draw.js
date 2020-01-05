import React from 'react'
// import Api from 'api'
// import { Modal } from 'antd-mobile'
import PropTypes from 'prop-types'
import '../bless'
import thfDl from 'images/bless/thf-dl.png'
import thfWdl from 'images/bless/thf-wdl.png'
import thf from 'images/bless/thf-mark.png'
import jlk from 'images/bless/jlk.png'
import { judgeDevice, alertNews, goLogin } from 'components/commonFun'
import Mask from './mask'
import Api from 'api'
class HomeView extends React.Component {
  static propTypes = {
    loginStatus:PropTypes.bool,
    fkCount:PropTypes.any,
    userMoneyNews:PropTypes.object
  }
  state={
    okSkip:true,
    okStart:false,
    isClick:false,
    visibleMask:false,
    isTest:true,
    deposit:{}
  }
  componentDidMount () {
    // 判断设备，如果不在app里面跳转app，如在在就执行
    const { newJudgeAndroidApp, newJudgeIosApp } = judgeDevice
    if (newJudgeAndroidApp || newJudgeIosApp) {
      this.setState({ okSkip:false })
    }
    const startTime = new Date('2019/02/02 12:00:00').getTime()
    const endTime = new Date('2019/02/04 23:59:59').getTime()
    const nowTime = new Date().getTime()
    if (nowTime > startTime && nowTime < endTime) {
      this.setState({ okStart:true })
    }
    const { hostname } = location
    const name = hostname.replace(/\..*/, '')
    if (name === 'activity') {
      this.setState({ isTest:false })
    }
  }
  chai=() => {
    const { okStart } = this.state
    const { loginStatus, userMoneyNews } = this.props
    if (!loginStatus) {
      goLogin()
      return
    }
    const { hostname } = location
    const name = hostname.replace(/\..*/, '')
    if (name === 'activity') {
      if (!okStart) {
        alertNews('拆红包时间未开始')
        return
      }
    }
    // this.setState({ visibleMask:true })
    // const fkCount = userMoneyNews.total_cnt
    const totalAmount = userMoneyNews.total_amount || 0
    const totalDepositAmount = userMoneyNews.total_deposit_amount || 0
    if (totalAmount > 0 && totalDepositAmount <= 0) {
      // alertNews('没有足够的次数')
      Api.getBlessMoney()
      .then(res => {
        this.setState({ visibleMask:true, deposit:res.deposit || {} })
      })
    } else {
      alertNews('可拆红包次数不够')
    }
  }
  closeModal=() => {
    this.setState({ visibleMask:false })
    window.getBlessCardReq && window.getBlessCardReq()
  }
  render () {
    const { fkCount, userMoneyNews, loginStatus } = this.props
    const { okStart, visibleMask, deposit } = this.state
    const jlkstyle = {
      backgroundImage:`url(${jlk})`,
      backgroundSize: '100% 100%'
    }
    const totalDepositAmount = userMoneyNews.total_deposit_amount <= 0
    const totalCnt = `${userMoneyNews.total_cnt || 0}`
    const totalAmount = userMoneyNews.total_amount
    return (
      <React.Fragment>
        {
          (totalDepositAmount || !loginStatus) ? (
            <div className='draw-container'>
              <img src={fkCount === 0 ? thfWdl : thfDl} alt='' className='thf-img' />
              <div className='count'>
                {loginStatus && <span>{totalCnt}个</span>}
                <img src={thf} alt='' />
              </div>
              <div className='pd-20' >
                <p>“每拆一次红包消耗一个天厚福</p>
                <p>点击拆红包即可平分$28888本金奖池哦~”</p>
              </div>
            </div>
          ) : (
            <div className='bless-result mb-10' style={jlkstyle}>
              <p>恭喜您已累计平分获得</p>
              <h2>${totalAmount} <span>本金</span></h2>
              <p>将会在1~2个工作日内到账，请耐心等待</p>
            </div>
          )
        }
        {
          (totalDepositAmount || !loginStatus) && <div>
            {/* ((totalDepositAmount || !loginStatus) || isTest) && <div> */}
            <button className={`red-envelopes-btn${okStart ? '' : ' yes-chai'}`} onClick={this.chai}>拆红包</button>
            <div className='more-get pb-25 pt-10'>拆红包时间：2月2日 12:00:00 ~2月4日 23:59:59</div>
          </div>
        }
        { visibleMask && <Mask deposit={deposit} close={this.closeModal} /> }
      </React.Fragment>
    )
  }
}

export default HomeView
