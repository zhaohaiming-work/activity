export const drawType = userDraw => {
  const jpcList = JSON.parse(localStorage.getItem('jpcList') || '[]')
  let title = ''
  jpcList.map(v => {
    if (+userDraw.item_category === +v.item_category && +userDraw.item_value === +v.item_value) {
      title = v.title
    }
  })
  return title
}

export const dateFormat = date => (date || '').replace(/T/, ' ').replace(/\+.*/, '')
