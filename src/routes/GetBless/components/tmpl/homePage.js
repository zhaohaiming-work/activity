import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../bless'
import bg from 'images/bless/bg.png'
import title from 'images/bless/title.png'
import meeCardTitle from 'images/bless/mee-card-title.png'
import rule from 'images/bless/rule.png'
import gonglue from 'images/bless/gonglue.png'
import Wufu from './wuFu'
const sideStyle = {
  background:`url(${bg}) no-repeat`,
  backgroundSize:'cover'
}
class HomeView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='bless-container'>
          <div className='bless-side' style={sideStyle}>
            <img src={title} alt='' style={{ width:'100%', height:'auto', minHeight:300 }} />
            <img src={meeCardTitle} alt='' style={{ width:140, height:'auto', margin:'auto' }} />
            <div className='more-get pt-5'>（每5张不同的福卡算一套，最多可集10套）</div>
            <Wufu />
            <img src={gonglue} alt='' style={{ width:'92%', height:'auto', margin:'auto' }} />
            <img src={rule} alt='' style={{ width:'92%', height:'auto', margin:'auto' }} />
          </div>
          <div className='pd-10' />
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
