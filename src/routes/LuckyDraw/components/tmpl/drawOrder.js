import React from 'react'
import { connect } from 'react-redux'
// import Api from 'api'
import { Carousel } from 'antd-mobile'
import '../style'
import './lucky'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { drawType } from './filter'
import Api from 'api'
import PropTypes from 'prop-types'
import { goLogin } from 'func'

class App extends React.Component {
  state = {
    visibleCarousel: false,
    drawList: []
  }
  static propTypes={
    visibleRuleModal:PropTypes.func,
    changeModalType:PropTypes.func,
    loginStatus:PropTypes.bool
  }
  componentDidMount () {
    this.getDrawsList()
  }
  // 获取抽奖列表
  getDrawsList = () => {
    this.setState({ visibleCarousel: false })
    Api.luckyDrawAllLogs({ page: 1, per_page: 100 })
      .then(res => {
        this.setState({ drawList: res.lucky_draw_users })
        setImmediate(() => this.setState({ visibleCarousel: true }))
      })
  }
  openModal=() => {
    const { visibleRuleModal, changeModalType, loginStatus } = this.props
    if (!loginStatus) {
      goLogin()
      return
    }
    changeModalType(false)
    setImmediate(() => visibleRuleModal(true))
  }
  render () {
    const { visibleCarousel, drawList } = this.state
    const arr = []
    drawList.map(v => {
      if (+v.item_category !== -1) {
        arr.push(v)
      }
    })
    return (
      <React.Fragment>
        <p className='p-rule'><span>抽奖规则：</span>每次抽奖消耗20个积分，每天不限制次数</p>
        <div className='pt-20 pb-20'>
          <div className='draw-rule-container' onClick={this.openModal}>我的奖品</div>
        </div>
        <div className='winning-order-container mb-20'>
          <div className='winning-order'>
            <div className='left'>
              <span>中</span>
              <span>奖</span>
              <span>名</span>
              <span>单</span>
            </div>
            <div className='right'>
              {
                visibleCarousel && <Carousel className='my-carousel'
                  vertical
                  dots={false}
                  dragging={false}
                  swiping={false}
                  autoplay
                  infinite
                  speed={600}
                  autoplayInterval={600}
                  resetAutoplay
                >
                  {arr.map((v, i) => <div key={i} className='v-item'>
                    <span className='name'>{v.user ? v.user.name : ''}</span>
                    <span className='pl-5' />
                    在积分抽奖中获得
                    <span>“{drawType(v)}”</span>
                  </div>)}
                </Carousel>
              }
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
