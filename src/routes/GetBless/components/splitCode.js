
import Loadable from 'react-loadable'

import Loading from 'components/Loading'
// 主页面
export const HomePage = (
  Loadable({
    loader: () => import('./tmpl/homePage.js'),
    loading: Loading
  })
)
