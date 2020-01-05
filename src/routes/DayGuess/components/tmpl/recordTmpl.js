import React from 'react'
// import { Accordion, Flex } from 'antd-mobile'
import propTypes from 'prop-types'
import '../guess'
import Api from 'api'
import RecordList from './recordList'
import { newCatchToken } from 'components/commonFun'
import * as Cookies from 'js-cookie'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { connect } from 'react-redux'

class App extends React.Component {
  state = {
    renderList: []
  }
  componentDidMount () {
    window.getGuessJf = this.getJf
    newCatchToken(() => {
      if (!Cookies.get('token')) {
        window.loginType = false
        this.props.changeLoginStatus(false)
      } else {
        this.props.changeLoginStatus(true)
        window.loginType = true
        Promise.resolve()
        .then(this.getData)
        .then(this.getJf)
      }
    })
  }
  getJf=() => {
    Api.getLoginUserNews()
    .then(res => {
      window.guessJf = res.user.jifen || 0
    })
    .catch(() => this.props.changeLoginStatus(false))
  }
  getData = () => {
    Api.quizItems({
      page: 1,
      per_page: 200,
    })
      .then(res => {
        window.loginType = true
        this.setState({
          renderList: res.quiz_items || []
        })
      })
      .catch((error) => {
        const { response = {} } = error
        const { status } = response
        this.setState({ renderList: [] })
        if (+status === 401) {
          window.loginType = false
          this.props.changeLoginStatus(false)
        }
      })
  }
  componentWillUnmount () {
    this.props.changeLoginStatus(false)
  }
  render () {
    const { renderList = [] } = this.state
    const { loginStatus } = this.props
    const len = renderList.length > 0
    let num = 0
    renderList.map(v => {
      if (+v.status === 2) {
        num += 1
      }
    })
    return (
      <div className='content-out-side'>
        <div className='flower'><span />• 竞猜记录 •<span /></div>
        {
         len && <div className='guess-num' style={{ opacity: `${(loginStatus || num) ? 1 : 0}` }}>
           <span>共猜对:{num || ' -- '}次</span>
         </div>
        }
        {
          len ? <RecordList renderList={renderList} /> : <div className='no-list'>
            暂时没有竞猜记录
         </div>
        }
      </div>
    )
  }
}
App.propTypes = {
  // count: propTypes.any,
  changeLoginStatus: propTypes.func,
  loginStatus: propTypes.bool
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
