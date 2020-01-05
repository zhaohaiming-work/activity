import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
// import bg from 'images/bless/bg.png'
import InviteHeader from './inviteHeader'
import Welfare from './welfare'
import { Rule } from './commonTmpl'
class HomeView extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='invite-container' id='inviteContainer'>
          <InviteHeader />
          <Welfare />
          <Rule />
        </div>
      </React.Fragment>
    )
  }
}
export default HomeView
