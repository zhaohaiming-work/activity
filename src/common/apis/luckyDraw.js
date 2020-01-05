// import config from './host'
// const { tradeApi } = config
const luckyCreate = (ajaxinstance) => {
  const lucky = {}
  // 当前登录用户的详细信息
  lucky.getLoginUserNews = (postData) => {
    return ajaxinstance().get(`users/detail`, { params:postData })
  }
  // 积分抽奖
  lucky.pointsLucky = (postData) => {
    return ajaxinstance().post(`lucky_draws/points_lucky`)
  }
   // 积分抽奖新的
  lucky.newPointsLucky = (postData) => {
    return ajaxinstance().post(`lucky_draws/points`)
  }
  // 积分抽奖的积分池
  lucky.luckyDrawJpc = (postData) => {
    return ajaxinstance().get(`lucky_draws/items`, { params:{ symbol:'points' } })
  }
  // 积分中奖列表
  lucky.luckyDrawsList = (postData) => {
    return ajaxinstance().get(`lucky_draws`, { params:postData })
  }
  // 我的积分中奖列表
  lucky.myDraws = (postData) => {
    return ajaxinstance().get(`lucky_draws/my`, { params:postData })
  }
  // 我的抽奖记录 -- 交易抽奖
  lucky.myTradeDraws = (postData) => {
    return ajaxinstance().get(`lucky_draws/my_items`, { params:postData })
  }
  // 单次交易每日可抽奖一次
  lucky.tradeDayLucky = (postData) => {
    return ajaxinstance().get(`lucky_draws/trade_day_lucky`, { params:postData })
  }
  // 个人交易抽奖记录
  lucky.tradeDrawItems = (postData) => {
    return ajaxinstance().get(`lucky_draws/items`, { params:{ symbol:'trade_day' } })
  }
  // 某一个抽奖对应的中奖记录
  lucky.tradeDrawAllLogs = (postData) => {
    return ajaxinstance().get(`lucky_draws/all_logs`, { params:{ symbol:'trade_day' } })
  }
  // 积分中奖记录
  lucky.luckyDrawAllLogs = (postData) => {
    return ajaxinstance().get(`lucky_draws/all_logs`, { params:{ symbol:'points', ...postData } })
  }
  // 交易红包中奖纪录
  lucky.redPacketsAllLogs = (postData) => {
    return ajaxinstance().get(`lucky_draws/all_logs`, { params:{ symbol:'new_year', ...postData } })
  }
  // 积分我的中奖纪录
  lucky.myLuckyDraws = (postData) => {
    return ajaxinstance().get(`lucky_draws/my_items`, { params:{ ...postData, symbol:'points' } })
  }
 // 交易红包中奖纪录
  lucky.myRedPacketsRecord = (postData) => {
    return ajaxinstance().get(`lucky_draws/my_items`, { params:{ ...postData, symbol:'new_year' } })
  }
  // 双十二
  lucky.doubleTwList = (postData = {}) => {
    return ajaxinstance().get(`users/20181212`, { params:postData })
  }
  // 抽奖
  lucky.doubleTwDraw = (postData = {}) => {
    return ajaxinstance().get(`lucky_draws/20181212`, { params:postData })
  }
  // 2019春节福卡活动数据
  lucky.getBlessCard = (postData = {}) => {
    return ajaxinstance().get(`users/20190201`, { params:postData })
  }
  // 春节集五福领取充值金额
  lucky.getBlessMoney = (postData = {}) => {
    return ajaxinstance().get(`new_year_activities/deposit_0201`, { params:postData })
  }
  // 2019迎新春抽红包数据
  lucky.readyGetRedPackets = (postData = {}) => {
    return ajaxinstance().get(`users/20190204`, { params:postData })
  }
  // 迎新春开红包
  lucky.actionRedPackets = (postData = {}) => {
    return ajaxinstance().get(`lucky_draws/activities/new_year`, { params:postData })
  }
  // 邀请奖励
  lucky.invitedBonus = (postData = {}) => {
    return ajaxinstance().get(`users/invited_bonus`, { params:postData })
  }
  // 2019砸金蛋
  lucky.getClickEggNews = (postData = {}) => {
    return ajaxinstance().get(`users/20190215`, { params:postData })
  }
  // 2019砸金蛋 20192月底充值抽奖
  lucky.clickEgg = (postData = {}) => {
    return ajaxinstance().get(`lucky_draws/activities/20190215`, { params:postData })
  }
  // 充值无条件100%赠金-助力植树节
  lucky.arborTree = (postData = {}) => {
    return ajaxinstance().post(`gift_orders/activities/arbor`, postData)
  }
  // 兑换交易有好礼-助力女生节
  lucky.marchGift = (postData = {}) => {
    return ajaxinstance().post(`gift_orders/activities/20190308`, postData)
  }
  // 2019女神节植树节活动数据
  lucky.marchTreeNews = (postData = {}) => {
    return ajaxinstance().get(`users/20190306`)
  }
  return lucky
}

export default luckyCreate
