import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './commonStyle'
import { shareWeb } from 'func'
import PropTypes from 'prop-types'

export const ShareWebBtn = () => {
  const skip = () => {
    window.shareId && shareWeb(`https://activity.tophold.com/?id=${window.shareId}#/huodong`)
  }
  return <button className='invite-btn' onClick={skip}>邀请好友 一起赚钱</button>
}
export class Welfare extends React.Component {
  static propTypes = {
    children:PropTypes.node,
    hasTitle:PropTypes.bool,
    list:PropTypes.array,
    title:PropTypes.string,
  }
  render () {
    const { children, hasTitle, list = [], title } = this.props
    return (
      <React.Fragment>
        <div className='welfare-content'>
          <div className='invite-title'><span>{title || '我的福利'}</span></div>
          <div className='invite-content'>
            {
              hasTitle && <div className='invite-content-title'>
                <div>好友完成</div>
                <div>你将获得</div>
              </div>
            }
            {
              list.map((v, i) => {
                return (
                   v.img ? (
                     <div key={i} className='invite-list-img'>
                       <img src={v.img} alt='' />
                     </div>
                   ) : (
                     <div className='invite-list' key={i} style={{ marginBottom:v.bottom ? 10 : 0 }}>
                       <div className='invite-list-left'>
                         <span>{v.index}</span>
                       </div>
                       <div className='invite-list-right'>
                         <div className='left'>
                           <div>{v.friendComplete}</div>
                           <div>{v.friendCompleteValue}</div>
                         </div>
                         <span />
                         <div className='right'>
                           {v.mark && <span className='mark'>{v.mark}</span>}
                           {v.youGet}
                         </div>
                       </div>
                     </div>
                   )
                )
              })
            }
          </div>
          {children}
        </div>
      </React.Fragment>
    )
  }
}
export class Rule extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='welfare-rule mb-20'>
          <h3>活动规则</h3>
          <ul>
            <li>活动时间：2019月1月10日-2019年6月30日</li>
            <li data-index='1.'>好友实脸认证赠送$5赠金，每月$30封顶，奖励即时到账</li>
            <li data-index='2.'>好友完成交易量，你将获得100%充值赠金券</li>
            <li data-index='3.'>现金奖励每月300元封顶(好友账号－注册时间满60天将不计入活动范围)</li>
            <li data-index='4.'>返现奖励将于次月第一个工作周内发放完毕；</li>
            <li data-index='5.'>同一好友注册账号完成以上任务（注册、交易量、进入实盘排名、充值）将获得一次抽奖机会
            ，奖品最低200手机充值，最高iphone8（抽奖机会每天最多1次）</li>
            <li>［免责声明］</li>
            <li data-index='1.'>同一终端设备号、同一手机号、同一领奖地址等合理显示为同一用户的情形，均视为同一用户; </li>
            <li data-index='2.'>通过不正当手段获得奖励，天厚实盘有权撤销奖励及封禁作弊账户；针对充值后有作弊行为的账户，天厚实盘有权将该账户回档到产生作弊行为之前的资金情况； </li>
            <li data-index='3.'>如对本活动规则有任何疑问，请联系天厚客服：400-118-0770 (周一至周五 9:00-18:00） </li>
            <li data-index='4.'>本活动最终解释权归天厚投资所有。</li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
