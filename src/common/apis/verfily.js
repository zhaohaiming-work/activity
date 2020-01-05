// import config from './host'
// const { tradeApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 标记产品在线
  trade.verifyToken = (postData = {}) => {
    return ajaxinstance().get(`advanced_identities/h5_verify_token`, { params: postData })
  }

  return trade
}

export default tradeCreate
