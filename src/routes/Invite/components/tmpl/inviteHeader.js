import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import invite from 'images/home/invite_bg.png'
import { ShareWebBtn } from './commonTmpl'
import { newCatchToken } from 'func'
import Api from 'api'
const headerBjStyle = {
  background:`url('${invite}') no-repeat`,
  backgroundSize:'100% auto'
}
const drawList = ['$30赠金', '$30优惠券', 'iphoneX', '¥300现金', '¥200话费', '¥200话费']
class HomeView extends React.Component {
  state={
    userNews:{}
  }
  componentDidMount () {
    newCatchToken(this.getData)
  }
  getData=() => {
    Api.invitedBonus()
    .then(res => {
      window.shareId = res.user.id
      this.setState({ userNews:res.user })
    })
    .catch()
  }
  goToRlue = () => { document.getElementById('inviteContainer').scrollTop = 1400 }
  componentWillUnmount () {
    window.shareId = ''
  }

  render () {
    const { userNews } = this.state
    return (
      <React.Fragment>
        <div className='invite-header' style={headerBjStyle}>
          {/* <img src={invite} alt='' /> */}
          <div className='go-to-rule' onClick={this.goToRlue}>规则</div>
          <div className='blank' />
          <div className='invite-header-content'>
            <ul>{drawList.map((v, i) => <li key={i}>{v}</li>)}</ul>
          </div>
          <div className='my-jl'>
            <div className='invite-title'><span>我获得的奖励</span></div>
            <ul className='ready-invite'>
              <li>成功邀请</li>
              <li>累计获得($)</li>
              <li>{userNews.invited_count || 0} 好友</li>
              <li>{(userNews.invited_bonus || 0).toFixed(2)}</li>
            </ul>
            <span className='pd-5' />
            <ShareWebBtn />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
