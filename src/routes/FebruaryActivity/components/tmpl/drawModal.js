import React from 'react'
// import Api from 'api'
// import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import '../style'
import tp2 from 'images/february-activity/top-2.jpg'
// import Api from 'api'
import PropTypes from 'prop-types'
import { fixedTow } from './filter'
class App extends React.Component {
  state = {
    drawList: [],
    visibleCarousel: false,
  }
  static propTypes={
    close:PropTypes.func,
    news:PropTypes.object,
  }

  componentDidMount () {
    document.getElementById('redPacketsContainer').style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.getElementById('redPacketsContainer').style.overflow = 'auto'
  }

  render () {
    const { close, news } = this.props
    return (
      <React.Fragment>
        <div className='red-packets-modal'>
          <div className='modal-container'>
            <div className='modal-body'>
              <div className='modal-content'>
                <div className='money-content'>
                  <h3>恭喜您</h3>
                  <p>获得<span>${fixedTow(+news.item_value)}</span> 本金红包</p>
                </div>
              </div>
              <div className='tophlod-img'>
                <img src={tp2} alt='' />
              </div>
              <div className='tophold-title'>
              天厚实盘
              </div>
            </div>
            <button onClick={close}>确定</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
