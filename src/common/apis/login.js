const loginCreate = (ajaxinstance) => {
  const login = {}

  // login.login = (postData) => {
  // return ajaxinstance.post('tomato_login?username=' + postData.username + '&password=' + postData.password, postData)
  // }
  // login.validateTicket = (postData) => {
  //   return ajaxinstance.get('validateTicket', { params: postData })
  // }
  // // 获取微信的
  // login.getJsapiSignRest = (postData) => {
  //   return ajaxinstance.post('wechat/getJsapiSignRest?url=' + postData)
  // }
  // // 菜单权限
  // login.getMenu = (postData = {}) => {
  //   return ajaxinstance.get('getMenu')
  // }
  // 先校验本地的二维码
  login.captchaurl = (postData) => {
    return ajaxinstance.get('users/captcha_url', { params: postData })
  }
  // 发送验证码
  login.sendcodewithcaptcha = (postData) => {
    return ajaxinstance.post('users/send_code_with_captcha', postData)
  }
  // 创建用户
  login.createUser = (postData) => {
    return ajaxinstance.post('users', postData)
  }
  // 获取用户详情
  login.userDetail = (postData) => {
    return ajaxinstance.get(`users/${postData.id}`)
  }
  // 用户登录
  login.login = (postData) => {
    return ajaxinstance.post(`users/login`, postData)
  }
  // 发送找回密码手机验证码
  login.sendPasswordCode = (postData) => {
    return ajaxinstance.post(`users/send_password_code`, postData)
  }
  // 通过验证码更改用户密码

  login.updatePasswordWithCode = (postData) => {
    return ajaxinstance.put(`users/update_password_with_code`, postData)
  }
  // 获取Java的token
  login.getJavaToken = (postData) => {
    return ajaxinstance.get(`accounts`)
  }
  return login
}

export default loginCreate
