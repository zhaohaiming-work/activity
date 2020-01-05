// 定制这一块
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Grid } from 'antd-mobile'
import '../HomeView.scss'

const HelpList = ({ list }) => {
  return (
    <div className='help-list'>
      <Flex>
        <Flex.Item>
          <div className='help-list-title'>
            <Grid data={list.data} columnNum={1} hasLine={false} itemStyle={{ height:100 }} />
          </div>
        </Flex.Item>
        <Flex.Item>
          <div className='help-list-title'>
            <span>dfdsf</span>
            <span>fdsfsdf</span>
          </div>
        </Flex.Item>
        <Flex.Item>
          <div className='help-list-title help-list-title-last'>
            <span>dfdsf</span>
            <span>fdsfsdf</span>
          </div>
        </Flex.Item>
      </Flex>
    </div>
  )
}
HelpList.propTypes = {
  list:PropTypes.array
}
export const HelpCenter = () => {
  const data = Array.from(new Array(1)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
  }))
  return (
    <React.Fragment>
      <div className='help-center-title'>
        <span />
        帮助中心
      </div>
      <div className='help-list'>
        <Flex>
          <Flex.Item>
            <div className='help-list-title'>
              <Grid data={data} columnNum={1} hasLine={false} itemStyle={{ height:100 }} />
            </div>
          </Flex.Item>
          <Flex.Item>
            <div className='help-list-title'>
              <span>dfdsf</span>
              <span>fdsfsdf</span>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div className='help-list-title help-list-title-last'>
              <span>dfdsf</span>
              <span>fdsfsdf</span>
            </div>
          </Flex.Item>
        </Flex>
      </div>

    </React.Fragment>
  )
}
