import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './lucky'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import Api from 'api'
import { dateFormat, drawType } from './filter'
const Rule = () => (
  <ul className='rule-list'>
    <li>1.活动期间用户每天交易一次即可抽奖一次，每天一次抽奖机会</li>
    <li>2.奖品设置为$0.1、$0.5、$1、$2、$5、$10、$100、$1000直接入账到本金，如有疑问请咨询客服</li>
    <li>3.对采用不正当手段（包括但不限于作弊、刷单、恶意套现等）参与活动的用户，天厚投资有权取消其资格，并撤销相关违规交易及奖励</li>
    <li>4.如活动受到各种情况的意外问题需要终止，天厚无需为此承担相应的赔偿或补偿</li>
    <li>5.本活动最终解释权归天厚投资所有</li>
  </ul>
)
class App extends React.Component {
  static propTypes={
    isGz:PropTypes.bool,
    visibleRuleModal:PropTypes.func
  }
  state={
    myDrawList:[]
  }
  componentDidMount () {
    // this.props.jpcReq()
    document.getElementById('luckyDraw').style.overflow = 'hidden'
    const { isGz } = this.props
    if (!isGz) {
      this.myDraws()
    }
  }
  // 获取抽奖列表
  myDraws=() => {
    Api.myLuckyDraws({
      page:1,
      per_page:200
    })
    .then(res => {
      // this.setState({ visibleDraw:true })
      this.setState({
        myDrawList:res.lucky_draw_users || [],
      })
    })
  }
  componentWillUnmount () {
    document.getElementById('luckyDraw').style.overflow = 'auto'
    this.props.visibleRuleModal(false)
  }
  closeModal=() => this.props.visibleRuleModal(false)
  render () {
    const { isGz } = this.props
    const { myDrawList } = this.state
    const storeList = []
    myDrawList.map(v => {
      if (+v.item_category !== -1) {
        storeList.push(v)
      }
    })
    return (
      <React.Fragment>
        <div className='my-draw-modal'>
          <div className='my-draw-body'>
            <h3>{isGz ? '活动规则' : '我的奖品'}</h3>
            <div className='line' />
            <div className='my-draw-content'>
              {
                isGz ? <Rule /> : (storeList.length
                ? storeList.map((v, i) => <div key={i}>{dateFormat(v.created_at)} 抽中 {drawType(v)}</div>)
                : <h2>没有抽奖记录</h2>)
              }
            </div>
            <button onClick={this.closeModal}>我知道了</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
