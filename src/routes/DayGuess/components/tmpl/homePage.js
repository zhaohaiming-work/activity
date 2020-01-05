import React from 'react'
// import { Accordion, Flex } from 'antd-mobile'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
// import PropTypes from 'prop-types'
import '../guess'
// import { back4Android, hanlerIos, isAndroid, history, catchToken } from 'components/commonFun'
// import { catchToken } from 'func'
// import Api from 'api'
import mrjcTop from 'images/guess/mrjc_top'
import BetTmpl from './betTmpl'
import RecordTmpl from './recordTmpl'
const headerStyle = {
  backgroundImage: `url('${mrjcTop}')`,
  backgroundSize: '100% auto',
  backgroundRepeat:'no-repeat'
}
class HomeView extends React.Component {
  state = {
    visible: true,
    visibleTime: true
  }
  render () {
    return (
      <React.Fragment>
        <div className='guess-container' id='guessContainer'>
          <div className='guess-side' style={headerStyle}>
            <div className='guess-header' />
            <BetTmpl />
            <div className='pd-5' />
            <RecordTmpl />
            <div className='pd-5' />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default HomeView
