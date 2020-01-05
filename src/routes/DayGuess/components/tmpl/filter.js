export const endTime = (date = '') => {
  if (!date) {
    return '----'
  } else {
    const arr = date.split('T')
    const str1 = arr[0].split('-')[1] + '月' + arr[0].split('-')[2] + '日'
    const str2 = arr[1].split(':')[0] + ':' + arr[1].split(':')[1]
    return str1 + str2
  }
}
export const fixed = (data, num) => {
  const str = '([0-9]+\\.[0-9]{' + (num || 2) + '})[0-9]*'
  const reg = new RegExp(str)
  return (`${data}` || '').replace(reg, '$1')
}

export const dateFormat = (data = '') => {
  return data.replace(/\+.*/, '').replace(/T/, ' ')
}

export const guessStatus = (status) => {
  switch (+status) {
    case 0:
      return '待结算'
    case 1:
      return '撤销'
    case 2:
      return '已结算'
  }
}
export const drawStatus = (status) => {
  switch (+status) {
    case 0:
      return '待揭晓'
    case 1:
      return '撤销'
    case 2:
      return '猜对'
    case 3:
      return '猜错'
  }
}
