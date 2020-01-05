import React from 'react'
import { Route } from 'react-router-dom'
import propTypes from 'prop-types'
import HomePage from './tmpl/homePage'
import BackPassword from './tmpl/backPassword'
const Main = ({ match }) => (
  <React.Fragment>
    <Route exact path={`${match.url}/password/back-password`} component={BackPassword} />
    <Route exact path={`${match.url}/:history`} component={HomePage} />
  </React.Fragment>
)
Main.propTypes = {
  match:propTypes.object
}
export default Main
