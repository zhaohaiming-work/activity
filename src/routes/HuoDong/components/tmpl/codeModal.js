import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import './style'
// import bg from 'images/bless/bg.png'

class HomeView extends React.Component {
  codeChange=(e) => {
    // console.log(e.target.value)
    window.sendCode = e.target.value
  }
  componentDidMount () {
    document.getElementById('huodong').style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.getElementById('huodong').style.overflow = 'auto'
  }

  render () {
    const { url, close } = this.props
    return (
      <React.Fragment>
        <div className='huohodng-modal'>
          <div className='modal-body'>
            <h2>请输入验证码</h2>
            <img src={url} alt='' />
            <input type='text' onChange={this.codeChange} />
            <div className='modal-btn'>
              <span onClick={() => close()}>取消</span>
              <span onClick={() => close(true)}>确定</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
