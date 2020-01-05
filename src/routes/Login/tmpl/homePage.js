import React from 'react'
import PropTypes from 'prop-types'
import { InputItem, Tabs, List, Button } from 'antd-mobile'
// import { Nav } from 'components/commonTmpl'
import * as Cookies from 'js-cookie'
import Api from 'api'
import { alertNews, history, successAlert, hideNews } from 'components/commonFun'
import bg from 'images/all/bg.jpg'
import logo from 'images/all/logo'
import '../login'
import Code from './code'
// const alertModal = Modal.alert
export default class Login extends React.Component {
  state={
    user:'',
    password:'',
    tabIndex:0,
    code:'',
    historys:''
  }
  static propTypes={
    match:PropTypes.object
  }
  componentDidMount () {
    const { history } = this.props.match.params
    this.setState({ historys:history })
  }
  change=(e, type) => this.setState({ [type]:e.trim() })
  login=() => {
    const { user, password, historys } = this.state
    if (!user) {
      alertNews('请输入账号')
      return
    }
    if (!password) {
      alertNews('请输入密码')
      return
    }
    Api.login({
      login:user,
      password,
    })
    .then(res => {
      Cookies.set('token', res.user.authentication_token)
      Cookies.set('userInfor', res.user)
      Api.getJavaToken({
        'X-Access-Token':res.user.authentication_token
      })
      .then(res => {
        Cookies.set('Authorization', res.th_token)
        if (historys === 'market') {
          setTimeout(history.push('/market'))
        } else {
          setTimeout(history.goBack)
        }
      })
    })
    .catch(err => {
      const { response = {} } = err
      const { data = {} } = response
      // const { error = {} } = data
      // const { message = '' } = error
      hideNews()
      alertNews(data.error.message ? data.error.message : data.error)
    })
  }
  register=() => {
    const { user, password, code } = this.state
    if (!user) {
      alertNews('请输入账号')
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
      password:password,
      password_confirmation:password,
      phone_code:code
    }
    Api.createUser(obj)
      .then(() => {
        successAlert('操作成功')
        this.setState({ registerState:true })
      })
      .catch()
  }
  tabChange=(tab, index) => {
    this.setState({ user:'', password:'', tabIndex:+index, code:'' })
  }
  skipAgree=() => (window.location.href = `https://www.tophold.com/live_useragreement`)
  backPassword=() => history.push('/login/password/back-password')
  render () {
    const { user, password, tabIndex, code } = this.state
    const btnText = tabIndex ? '注册立拿10美金' : '登录'
    const tabs = [
      { title: '登录' },
      { title: '注册' },
    ]
    return (
      <React.Fragment>
        <div className='login-container'>
          <header className='login-header'>
            <img src={bg} alt='' className='header-bg' />
            <img src={logo} alt='' className='header-logo' />
            {/* <span className='header-text'>随便逛逛</span> */}
          </header>
          <div className='login-content'>
            <Tabs tabs={tabs}
              initialPage={0}
              onChange={this.tabChange}
              tabBarBackgroundColor=''
              tabBarActiveTextColor='#fff'
              tabBarInactiveTextColor='#999'
              tabBarUnderlineStyle={{ borderColor:'red' }}
          >
              <List>
                <div className='pd-15' />
                <InputItem
                  clear
                  placeholder='手机号/用户名'
                  style={{ fontSize:14 }}
                  value={user}
                  onChange={(e) => this.change(e, 'user')}
                />
                <InputItem
                  type='password'
                  clear
                  placeholder='密码'
                  style={{ fontSize:14 }}
                // extra={<span onClick={null}>忘记密码?</span>}
                  value={password}
                  onChange={(e) => this.change(e, 'password')}
                />
              </List>
              <div>
                <List>
                  <div className='pd-15' />
                  <InputItem
                    clear
                    placeholder='手机号/邮箱'
                    style={{ fontSize:14 }}
                    value={user}
                    onChange={(e) => this.change(e, 'user')}
                />
                  <InputItem
                    type='number'
                    clear
                    placeholder='验证码'
                    style={{ fontSize:14 }}
                    extra={<Code phoneNum={user} />}
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

              </div>
            </Tabs>
            <div className='pt-5' />
            <div className='pd-20'>
              <Button
                type='warning'
                style={{ borderRadius:28, height:35, fontSize:16, lineHeight:2.2, background:'red' }}
                onClick={!tabIndex ? this.login : this.register}
            >
                {btnText}
              </Button>
              {
             tabIndex !== 0 && <div className='pt-10' style={{ textAlign:'center', color:'#666' }}>
             点击注册表示同意
            <span style={{ color:'red', textDecoration:'underline' }} onClick={this.skipAgree}>天厚用户使用协议</span>
             </div>
           }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
