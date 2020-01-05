// import Counter from './Counter'
// export default Counter
import Loadable from 'react-loadable'

import Loading from 'components/Loading'
// 主页面
export const HomePage = (
  Loadable({
    loader: () => import('./counter.js'),
    loading: Loading
  })
)
