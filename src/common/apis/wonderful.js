// import config from './host'
// const { tradeApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 点赞统计
  trade.wonderfulTotal = (postData = {}) => {
    return ajaxinstance().get(`new_year_activities/detail`, { params: postData })
  }
  // 帮某个用户继赞
  trade.wonderfulActive = (postData = {}) => {
    return ajaxinstance().post(`new_year_activities`, postData)
  }
  // 有没帮当前用户点过赞
  trade.isWonderful = (postData = {}) => {
    return ajaxinstance().get(`new_year_activities/liked`, { params: postData })
  }
  // 充值到账户
  trade.wonderfulDeposit = (postData = {}) => {
    return ajaxinstance().get(`new_year_activities/deposit`, { params: postData })
  }
  // 提现列表
  trade.wonderfulLit = (postData = {}) => {
    return ajaxinstance().get(`new_year_activities/list`, { params: postData })
  }
  return trade
}

export default tradeCreate
