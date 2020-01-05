import React from 'react'
import { connect } from 'react-redux'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import './lucky'
import './draw-modal'
import popwin from 'images/huodong/pop_win'
import popno from 'images/huodong/pop_no'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes={
    visibleModalFun:PropTypes.func,
    userDraw:PropTypes.any,
    jpcList:PropTypes.any,
  }
  state={
    myDrawList:[]
  }
  componentDidMount () {
    // this.props.jpcReq()
    document.getElementById('luckyDraw').style.overflow = 'hidden'
  }

  componentWillUnmount () {
    document.getElementById('luckyDraw').style.overflow = 'auto'
  }
  render () {
    // console.log(this.props)
    const { userDraw, jpcList, visibleModalFun } = this.props
    let url = ''
    let isBlank = false
    let jp = ''
    jpcList.map(v => {
      if (+userDraw.item_category === +v.item_category && +userDraw.item_value === +v.item_value) {
        if (+userDraw.item_category === -1) {
          url = popno
          isBlank = true
        } else {
          url = v.image_url
          isBlank = false
          jp = v.title
        }
      }
    })
    return (
      <React.Fragment>
        <div className='draw-modal-container'>
          <div className='my-draw-body'>
            <img className='title' src={popwin} alt='' />
            <div className='draw-content'>
              <img src={url} alt='' />
              <p>{isBlank ? '坚持的人运气不会一直差' : `恭喜你抽中了${jp}`}</p>
              <button onClick={visibleModalFun}>我知道了</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
