import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
// import bg from 'images/february-activity/eryue-yaoqing'
import RpAction from './rpAction'
import RpRecord from './rpRecord'
import RpHeader from './rpHeader'
class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='red-packets-container' id='redPacketsContainer'>
          <RpHeader />
          <RpAction />
          <RpRecord />
        </div>
      </React.Fragment>
    )
  }
}
export default App
