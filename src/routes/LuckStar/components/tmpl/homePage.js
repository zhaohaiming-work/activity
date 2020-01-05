import React from 'react'
import { Modal } from 'antd-mobile'
import App from './test.js'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
// import PropTypes from 'prop-types'
// import '../huodong'
// import { createForm } from 'rc-form'
class HomeView extends React.Component {
  state = {
  }
  componentDidMount () {
  }
  render () {
    console.log(this.props)
    return (
      <React.Fragment>
        <App />
      </React.Fragment>
    )
  }
}

export default HomeView
