import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import bg from 'images/february-activity/eryue-yaoqing'
class App extends React.Component {
  skip=() => (location.href = 'tophold://tophold.app/slide/invite')
  render () {
    return (
      <React.Fragment>
        <div className='feb-act-counter'>
          <div className='feb-act-invite'>
            <img src={bg} alt='' />
            <div className='btn' onClick={this.skip} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
