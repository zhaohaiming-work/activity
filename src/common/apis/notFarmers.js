// 非农专题
// import config from './host'
// const { tradeApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 标记产品在线
  trade.nfComments = (postData) => {
    return ajaxinstance().get(`comments`, { params: postData })
  }
  trade.sendComments = (postData) => {
    return ajaxinstance().post(`comments`, postData)
  }
  // 点赞
  trade.praise = (postData) => {
    return ajaxinstance().post(`comments/${postData.id}/like`, postData)
  }
  return trade
}

export default tradeCreate
