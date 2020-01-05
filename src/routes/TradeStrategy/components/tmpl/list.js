import React from 'react'
// import { Result } from 'antd-mobile'
import propTypes from 'prop-types'
import '../tradeStr'
import Api from 'api'
const formatDate = (data = '') => {
  const originDate = new Date(data).getTime()
  const nowDate = new Date().getTime()
  const diff = nowDate - originDate
  if (diff <= 3600000) {
    const d = Math.ceil(diff / 1000 / 60)
    return `${d !== 60 ? d : '59'}分钟前`
  } else {
    return data.replace(/2018-/, '').replace(/T/, ' ').replace(/\+.*/, '')
  }
}
const List = ({ data = {} }) => {
  const { title, content, side } = data
  return (
    <React.Fragment>
      <div className='trade-str-list'>
        <div className='top'>
          <h4>{data.product_name || ''}</h4>
          <span className={+side === 1 ? 'red' : 'green'}>看{+side === 1 ? '多' : '空'}</span>
          <span className='time'>{formatDate(data.published_at)}</span>
        </div>
        <div className='content'>{content}</div>
        <div className='blank'>—{title}</div>
      </div>
      <div className='trade-str-mark' />
    </React.Fragment>
  )
}
List.propTypes = {
  data: propTypes.object
}
const LoadingBtn = ({ isBlank, onClick }) => {
  return (
    <React.Fragment>
      {isBlank && (
        <div className='loading-btn bordered-grey-bottom' onClick={onClick}>
          <span className='iconfont'>&#xe62b;</span>
          点击加载更多
      </div>
      )
      }
    </React.Fragment>
  )
}
LoadingBtn.propTypes = {
  isBlank: propTypes.bool,
  onClick: propTypes.func
}
class ListContent extends React.Component {
  state = {
    renderList: [],
    page: 1,
    isBlank: false
  }
  componentDidMount () {
    this.getData()
  }
  getData = () => {
    const { page } = this.state
    Api.marketArticles({
      'q[category_eq]': 2,
      // 'q[side_eq]':2,
      'q[product_name_eq]': '',
      'q[s]': 'published_at desc',
      page,
      per_page: 20,
    })
      .then(res => {
        const data = res.market_articles
        const { renderList } = this.state
        this.setState({ renderList: [...renderList, ...data] }, () => {
          const { renderList } = this.state
          if (renderList.length < 20 && data.length !== 0) {
            this.setState({ isBlank: false })
            return
          }
          if (!data.length) {
            this.setState({ isBlank: false })
          }
        })
      })
  }
  load = () => {
    const { page } = this.state
    this.setState({
      page: page + 1
    }, this.getData)
  }
  render = () => {
    const { renderList, isBlank } = this.state
    return (
      <React.Fragment>
        {renderList.map(v => <List key={v.id} data={v} />)}
        <LoadingBtn isBlank={isBlank} onClick={this.load} />
        <div className='pd-5' />
      </React.Fragment>
    )
  }
}
export default ListContent
