import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import wx from 'images/home/wx.png'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='gd-rule'>
          <section>比赛规则</section>
          <div className='left'>
            <span />
            <span />
          </div>
          <div className='right'>
            <span />
            <span />
          </div>
        </div>
        <div className='rule-content'>
          <div className='content'>
            {/* <div>
              <h3><span className='pr-10'>◕</span>比赛时间</h3>
              <ul>
                <li>4.1-4.30</li>
              </ul>
            </div> */}
            <div>
              <h3><span className='pr-10'>◕</span>获奖条件</h3>
              <ul>
                <li data-index='1)'>活动期间收益率排名前十；</li>
                <li data-index='2)'> 比赛结束时账户金额≥$300；</li>
                <li data-index='3)'>交易次数≥100次；</li>
                <li data-index='4)'> 比赛结束时，用户累计邀请好友数≥2人；</li>
                <li data-index='5)'> 获奖者必须实名认证。</li>
              </ul>
            </div>
            <div>
              <h3><span className='pr-10'>◕</span>发放方式</h3>
              <ul>
                <li>比赛奖品会在活动结束后的五个工作日内派发；（若因选手填写虚假/错误联系方式造成逾期无法联系，视为主动放弃。）</li>
              </ul>
            </div>
            <div>
              <h3><span className='pr-10'>◕</span>免责声明</h3>
              <ul>
                <li data-index='1)'>如因发生软硬件故障或其它不可控因素，造成交易处于非正常状态，天厚有权暂停相关操作，并对异常时期的买卖操作进行相应的处置。</li>
                <li data-index='2)'>对采用不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）参与活动的用户，天厚投资有权取消其获奖资格，并撤销相关违规交易及奖励。</li>
                <li data-index='3)'>本活动最终解释权归天厚投资所有。</li>
              </ul>
            </div>
          </div>
          <img src={wx} alt='' className='gd-wx' />
        </div>
        <div className='gd-footer'>
          <p>上海路思通商务咨询有限公司 沪ICP备 11045697号－3</p>
        </div>
      </React.Fragment>
    )
  }
}
export default App
