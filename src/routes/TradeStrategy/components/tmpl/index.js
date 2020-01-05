import React from 'react'
// import { Button } from 'antd-mobile'
// import propTypes from 'prop-types'
import '../tradeStr'
import ListContent from './list'
import banner from 'images/trade-str/banner'
export default () => {
  return (
    <React.Fragment>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <img src={banner} alt='' style={{ display:'block', height:'auto', width:'100%' }} />
        <ListContent />
      </div>
    </React.Fragment>)
}
