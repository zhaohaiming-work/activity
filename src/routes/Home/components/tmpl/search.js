import React from 'react'
// import PropTypes from 'prop-types'
import { Icon } from 'antd-mobile'
import '../HomeView.scss'
export default () => {
  const skip = () => {
    console.log(999)
  }
  return (
    <React.Fragment>
      <div className='home-search'>
        <p>hi~不能把自己饿死，为你定制以下内容</p>
        <div className='search-content'>
          <span ><Icon type='search' /></span>
          <input type='text' placeholder='有问题？点我搜搜看吧~ ' onFocus={skip} />
        </div>
      </div>
    </React.Fragment>
  )
}
