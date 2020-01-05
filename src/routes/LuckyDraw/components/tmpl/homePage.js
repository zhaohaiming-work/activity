import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import Header from './header'
import DrawBody from './drawBody'
import DrawOrder from './drawOrder'
class HomeView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='lucky-draw' id='luckyDraw'>
          <Header />
          <DrawBody />
          <DrawOrder />
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
