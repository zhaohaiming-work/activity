import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import '../style'
// import rule from 'images/february-activity/rule'
// import Api from 'api'
import { dateFormat, fixedTow } from './filter'
import PropTypes from 'prop-types'
// import Api from 'api'
class App extends React.Component {
  state = {
    myRecordList: []
  }
  static propTypes = {
    // myRecordReq: PropTypes.func,
    myRecordList: PropTypes.any,
  }
  render () {
    const { myRecordList } = this.props
    const len = myRecordList.length > 0
    return (
      <React.Fragment>
        <div className='red-packets-record'>
          <div className='rpc-title' data-num='4'>我的开红包记录</div>
          <div className='rpc-list-container'>
            {
              len ? (
                <ul>{myRecordList.map((v, i) => {
                  return (
                    <li key={i}>
                      <div>{dateFormat(v.created_at)}</div>
                      <span>${fixedTow(+v.item_value)}</span>
                    </li>
                  )
                })} </ul>
              )
                : <div className='no-record'>暂无记录</div>
            }
          </div>
        </div>
        <div className='pd-20' />
        <div className='red-packets-rule'>
          <div><i /><span>活动规则</span><i /></div>
          <ul>
            <li data-index='1.'>活动时间：2019.2.4-2019.2.15；</li>
            <li data-index='2.'>活动期间交易量每达到100万即可获取一次开红包机会，不限次数；</li>
            <li data-index='3.'>红包金额为随机金额，1~100美金不等，打开后按照流程自动领取到你的账户本金内；</li>
            <li data-index='4.'>刷号用户不得参与此活动，提款规则参考APP内取款规则；</li>
            <li data-index='5.'>此活动最终解释权归天厚所有；</li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
