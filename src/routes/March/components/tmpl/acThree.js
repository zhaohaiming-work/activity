import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import PropTypes from 'prop-types'
import { hd3 } from './imgConfig'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { connect } from 'react-redux'
import { goLogin, alertNews } from 'func'
import Api from 'api'
class App extends React.Component {
  static propTypes={
    loginStatus:PropTypes.bool,
    treeNews:PropTypes.any,
    // treeNewsReq:PropTypes.func
  }
  state={
    email:''
  }
  submit=() => {
    const { loginStatus, treeNews } = this.props
    const { email } = this.state
    if (!loginStatus) {
      goLogin()
      return
    }
    if (treeNews.gift_arbor) {
      alertNews('您已经提交过了')
      return
    }
    if (!(+treeNews.deposit_volume > 200 && !treeNews.gift_arbor)) {
      alertNews('您的条件未达到')
      return
    }
    if (email === '') {
      alertNews('请填写邮箱')
      return
    }
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!reg.test(email)) {
      alertNews('邮箱格式不正确')
      return
    }

    Api.arborTree({ email })
    .then(() => {
      alertNews('提交成功')
      setTimeout(() => {
        // treeNewsReq()
        this.setState({ email:'' })
      }, 500)
    })
    .catch(() => this.setState({ email:'' }))
  }
  inputEmail=(e) => {
    // console.log(e.target.value)
    this.setState({ email:e.target.value })
  }
  render () {
    const { email } = this.state
    return (
      <React.Fragment>
        <div style={{ marginTop:18 }} />
        <div className='march-ac-two'>
          <img src={hd3} alt='' />
          <div className='user-news'>
            {/* <div className='list list-center'>
              <span>姓名:</span>
              <input type='text' className='ac-3' />
            </div> */}
            <div className='list list-center'>
              <span>邮箱:</span>
              <input type='text' value={email} className='ac-3' onChange={this.inputEmail} />
            </div>
            <div className='pd-5' />
            <button onClick={this.submit}>提交</button>
          </div>
        </div>
        <div className='pd-15' />
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
