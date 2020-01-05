export const dateFormat = date => (date || '').replace(/T/, ' ').replace(/\+.*/, '')
export const fixedTow = (data = 0) => (data || 0).toFixed(2)
