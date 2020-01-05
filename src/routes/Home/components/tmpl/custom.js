// 定制这一块
import React from 'react'
// import PropTypes from 'prop-types'
import { Grid } from 'antd-mobile'
import '../HomeView.scss'
export const Custom = () => {
  const renderList = [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'隔夜费',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'强制平仓',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'账户清零',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'取款条件',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'赠金说明',
    }, {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      name:'如何平仓',
    },
  ]

  const data = renderList.map((val, i) => ({
    icon:val.icon,
    text:<div className='custom-title'>{val.name}</div>,
  }))
  return <Grid data={data} columnNum={3} />
}
