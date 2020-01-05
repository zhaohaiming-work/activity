import React from 'react'
// import { Modal } from 'antd-mobile'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { alertNews, successAlert } from 'components/commonFun'
import '../huodong'
import Api from 'api'
import icoDefaultUserAvatar from 'images/huodong/ico_default_user_avatar'
import HuodongModal from './codeModal'
// const prompt = Modal.prompt
const LoginBtn = ({ registerState, register }) => {
  const newTitle = registerState ? `下载APP领取99元实物大奖` : `注册领取28美金+99元实物大奖`
  const skip = () => {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      window.location.href = 'com.baidu.tieba://'// ios app协议
      window.setTimeout(() => {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tophold.xcfd&amp;g_f=991653'
      }, 1000)
    }
    if (navigator.userAgent.match(/android/i)) {
      window.location.href = 'com.baidu.tieba://app'// android app协议
      window.setTimeout(() => {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tophold.xcfd&amp;g_f=991653'// android 下载地址
      }, 1000)
    }
  }
  return (
    <React.Fragment>
      <div className='pt-10' />
      <button className='login-btn' onClick={registerState ? skip : register}>{newTitle}</button>
      <div style={{ paddingBottom: 30 }} />
    </React.Fragment>
  )
}
LoginBtn.propTypes = {
  registerState: PropTypes.bool,
  register: PropTypes.func
}
let [timer, countdown] = [null, 60]
export class Code extends React.Component {
  static propTypes = {
    phoneNum: PropTypes.any,
  }
  state = {
    codeState: false,
    countdown: 59,
    imgUrl:'',
    visible:false
  }
  sendCode = () => {
    const { phoneNum } = this.props
    const judje = /^1(3|4|5|7|8|6|7|9|2)\d{9}$/
    if (!phoneNum) {
      alertNews('请输入手机号')
      return
    }
    if (!judje.test(phoneNum)) {
      alertNews('手机号格式不正确')
      return
    }
    window.sendCode = ''
    // return
    alertNews('60秒后可以再次发送')
    this.setState({ codeState: true })
    timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        clearInterval(timer)
        this.setState({ codeState: false, countdown: 59 })
        countdown = 60
      } else {
        this.setState({ countdown: `${countdown - 1}` })
      }
    }, 1000)
    // console.log(9999)
    Api.captchaurl({ k: phoneNum })
      .then(res => {
        this.setState({ imgUrl:res.url, visible:true })
      })
  }
  send = (code) => {
    const { phoneNum } = this.props
    Api.sendcodewithcaptcha({
      phone: phoneNum,
      captcha_code: code
    })
      .then(res => successAlert(res.msg))
      .then(() => this.setState({ visible:false }))
      .catch(err => alertNews(err.response.data.error))
  }
  closeModal=(confirm) => {
    if (confirm) {
      if (window.sendCode === '') {
        alertNews('请输入验证码')
        return
      }
      this.send(window.sendCode)
    } else {
      this.setState({ visible:false })
    }
  }
  componentWillUnmount () {
    clearInterval(timer)
  }
  render () {
    const { codeState, countdown, imgUrl, visible } = this.state
    return (
      <React.Fragment>
        {codeState ? `${countdown}s` : <span onClick={this.sendCode} style={{ color: '#ec3627' }}>发送验证码</span>}
        {visible && <HuodongModal url={imgUrl} close={this.closeModal} />}
      </React.Fragment>
    )
  }
}
export class Input extends React.Component {
  static propTypes = {
    extra: PropTypes.node,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }
  render () {
    const { extra, type, placeholder, onFocus, onChange, value } = this.props
    return (
      <div className='input-con bordered-grey-bottom'>
        <input
          type={type || 'text'}
          placeholder={placeholder}
          onFocus={onFocus}
          value={value}
          onChange={onChange}
        />
        <div>{extra}</div>
      </div>
    )
  }
}
export const Recommend = ({ config }) => {
  // console.log(config)
  const avatarUrl = config.avatar_url
  const name = (config.name || '').replace(/.{1}/, '*')
  const registeredDays = config.registered_days
  const noId = (
    <React.Fragment>
      我在 [天厚实盘] 已经交易 <span> {registeredDays || 0}天</span> ,
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <div className='recommend'>
        <div className='left'>
          <img src={avatarUrl || icoDefaultUserAvatar} alt='' />
          <span>{name || '--'}</span>
        </div>
        <div className='bordered-all-grey-radius right'>
          {avatarUrl && noId}
          送你一份新人福利：<span>28美金 + 99元实物大奖</span>，赶紧领取吧！
        </div>
      </div>
    </React.Fragment>
  )
}
Recommend.propTypes = {
  config: PropTypes.any,
}

export default LoginBtn
