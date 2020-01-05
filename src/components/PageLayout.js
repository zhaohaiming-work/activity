import React from 'react'
import propTypes from 'prop-types'
const PageLayout = props => (
  <div className='layout-content'>{props.children}</div>
)
PageLayout.propTypes = {
  children:propTypes.node
}

export default PageLayout
