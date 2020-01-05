import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'
import 'babel-polyfill'
// import { loading, hideNews } from 'func'
// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)
// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')
let render = () => {
  const App = require('./App').default
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  )
}
// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }
    render = () => {
      try {
        renderApp()
      } catch (e) {
        renderError(e)
        console.error(e)
      }
    }
    // Setup hot module replacement
    module.hot.accept([
      './App',
      './routes/index',
    ], () => Promise.resolve()
        .then(() => ReactDOM.unmountComponentAtNode(MOUNT_NODE))
        .then(render)
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
