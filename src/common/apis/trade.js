import config from './host'
const { tradeApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 标记产品在线
  trade.productsOline = (postData) => {
    return ajaxinstance().post(`products/${postData.id}/online`, postData)
  }
  // 获取用户基本信息
  trade.account = (postData) => {
    return ajaxinstance(tradeApi).get(`account`, { params: postData })
  }
  // 产品详情
  trade.productsDetail = (postData) => {
    return ajaxinstance().get(`products/${postData.id}`)
  }
  // 获取盈亏信息
  trade.accountDetail = (postData) => {
    return ajaxinstance(tradeApi).get(`account/net/${postData.accountId}/${postData.netId}`)
  }
  // account/net/XIO6141.001/c619a309-ba57-11e8-864d-00163e0616cc
  // 获取用户持仓
  trade.accountHold = () => {
    return ajaxinstance(tradeApi).get(`account/hold`)
  }
  // 交易策略
  trade.marketArticles = (postData) => {
    return ajaxinstance().get(`market_articles`, { params: postData })
  }
  return trade
}

export default tradeCreate
