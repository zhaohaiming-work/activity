import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <ul className='golden-egg-rule'>
          <li data-index='1.'>活动时间：2019.2.20-2019.3.7；</li>
          <li data-index='2.'>每个级别的奖励均可累计获得，例：某用户一次性充值1500美金，则前三个级别的蛋均可砸开并非只能砸开黄金蛋；</li>
          <li data-index='3.'>上述的充值、交易量均为活动期间累计计算，并非一次性充值或交易，抽奖均为本金；</li>
          <li data-index='4.'>天厚的合作账户及其关联账户不得参与此活动，充值后无交易行为或只有少量交易行为的用户视为刷号用户，其抽奖的提现规则参照纯赠金盈利账户规则；</li>
          <li data-index='5.'>每级的奖励数量有限，送完即止，先到先得。天厚可根据活动情况适当增加奖励数量，请随时关注；</li>
          <li data-index='6.'>本活动最终解释权归天厚所有；</li>
        </ul>
      </React.Fragment>
    )
  }
}
export default App
