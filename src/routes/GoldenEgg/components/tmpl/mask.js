import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import modalImg from 'images/egg/modal'
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes={
    close:PropTypes.func,
    news:PropTypes.any,
  }
  componentDidMount () {
    document.getElementById('goldenEgg').style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.getElementById('goldenEgg').style.overflow = 'auto'
  }

  render () {
    const { close, news } = this.props
    return (
      <React.Fragment>
        <div className='ge-mask'>
          <div className='ge-mask-container'>
            <p>${(news.item_value || 0).toFixed(2)}</p>
            <img src={modalImg} alt='' />
            <button onClick={close}>确定</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
