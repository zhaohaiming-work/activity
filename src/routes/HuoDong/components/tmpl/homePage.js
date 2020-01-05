import React from 'react'
import { Modal } from 'antd-mobile'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
// import PropTypes from 'prop-types'
import '../huodong'
import bg from 'images/huodong/bg.png'
import fenxiang from 'images/huodong/fenxiang.png'
import award from 'images/huodong/award.png'
import shiwuquan from 'images/huodong/shiwuquan.png'
import LoginBtn, { Code, Input, Recommend } from './aplitCode'
import { alertNews, successAlert, getUrlSearch, hideNews, history } from 'components/commonFun'
import { createForm } from 'rc-form'
import Api from 'api'
const alertModal = Modal.alert
class HomeView extends React.Component {
  state = {
    hasError: false,
    phoneValue: '',
    codeValue:'',
    passwordValue:'',
    agreeValue:false,
    registerState:false,
    visibleInput:false,
    userNews:{}
  }
  componentDidMount () {
    const { id } = getUrlSearch()
    if (!id) {
      return
    }
    Api.userDetail({ id })
      .then(res => {
        this.setState({ userNews:res.user || {} })
      })
      .catch(res => hideNews())
  }
  onChangePhone = (e) => {
    const value = e.target.value
    this.setState({
      phoneValue:value,
    })
  }
  onChangePw=e => this.setState({ passwordValue:e.target.value, })
  onChangeCode=e => this.setState({ codeValue:e.target.value })
  onChangeAgree=(e) => {
    // console.log(e.target.checked)
    this.setState({ agreeValue:e.target.checked })
  }
  register=() => {
    const { phoneValue, passwordValue, codeValue, agreeValue, userNews } = this.state
    if (!phoneValue) {
      alertNews('请填写手机号')
      return
    }
    if (!codeValue) {
      alertNews('请填写验证码')
      return
    }
    if (!passwordValue) {
      alertNews('请填写密码')
      return
    }
    if (!agreeValue) {
      alertNews('请选择接受同意天厚用户使用协议')
      return
    }
    const obj = {
      phone:phoneValue,
      password:passwordValue,
      password_confirmation:passwordValue,
      phone_code:codeValue,
      invitation_code:userNews.name || ''
    }
    Api.createUser(obj)
    .then(() => {
      successAlert('操作成功')
      this.setState({ registerState:true })
    })
    .catch(err => {
      const { response = {} } = err
      const { data = {} } = response
      const { error = {} } = data
      const { code } = error
      hideNews()
      if (+code === 40000) {
        alertModal('当前注册环境异常', '请下载APP后注册', [
          { text: '取消', onPress: () => console.log('cancel') },
          {
            text: '去下载',
            onPress: () => history.push('/dou-ele/down-app')
          },
        ])
      } else {
        alertNews(data.error.message ? data.error.message : data.error)
      }
    })
  }
  onFocus=() => {
    this.setState({ visibleInput:true })
  }
  skipAgree=() => (window.location.href = `https://www.tophold.com/live_useragreement`)
  render () {
    const { registerState, phoneValue, passwordValue, codeValue, agreeValue, visibleInput, userNews } = this.state
    return (
      <React.Fragment>
        <div style={{ position:'relative', overflow:'auto', height:'100%' }} id='huodong'>
          <header className='header'>
            <img src={bg} alt='图片加载失败' />
            <div className='user-news'>
              {registerState ? <img src={award} alt='' /> : <Recommend config={userNews} />}
            </div>
          </header>
          {
           registerState && <div className='shiwuquan'>
             <img src={shiwuquan} alt='' />
             <div>10美金已放入账号: <span>{phoneValue}</span></div>
           </div>
          }
          <div className='login-news'>
            {
             !registerState ? (
               <div className='pl-10 pr-10'>
                 <Input
                   placeholder='请输入手机号'
                   onFocus={this.onFocus}
                   onChange={this.onChangePhone}
                   value={phoneValue}
                   type='phone'
                   />
                 {visibleInput && <React.Fragment>
                   <Input
                     placeholder='请输入验证码'
                     extra={<Code phoneNum={phoneValue} />}
                     onChange={this.onChangeCode}
                     value={codeValue}
                   />
                   <Input
                     type='password'
                     placeholder='请输入密码'
                     onChange={this.onChangePw}
                     value={passwordValue}
                    />
                   </React.Fragment>}
                 <div className='port'>
                   <input type='checkbox' checked={agreeValue} onChange={this.onChangeAgree} />
                   <span className='pl-5' /> 点击注册表示同意
                    <span onClick={this.skipAgree}>天厚用户使用协议</span>
                 </div>
                 <LoginBtn registerState={registerState} register={this.register} />
               </div>
             ) : <LoginBtn registerState={registerState} register={this.register} />
           }
          </div>
          <div className='fenxiang'>
            <img src={fenxiang} alt='图片加载失败' />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const Main = createForm()(HomeView)

export default Main
