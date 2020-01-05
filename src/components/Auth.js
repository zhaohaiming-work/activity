import React from 'react'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
const Auth = props => <div>{props.children}</div>
Auth.propTypes = {
  children:propTypes.node
}

export default withRouter(Auth)
