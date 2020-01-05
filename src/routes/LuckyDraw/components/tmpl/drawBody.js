import React from 'react'
import { connect } from 'react-redux'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './lucky'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import DrawItem from './drawItem'
import { goLogin, alertNews } from 'func'
import DrawModal from './drawModal'
import PropTypes from 'prop-types'

let timer, content
const Lights = () => {
  const arr = []
  for (let i = 0; i < 15; i++) {
    arr.push(<span key={i} className={`lights-flashing ${i % 2 === 0 ? 'lights-light' : 'lights-deep'}`} />)
  }
  return <div className='light-container'>{arr}</div>
}
class App extends React.Component {
  state = {
    lockBtn: false,
    visible: false
  }
  static propTypes = {
    actionDraw: PropTypes.func,
    changeJpc: PropTypes.func,
    jpcList: PropTypes.any,
    loginStatus: PropTypes.bool,
    userDraw: PropTypes.any,
    jifen: PropTypes.any,
    changeJifen: PropTypes.func,
  }
  action = () => {
    const { loginStatus, actionDraw, jifen } = this.props
    // const { jifen } = userNews
    if (!loginStatus) {
      goLogin()
      return
    }
    if (jifen < 20) {
      alertNews('积分不够')
      return
    }
    this.setState({ lockBtn: true })
    actionDraw(data => {
      // console.log(data)
      clearInterval(timer)
      content = -1
      this.handleSpeed(data, res => {
        setTimeout(() => this.setState({ lockBtn: false, visible: true }), 500)
      })
    })
  }
  // 处理抽奖的转速
  handleSpeed = (cat, callback) => {
    const itemCategory = cat.item_category
    const itemValue = cat.item_value
    const speed = sp => {
      timer = setInterval(() => {
        const { jpcList, changeJpc } = this.props
        content += 1
        const num = content % 8
        const arr = jpcList.map((v, i) => {
          v.active = +v.index === +num
          return v
        })
        changeJpc(arr)
        if (+content === 3) {
          clearInterval(timer)
          speed(30)
        }
        if (+content === 10) {
          clearInterval(timer)
          speed(40)
        }
        if (+content === 25) {
          clearInterval(timer)
          speed(50)
        }
        if (+content === 31) {
          clearInterval(timer)
          speed(80)
        }
        if (+content === 36) {
          clearInterval(timer)
          speed(90)
        }
        if (+content >= 39) {
          clearInterval(timer)
          speed(100)
          jpcList.map((v, i) => {
            const { index } = v
            const ic = +v.item_category
            const val = +v.item_value
            if ((ic === +itemCategory) && (val === +itemValue)) {
              if (content % 8 === +index) {
                clearInterval(timer)
                content = -1
                callback && callback(cat)
              }
            }
          })
        }
      }, sp)
    }
    speed(100)
  }
  lockBtnClick = () => {
    alertNews('请等待抽奖结果')
  }
  visibleModal = () => {
    const { userDraw, changeJpc, jpcList, jifen, changeJifen } = this.props
    const itemCategory = userDraw.item_category
    const itemValue = +userDraw.item_value
    itemCategory === 0 ? changeJifen(jifen + itemValue - 20) : changeJifen(jifen - 20)
    changeJpc(jpcList.map(v => {
      v.active = false
      return v
    }
    ))
    this.setState({ visible: false })
  }
  render () {
    // console.log(this.props)
    const { lockBtn, visible } = this.state
    return (
      <React.Fragment>
        <div className='lucky-draw-container'>
          <div className='lucky-draw-title'>小积分中大奖</div>
          <div className='draw-list-container'>
            <div className='draw-list-conent'>
              <div className='draw-action'>
                <div onClick={lockBtn ? this.lockBtnClick : this.action} >
                  <span>GO</span>
                  <span>马上参加</span>
                </div>
              </div>
              <Lights />
              <DrawItem />
              <Lights />
            </div>
          </div>
        </div>
        {visible && <DrawModal visibleModalFun={this.visibleModal} />}
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
