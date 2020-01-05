import React from 'react'
import { Route } from 'react-router-dom'
import propTypes from 'prop-types'
import { HomePage } from './routes'
const Main = ({ match }) => ( // 路由4.0得自带得，里面封装了很多得东西 match.url指向当前得路径demo
  <React.Fragment>
    <Route exact path={`${match.url}`} component={HomePage} />
  </React.Fragment>
)
Main.propTypes = {
  match:propTypes.object
}
export default Main
