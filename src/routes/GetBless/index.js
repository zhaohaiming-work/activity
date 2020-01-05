
import { injectReducer } from 'store/reducers'

import Loadable from 'react-loadable'

import Loading from 'components/Loading'

export default (store) => {
  const reducer = require('./modules').default

  injectReducer(store, { key: 'getBless', reducer })

  return Loadable({
    loader: () => import('./containers/index'),
    loading: Loading
  })
}
