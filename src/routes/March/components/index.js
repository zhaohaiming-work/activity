import React from 'react'
import { Route } from 'react-router-dom'
import propTypes from 'prop-types'
import { HomePage } from './splitCode'
const Main = ({ match }) => (
  <React.Fragment>
    <Route exact path={`${match.url}`} component={HomePage} />
  </React.Fragment>
)
Main.propTypes = {
  match:propTypes.object
}
export default Main
