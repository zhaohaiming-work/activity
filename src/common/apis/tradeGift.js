const tradeGiftCreate = (ajaxinstance) => {
  const tradeGift = {}

  // 获取用户详情---全面一点
  tradeGift.allUserDetail = (postData) => {
    return ajaxinstance.get(`users/detail`)
  }
  // 获取每个级别对应的交易量
  tradeGift.userLevel = (postData) => {
    return ajaxinstance.get(`config/user_level`)
  }
  // 用户的分享链接
  tradeGift.userShare = (postData) => {
    return ajaxinstance.get(`users/share`)
  }
  // 用户的交易记录每日的资金记录详情
  tradeGift.assetDetail = (postData) => {
    return ajaxinstance.get(`assets`)
  }
  // 报名
  tradeGift.entryUsers = (postData) => {
    return ajaxinstance.post(`entry_users`, postData)
  }
  // 报名记录
  tradeGift.myEntry = (postData) => {
    return ajaxinstance.get(`entry_users/my_entry`)
  }
  return tradeGift
}

export default tradeGiftCreate
