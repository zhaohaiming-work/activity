import Loadable from 'react-loadable'
import Loading from 'components/Loading'
export default () => {
  return Loadable({
    loader: () => import('./page'),
    loading: Loading
  })
}
