import React from 'react'
import propTypes from 'prop-types'
// import { Nav } from './commonTmpl'
const hasNav = () => {
  const hash = window.location.hash.replace(/#\//, '').replace(/\/.*/, '').replace(/\?.*/, '')
  switch (hash) {
    case 'counter':
    case 'login':
    case '':
      return null
    default:
      // return <Nav title='...' />
      return null
  }
}
const Loading = ({ isLoading, error }) => {
  if (isLoading) {
    return hasNav()
  } else if (error) {
    return <div>页面加载失败.</div>
  } else {
    return null
  }
}
Loading.propTypes = {
  isLoading:propTypes.bool,
  error:propTypes.any
}
export default Loading
