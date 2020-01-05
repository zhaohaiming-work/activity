import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import EggContent from './eggContent'
import { bg, bigTitle, time, gonglueTitle, gonglueContent, ruleTitle } from './imgConfig'
import Rule from './rule'
const bgStyle = {
  backgroundImage: `url(${bg})`
}
class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='golden-egg-container' id='goldenEgg' style={bgStyle}>
          <img className='img-style' src={bigTitle} alt='' style={{ width:'80%', marginTop:50 }} />
          <img className='img-style' src={time} alt='' style={{ width:'60%', marginTop:30 }} />
          {/* <Mask /> */}
          <EggContent />
          <img className='img-style' src={gonglueTitle} alt='' style={{ width:'30%', marginTop:60 }} />
          <img className='img-style' src={gonglueContent} alt='' style={{ width:'95%', marginTop:50 }} />
          <img className='img-style' src={ruleTitle} alt='' style={{ width:'30%', marginTop:50 }} />
          <Rule />
        </div>
      </React.Fragment>
    )
  }
}
export default App
