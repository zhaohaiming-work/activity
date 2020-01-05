const shareOrder = (ajaxinstance) => {
  const shareOrders = {}

  // 获取信息  /users/{id}
  shareOrders.UserInformations = (postData) => {
    return ajaxinstance.get(`users/${postData.userId}`)
  }
  return shareOrders
}

export default shareOrder
