// 非农专题
import config from './host'
const { cmApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 标记产品在线
  trade.getCmToken = (postData) => {
    return ajaxinstance(cmApi).get(`getToken`, { params: postData })
  }
  // 账户
  trade.cmAccount = (postData) => {
    return ajaxinstance(cmApi).post(`account`, postData)
  }
  // 核实
  trade.cmVerify = (postData) => {
    return ajaxinstance(cmApi).post(`hold/verify`, postData)
  }
  return trade
}

export default tradeCreate
