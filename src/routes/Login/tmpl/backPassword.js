import React from 'react'
import { InputItem, List, Button } from 'antd-mobile'
import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
// import PropTypes from 'prop-types'
import { alertNews, successAlert, history } from 'components/commonFun'
import Api from 'api'
import '../login'
let [timer, countdown] = [null, 60]

export default class BackPassword extends React.Component {
  state={
    user:'',
    password:'',
    tabIndex:0,
    code:'',
    countdown:59,
    codeState:false
  }
  change=(e, type) => this.setState({ [type]:e.trim() })
  sendCode=() => {
    const { user } = this.state
    if (!user) {
      alertNews('请输入手机号')
      return
    }
    Api.sendPasswordCode({
      phone:user,
      // email:''
    })
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
  }
  confrim = () => {
    const { user, code, password } = this.state
    if (!user) {
      alertNews('请输入手机号')
      return
    }
    if (!code) {
      alertNews('请输入验证码')
      return
    }
    if (!password) {
      alertNews('请输入密码')
      return
    }
    const obj = {
      phone:user,
      code,
      password,
      password_confirmation:password
    }
    Api.updatePasswordWithCode(obj)
    .then(res => {
      successAlert('修改成功')
      setImmediate(() => history.push('/login'))
    })
  }
  componentWillUnmount () {
    clearInterval(timer)
  }
  render () {
    const { user, password, code, countdown, codeState } = this.state

    return (
      <React.Fragment>
        <Nav title='找回密码' back={() => history.push('/login/back-password')}>
          <div className='pd-20' />
          <List>
            <InputItem
              clear
              placeholder='手机号'
              style={{ fontSize:14 }}
              value={user}
              onChange={(e) => this.change(e, 'user')}
                />
            <InputItem
              type='number'
              clear
              placeholder='验证码'
              style={{ fontSize:14 }}
              extra={codeState ? `${countdown}s`
              : <span onClick={this.sendCode} style={{ color:'#ec3627', fontSize:13 }}>发送验证码</span>}
              onChange={(e) => this.change(e, 'code')}
              value={code}
            />
            <InputItem
              type='password'
              clear
              placeholder='密码'
              style={{ fontSize:14 }}
              value={password}
              onChange={(e) => this.change(e, 'password')}
                />
          </List>
          <div className='pt-10' />
          <div className='pd-10'>
            <Button type='warning'
              style={{ borderRadius:28, height:35, fontSize:16, lineHeight:2.2, background:'red' }}
              onClick={this.confrim}
            >确认</Button>
          </div>
        </Nav>
      </React.Fragment>
    )
  }
}
