import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import { clickMee, eggConfigList } from './imgConfig'
import Api from 'api'
import Mask from './mask'
import { newCatchToken } from 'func'
import * as Cookies from 'js-cookie'
class App extends React.Component {
  state = {
    eggConfig: eggConfigList,
    eggDraw:{},
    visible:false,
    loginState:false,
    tradeNews:{}
  }

  componentDidMount () {
    newCatchToken(() => {
      if (Cookies.get('token')) {
        this.getEggNews()
      } else {
        this.setState({ loginState: false })
      }
    })
  }
  getEggNews = () => {
    Api.getClickEggNews()
      .then(res => {
        let eggList = this.state.eggConfig.map(v => v)
        eggList = eggList.map(v => {
          const { index } = v
          if (+res[`lv${index}`] > 0) {
            v.eggState = 'yz'
            v.yzMoney = res[`lv${index}`]
          } else {
            if (res.max_level >= index) {
              v.eggState = 'kz'
            } else {
              v.eggState = 'wz'
            }
          }
          return v
        })
        this.setState({ eggConfig: eggList, loginState: true, tradeNews:res })
      })
      .catch(() => this.setState({ loginState: false }))
  }
  clickEgg=(val) => {
    const { eggState, index } = val
    if (eggState !== 'kz') {
      return
    }
    // console.log(eggState)
    Api.clickEgg({ level:index })
    .then(res => {
      window.eggIndex = index
      this.setState({ eggDraw:res.lucky_draw_user, visible:true })
    })
  }
  colseModal=() => {
    const { eggConfig, eggDraw } = this.state
    this.setState({ visible:false })
    const { eggIndex } = window
    const arr = eggConfig.map(v => {
      const { index } = v
      if (+index === +eggIndex) {
        v.yzMoney = eggDraw.item_value || 0
        v.eggState = 'yz'
      }
      return v
    })
    this.setState({ eggConfig:arr })
  }
  componentWillUnmount () {
    const { eggConfig } = this.state
    this.setState({
      eggConfig: eggConfig.map(v => {
        v.eggState = 'wz'
        return v
      })
    })
  }

  render () {
    const { eggConfig, visible, eggDraw, tradeNews, loginState } = this.state
    return (
      <React.Fragment>
        {
         loginState ? <div className='egg-trade'>
         当前交易量: {parseInt(tradeNews.trade_volume || 0)}，充值量: {parseInt(tradeNews.deposit_volume || 0)}
         </div> : <div className='pd-15' />
       }
        <div className='egg-content'>
          <div className='egg-body'>
            <ul>
              {
                eggConfig.map(v => {
                  const { eggState } = v
                  let imgUrl = ''
                  const yzState = eggState === 'yz'
                  const kzState = eggState === 'kz'
                  switch (eggState) {
                    case 'wz':
                      imgUrl = v.wzEggUrl
                      break
                    case 'kz':
                      imgUrl = v.kzEggUrl
                      break
                    case 'yz':
                      imgUrl = v.yzEggUrl
                      break
                  }
                  return (
                    <li key={v.index}>
                      {kzState && <img className='click-mee' src={clickMee} alt='' />}
                      {yzState && <p>${(v.yzMoney).toFixed(2)}</p>}
                      <img className='egg' src={imgUrl} alt='' onClick={() => this.clickEgg(v)} />
                      <img className='egg-zhu' src={v.z} alt='' />
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className='cylindrical'>
            <div className='top' />
            <div className='bottom' />
          </div>
        </div>
        {visible && <Mask news={eggDraw} close={this.colseModal} />}
      </React.Fragment>
    )
  }
}
export default App
