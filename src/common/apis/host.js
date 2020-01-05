const { hostname } = window.location
const host = hostname.replace(/\..*/, '')
const apiObj = {
  'activity':`https://api-v2.tophold.com/api/v2/`,
  'test-activity': `https://staging.tophold.com/api/v2/`
}
let [baseUrl, wsMarket, wsTrade,
  tradeApi, marketApi, kLineApi,
  cmApi
] = ['']
switch (host) {
  case 'activity':
    baseUrl = apiObj[host]
    break
  case 'test-activity':
    baseUrl = apiObj[host]
    break
  default:
    baseUrl = apiObj['test-activity']
}
// cmApi = 'http://192.168.0.174:8080'
export default{
  baseUrl,
  wsMarket,
  wsTrade,
  tradeApi,
  marketApi,
  kLineApi,
  cmApi
}
