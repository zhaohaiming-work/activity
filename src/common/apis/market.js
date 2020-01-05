import config from './host'
const { tradeApi, kLineApi } = config
const marketCreate = (ajaxinstance) => {
  const market = {}
  // 实盘交易产品列表
  market.products = (postData) => {
    return ajaxinstance().get(`products`, { params:postData })
  }
  // 所有产品的配置
  market.productList = (postData) => {
    return ajaxinstance(tradeApi).get(`product/list`, { params: postData })
  }
  // k线的请求
  market.kLine = (postData) => {
    const { productCode, type, count } = postData
    // return ajaxinstance(kLineApi).get(`kline/${productCode}/${type}?st=${st || ''}&count=${count || ''}`)
    return ajaxinstance(kLineApi).get(`kline/${productCode}/${type}?count=${count || 1000}`)
  }
  return market
}

export default marketCreate
