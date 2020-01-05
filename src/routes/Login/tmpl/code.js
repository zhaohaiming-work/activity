import React from 'react'
import { Modal } from 'antd-mobile'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { alertNews, successAlert } from 'components/commonFun'
import Api from 'api'
const prompt = Modal.prompt

let [timer, countdown] = [null, 60]
export default class Code extends React.Component {
  static propTypes={
    phoneNum:PropTypes.any,
  }
  state={
    codeState:false,
    countdown:59
  }
  sendCode=() => {
    const { phoneNum } = this.props
    // const judje = /^1(3|4|5|7|8|6)\d{9}$/
    if (!phoneNum) {
      alertNews('请输入手机或邮箱')
      return
    }
    const sendCodes = (code) => {
      // console.log(code)
      Api.sendcodewithcaptcha({
        phone:phoneNum,
        captcha_code:code
      })
      .then(res => successAlert(res.msg))
    }

    // return
    alertNews('60秒后可以再次发送')
    this.setState({ codeState:true })
    timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        clearInterval(timer)
        this.setState({ codeState:false, countdown:59 })
        countdown = 60
      } else {
        this.setState({ countdown:`${countdown - 1}` })
      }
    }, 1000)
    Api.captchaurl({ k:phoneNum })
      .then(res => {
        prompt(
          '请输入验证码',
          <img src={res.url || '#'} />,
          [
            { text: '取消' },
            { text: '确定', onPress: code => sendCodes(code) },
          ],
          'default',
        )
      })
  }
  componentWillUnmount () {
    clearInterval(timer)
  }
  render () {
    const { codeState, countdown } = this.state
    return (
      <React.Fragment>
        {codeState ? `${countdown}s`
         : <span onClick={this.sendCode} style={{ color:'#ec3627', fontSize:13 }}>发送验证码</span>}
      </React.Fragment>
    )
  }
}
