import React from 'react'
import { history } from 'func'
import './HomeView.scss'
import home from 'images/home/home'
class HomeView extends React.Component {
  componentDidMount = () => {
  }
  skip=() => {
    history.push('/market')
  }
  render () {
    return (
      <div className='home-container'>
        <img src={home} alt='' style={{ width:'100%', height:'auto' }} />
      </div>
    )
  }
}

export default HomeView
