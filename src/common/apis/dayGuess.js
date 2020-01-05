
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 今日推荐的一个竞猜
  trade.guessToday = (postData) => {
    return ajaxinstance().get(`quizzes/today`, { params: postData })
  }
  // 账户quiz_items

  trade.betting = (postData) => {
    return ajaxinstance().post(`quiz_items`, postData)
  }
  trade.quizItems = (postData) => {
    return ajaxinstance().get(`quiz_items`, { params: postData })
  }
  return trade
}

export default tradeCreate
