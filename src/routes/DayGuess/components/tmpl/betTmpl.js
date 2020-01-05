import React from 'react'
import { Modal } from 'antd-mobile'
import propTypes from 'prop-types'
import '../guess'
import Api from 'api'
import { endTime, fixed } from './filter'
import Mask from './mask'
import { history } from 'components/commonFun'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { connect } from 'react-redux'

const alertMod = Modal.alert
class App extends React.Component {
  state = {
    dayGuessNews: {},
    typeArr: [],
    visible: false
  }
  componentDidMount () {
    window.dayGuessReq = this.dayGuessReq
    this.dayGuessReq()
  }
  dayGuessReq = () => {
    Api.guessToday()
      .then(res => {
        // console.log(res)
        const arr = []
        const quiz = res.quiz || {}
        for (let i = 0; i < 5; i++) {
          if (`option${i}` in quiz) {
            if (quiz[`option${i}`] !== '') {
              arr.push({
                [`option`]: quiz[`option${i}`],
                [`count`]: quiz[`option${i}_points_count`],
              })
            }
          }
        }
        // console.log(arr)
        let num = 0
        for (let i = 0; i < arr.length; i++) {
          num += (+arr[i].count)
        }
        // console.log(num)
        this.setState({
          dayGuessNews: quiz,
          typeArr: arr.map(v => {
            if (+num === 0) {
              v.percentage = 0
            } else {
              v.percentage = (v.count / num) * 100
            }
            return v
          })
        })
      })
  }
  openModal = (type) => {
    if (!window.loginType) {
      alertMod('提示', '您需要登录', [
        { text: '取消', onPress: () => null },
        { text: '确定', onPress: () => history.push('/login/day-guess') },
      ])
      return
    }
    window.handleGuessType = type
    this.setState({ visible: true })
  }
  closeModal = () => this.setState({ visible: false })
  render () {
    const { dayGuessNews, typeArr, visible } = this.state
    const { loginStatus } = this.props
    const { title = '( 暂无竞猜 )' } = dayGuessNews
    const len = typeArr.length
    return (
      <React.Fragment>
        <div className='content-out-side'>
          <div className='flower'><span /> • ○ • <span /></div>
          <h3 className='title'>今日竞猜<div>{title}</div>
          </h3>
          {(loginStatus && dayGuessNews.title) &&
          <div className='end-time'>{endTime(dayGuessNews.end_at || '')}截止，猜对即可获得败方积分</div>}
          <div className='progress'>
            {
              dayGuessNews.title ? (
                <React.Fragment>
                  <div className='left' style={{ width: `${(typeArr[0] || {}).percentage}%` }}>
                    {fixed((typeArr[0] || {}).percentage || 0) || 0.00}%
                  </div>
                  {
                    len > 2 && <div className='center'
                      style={{ width: `${(typeArr[1] || {}).percentage}%` }}
                    >{fixed((typeArr[1] || {}).percentage || 0) || 0.00}%</div>
                  }
                  <div className='right'
                    style={{ width: `${(typeArr[`${len > 2 ? 2 : 1}`] || {}).percentage}%` }}
                  >{fixed((typeArr[`${len > 2 ? 2 : 1}`] || {}).percentage || 0) || 0.00}%</div>
                </React.Fragment>
              ) : null
            }
          </div>
          {
            dayGuessNews.title ? (
              <div className='guess-btn'>
                <button className='up' onClick={() => this.openModal(1)}>{len ? typeArr[0].option : '--'}</button>
                {
                  len > 2 && <button className='center' onClick={() => this.openModal(2)}>
                    {len ? typeArr[1].option : '--'}
                  </button>
                }
                <button className='down' onClick={() => this.openModal(len > 2 ? 3 : 2)}>
                  {len > 2 ? typeArr[2].option : typeArr[1].option}
                </button>
              </div>
            ) : <div className='pd-10' />
          }
          <div className='end-time' style={{ marginBottom: 10 }}>* 每人每天只可参与1次</div>
        </div>
        <div className='pd-5' />
        {visible && <Mask len={len} close={this.closeModal} dayGuessNews={dayGuessNews} />}
      </React.Fragment>
    )
  }
}
App.propTypes = {
  loginStatus: propTypes.bool,
  // add: propTypes.func,
  // match: propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
