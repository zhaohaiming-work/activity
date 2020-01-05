import React from 'react'
import { Icon } from 'antd-mobile'
import propTypes from 'prop-types'
import '../guess'
import './maskcss'
import Api from 'api'
import { alertNews } from 'func'
class App extends React.Component {
  state = {
    btnArr: [
      {
        num: 20,
        active: true
      },
      {
        num: 50,
        active: false
      },
      {
        num: 100,
        active: false
      }
    ],
    newPoint: 20
  }
  componentDidMount () {
    document.getElementById('guessContainer').style.overflow = 'hidden'
  }
  componentWillUnmount () {
    document.getElementById('guessContainer').style.overflow = 'auto'
  }
  confirm = () => {
    const { handleGuessType } = window
    const { dayGuessNews, close } = this.props
    const { newPoint } = this.state
    const reg = /^[1-9]\d*$/
    if (newPoint === '') {
      alertNews('请填写自定义的积分')
      return
    }
    if (!reg.test(newPoint)) {
      alertNews('请填写正确的积分格式')
      return
    }
    if (+newPoint > 200) {
      alertNews('单次投注最多200积分')
      return
    }
    const { id } = dayGuessNews
    Api.betting({
      quiz_id: id,
      point: newPoint,
      answer: handleGuessType,
    })
      .then(res => {
        Promise.resolve()
          .then(() => alertNews('操作成功'))
          .then(close)
          .then(() => (window.dayGuessReq && window.dayGuessReq()))
          .then(() => (window.getGuessJf && window.getGuessJf()))
      })
      .catch(() => { })
  }
  selectPoint = (val) => {
    const { btnArr } = this.state
    const newArr = btnArr.map(v => {
      if (+v.num === +val.num) {
        v.active = true
      } else {
        v.active = false
      }
      return v
    })

    this.setState({
      btnArr: newArr,
      newPoint: val.num
    })
  }
  customerFocus = () => {
    const { btnArr } = this.state
    this.setState({
      // newPoint:'',
      btnArr: btnArr.map(v => {
        v.active = false
        return v
      })
    })
  }
  customerChange = (e) => {
    // console.log(e.target.value)
    const { value } = e.target
    this.setState({ newPoint: value })
  }
  render () {
    const { close, dayGuessNews = {} } = this.props
    const { btnArr, newPoint } = this.state
    const { handleGuessType } = window
    let type = dayGuessNews[`option${handleGuessType}`]
    return (
      <div className='mask-container'>
        <div className='mask' />
        <div className='content'>
          <span className='closed' onClick={close}><Icon type='cross' /></span>
          <h3>已选择{type}</h3>
          <div className='jifen'>
            我的积分：{window.guessJf || 0}，单次投注最多200积分
          </div>
          <div className='btn-group'>
            {
              btnArr.map(v => {
                return <button
                  key={v.num}
                  className={v.active ? 'active' : 'aa'}
                  onClick={() => this.selectPoint(v)}
                >{v.num}</button>
              })
            }
            <div>
              <input type='text'
                placeholder='自定义'
                onFocus={this.customerFocus}
                onChange={this.customerChange}
              // value={newPoint}
              />
            </div>
          </div>
          <button className='confirm-btn' onClick={this.confirm}>投注{newPoint || 0}积分,确认参与</button>
        </div>
      </div>
    )
  }
}
App.propTypes = {
  // len: propTypes.any,
  close: propTypes.func,
  dayGuessNews: propTypes.object
}
export default App
