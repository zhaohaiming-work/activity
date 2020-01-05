import React from 'react'
import * as Cookies from 'js-cookie'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../bless'
import sd from 'images/bless/sd.png'
import jy from 'images/bless/jy.png'
import tz from 'images/bless/tz.png'
import xx from 'images/bless/xx.png'
import fx from 'images/bless/fx.png'
import Api from 'api'
import { newCatchToken } from 'components/commonFun'
import Draw from './draw'

class HomeView extends React.Component {
  state = {
    news: {
      createPositionCnt: 0,
      tradeVolume: 0,
      depositVolume: 0,
      followOrdersCnt: 0,
      invitedCnt: 0,
      // totalCnt: 0
    },
    loginStatus: false,
    userMoneyNews:{}

  }
  componentDidMount () {
    window.getBlessCardReq = this.getData
    newCatchToken(() => {
      if (!Cookies.get('token')) {
        this.setState({ loginStatus: false })
      } else {
        this.getData()
        // this.getUserNews()
      }
    }, () => {
      this.setState({ loginStatus: false })
    })
  }
  getData = () => {
    Api.getBlessCard()
      .then(res => {
        const news = {
          createPositionCnt: res.create_position_cnt > 10 ? 10 : res.create_position_cnt,
          tradeVolume: parseInt((res.trade_volume || 0) / 1000000) > 10
           ? 10 : parseInt((res.trade_volume || 0) / 1000000),
          depositVolume: parseInt((res.deposit_volume || 0) / 100) > 10
          ? 10 : parseInt((res.deposit_volume || 0) / 100),
          followOrdersCnt: parseInt((res.follow_orders_cnt || 0) / 10) > 10
          ? 10 : parseInt((res.follow_orders_cnt || 0) / 10),
          invitedCnt: res.invited_cnt > 10 ? 10 : res.invited_cnt,
        }
        this.setState({ news, loginStatus:true, userMoneyNews:res })
      })
      .catch(() => this.setState({ loginStatus: false }))
  }
  render () {
    const { loginStatus, userMoneyNews } = this.state
    const { createPositionCnt, tradeVolume,
      depositVolume, followOrdersCnt, invitedCnt } = this.state.news
    const fkCount = Math.min.apply(Array, Object.values(this.state.news))
    // console.log(fkCount)
    return (
      <React.Fragment>
        <div className='wufu-container'>
          <div className='list'>
            <img src={sd} alt='' />
            {
              loginStatus && <span>{createPositionCnt}</span>
            }
          </div>
          <div className='list'>
            <img src={jy} alt='' />
            {
              loginStatus && <span>{tradeVolume}</span>
            }
          </div>
          <div className='list'>
            <img src={tz} alt='' />
            {
              loginStatus && <span>{depositVolume}</span>
            }
          </div>
          <div className='list'>
            <img src={xx} alt='' />
            {
              loginStatus && <span>{followOrdersCnt}</span>
            }
          </div>
          <div className='list'>
            <img src={fx} alt='' />
            {
              loginStatus && <span>{invitedCnt}</span>
            }
          </div>
        </div>
        <Draw fkCount={fkCount} loginStatus={loginStatus} userMoneyNews={userMoneyNews} />
      </React.Fragment>
    )
  }
}
export default HomeView
