import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import { hd2, kouhong, xiangshui } from './imgConfig'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { connect } from 'react-redux'
import Api from 'api'
import PropTypes from 'prop-types'
import { goLogin, alertNews } from 'func'

class App extends React.Component {
  static propTypes={
    loginStatus:PropTypes.bool,
    treeNews:PropTypes.any,
    // treeNewsReq:PropTypes.func
  }
  state = {
    name:'',
    phone:'',
    address_detail:'',
    gift_name:''
  }
  valChange=(e) => {
    this.setState({
      [e.target.dataset.name]:e.target.value
    })
    // console.log(e.target.value)
  }
  giftChange=(gift) => {
    // console.log(gift)
    this.setState({ gift_name:gift })
  }
  submit=() => {
    const { loginStatus, treeNews } = this.props
    const { name, phone, address_detail, gift_name } = this.state
    if (!loginStatus) {
      goLogin()
      return
    }
    if (treeNews.gift_name) {
      alertNews('您已经提交过了')
      return
    }
    if (+treeNews.trade_volume < 5000000) {
      alertNews('您的交易量未达到')
      return
    }
    if (!this.state.gift_name) {
      alertNews('请选择礼物')
      return
    }
    if (name === '') {
      alertNews('请填写姓名')
      return
    }
    if (phone === '') {
      alertNews('请填写电话')
      return
    }
    if (!(/^1[345789]\d{9}$/).test(phone)) {
      alertNews('电话格式不正确')
      return
    }
    if (this.state.address_detail === '') {
      alertNews('请填写地址')
      return
    }
    Api.marchGift({
      address_detail,
      name,
      phone,
      gift_code:gift_name,
      gift_name
    })
    .then(() => {
      alertNews('提交成功')
      setTimeout(() => {
        // treeNewsReq()
        this.setState({
          name:'',
          phone:'',
          address_detail:''
        })
      }, 500)
    })
    .catch(() => {
      this.setState({
        name:'',
        phone:'',
        address_detail:''
      })
    })
  }
  render () {
    const { name, phone } = this.state
    const { treeNews } = this.props
    return (
      <React.Fragment>
        <div className='march-ac-two'>
          <img src={hd2} alt='' />
          <ul>
            <li>
              <input type='radio' name='aaa'
                onChange={() => this.giftChange('lipstick')}
                id='aaa1'
                disabled={+treeNews.trade_volume < 5000000}
                  />
              <label htmlFor='aaa1' className='iconfont'>
              &#xe61e;
              </label>
              <img src={kouhong} alt='' />
            </li>
            <li>
              <input type='radio' name='aaa' id='aaa2'
                onChange={() => this.giftChange('perfume')}
                disabled={+treeNews.trade_volume < 10000000}
                 />
              <label htmlFor='aaa2' className='iconfont'>
              &#xe61e;
              </label>
              <img src={xiangshui} alt='' />
            </li>
          </ul>
          <div className='user-news'>
            <div className='list list-center'>
              <span>姓名:</span>
              <input type='text' value={name} data-name='name' onChange={this.valChange} />
            </div>
            <div className='list list-center'>
              <span>电话:</span>
              <input type='text' value={phone} data-name='phone' onChange={this.valChange} />
            </div>
            <div className='list'>
              <span>地址:</span>
              <textarea rows='4' cols='10' value={this.state.address_detail}
                data-name='address_detail' onChange={this.valChange} />
            </div>
            <button onClick={this.submit}>提交</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
