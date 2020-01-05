import React from 'react'
import { connect } from 'react-redux'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './lucky'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import PropTypes from 'prop-types'
class App extends React.Component {
  componentDidMount () {
    this.props.jpcReq()
  }
  static propTypes={
    jpcList:PropTypes.any,
    jpcReq:PropTypes.func,
  }
  render () {
    const { jpcList } = this.props
    return (
      <React.Fragment>
        <ul className='draw-list'>
          <li>
            <div className={jpcList[0].active ? 'active' : ''}>
              <img src={jpcList[0].image_url} alt='' />
              <p>{jpcList[0].title}</p>
            </div>
          </li>
          <li>
            <div className={jpcList[1].active ? 'active' : ''}>
              <img src={jpcList[1].image_url} alt='' />
              <p>{jpcList[1].title}</p>
            </div>
          </li>
          <li>
            <div className={jpcList[2].active ? 'active' : ''}>
              <img src={jpcList[2].image_url} alt='' />
              <p>{jpcList[2].title}</p>
            </div>
          </li>
        </ul>
        <ul className='draw-list'>
          <li>
            <div className={jpcList[7].active ? 'active' : ''}>
              <img src={jpcList[7].image_url} alt='' />
              <p>{jpcList[7].title}</p>
            </div>
          </li>
          <li>
            <div className={jpcList[3].active ? 'active' : ''}>
              <img src={jpcList[3].image_url} alt='' />
              <p>{jpcList[3].title}</p>
            </div>
          </li>
        </ul>
        <ul className='draw-list'>
          <li>
            <div className={jpcList[6].active ? 'active' : ''}>
              <img src={jpcList[6].image_url} alt='' />
              <p>{jpcList[6].title}</p>
            </div>
          </li>
          <li>
            <div className={jpcList[5].active ? 'active' : ''}>
              <img src={jpcList[5].image_url} alt='' />
              <p>{jpcList[5].title}</p>
            </div>
          </li>
          <li>
            <div className={jpcList[4].active ? 'active' : ''}>
              <img src={jpcList[4].image_url} alt='' />
              <p>{jpcList[4].title}</p>
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
