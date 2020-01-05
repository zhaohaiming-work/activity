import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import DrawConent from './draw'
import Rule from './rule'
class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='gd-contest-container'>
          <DrawConent />
          <Rule />
        </div>
      </React.Fragment>
    )
  }
}
export default App
