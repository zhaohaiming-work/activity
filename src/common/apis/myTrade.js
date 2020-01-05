import config from './host'
const { tradeApi } = config
const myTradeCreate = (ajaxinstance) => {
  const myTrade = {}
  // 获取历史列表

  myTrade.historyListReq = (postData) => {
    return ajaxinstance(tradeApi).get(`order/history/list`, { params:postData })
  }
  // 查询结算记录
  myTrade.settlementRecords = (postData) => {
    return ajaxinstance(tradeApi).get(`account/net`, { params: postData })
  }
  // 查询隔夜费
  myTrade.feeGet = (postData) => {
    return ajaxinstance(tradeApi).get(`account/fee`, { params: postData })
  }
  // 获取用户持仓
  myTrade.accountHold = (postData) => {
    return ajaxinstance(tradeApi).get(`account/hold`, { params: postData })
  }
  // 获取委托列表
  myTrade.trustList = (postData) => {
    return ajaxinstance(tradeApi).get(`order/trust/list`, { params: postData })
  }
  return myTrade
}

export default myTradeCreate
