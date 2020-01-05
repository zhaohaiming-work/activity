import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import PagelLayout from 'components/PageLayout'
import Home from './routes/Home/index'
import base from './routes/index'
import { setupWebViewJavascriptBridge, connectWebViewJavascriptBridge4Android,
   hideNews, judgeDevice, } from 'components/commonFun'
const { newJudgeAndroidApp, newJudgeIosApp } = judgeDevice
class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  componentDidMount () {
    // 初始化快速点击
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
      }, false)
    }
    if (newJudgeAndroidApp) {
      // alert('anzuo')
      // 安卓第一次桥接初始化
      connectWebViewJavascriptBridge4Android(function (bridge) {
        bridge.init(function (message, responseCallback) {})
      })
    }
    if (newJudgeIosApp) {
      // ios第一次桥接初始化
      setupWebViewJavascriptBridge(function (bridge) {
        // bridge.init(function (message, responseCallback) {})
      })
    }
  }
  shouldComponentUpdate () {
    return false
  }
  componentWillUnmount () {
    hideNews()
  }
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/' component={({ match }) => (
              <PagelLayout>
                <Route exact path={match.url} component={Home} />
                {base(store)}
              </PagelLayout>)}
              />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}
export default App
