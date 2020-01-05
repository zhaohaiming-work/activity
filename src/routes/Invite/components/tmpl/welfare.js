import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './commonStyle'
import { Welfare, ShareWebBtn } from './commonTmpl'
import myFlArr, { friendFlArr } from './listConfig'
class HomeView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Welfare hasTitle list={myFlArr}><div className='pt-10' /></Welfare>
        <Welfare list={friendFlArr} title='好友的福利'>
          <ShareWebBtn />
        </Welfare>
      </React.Fragment>
    )
  }
}
export default HomeView
