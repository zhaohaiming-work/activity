import React from 'react'
// import Api from 'api'
import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import '../style'
import top from 'images/february-activity/top'
import Api from 'api'
import PropTypes from 'prop-types'
import { fixedTow } from './filter'
class App extends React.Component {
  state = {
    drawList: [],
    visibleCarousel: false,
  }
  static propTypes={
    redRecordNews:PropTypes.object,
    loginStatus:PropTypes.bool
  }
  componentDidMount () {
    this.getDrawsList()
  }
  // 获取抽奖列表
  getDrawsList = () => {
    this.setState({ visibleCarousel: false })
    Api.redPacketsAllLogs({ page: 1, per_page: 150 })
      .then(res => {
        this.setState({ drawList: res.lucky_draw_users })
        setImmediate(() => this.setState({ visibleCarousel: true }))
      })
  }
  render () {
    const { redRecordNews, loginStatus } = this.props
    const { visibleCarousel, drawList } = this.state
    const tradeNum = redRecordNews.trade_volume || 0
    return (
      <React.Fragment>
        <div className='red-packets-header'>
          <img src={top} alt='' />
          {loginStatus && <div className='trade-amount'>当前交易量:{tradeNum}</div>}
          <div className='rp-draw-list'>
            {
                visibleCarousel && <Carousel
                  vertical
                  dots={false}
                  dragging={false}
                  swiping={false}
                  autoplay
                  infinite
                >
                  {drawList.map((v, i) => <div key={i} className='v-item'>
                    <span className='name'>{v.user ? v.user.name : ''}</span>
                    开红包获得<span>${fixedTow(+v.item_value)}</span>
                  </div>)}
                </Carousel>
              }
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
