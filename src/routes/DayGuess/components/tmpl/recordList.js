import React from 'react'
import { Accordion, Flex } from 'antd-mobile'
import propTypes from 'prop-types'

import '../guess'
import { dateFormat, guessStatus, drawStatus } from './filter'
const App = ({ renderList = [] }) => {
  return (
    <React.Fragment>
      <div className='guess-list'>
        <Accordion defaultActiveKey='0' className='my-accordion' onChange={this.onChange}>
          {
            renderList.map(val => {
              const { id, quiz = {}, point, status } = val
              const { title } = quiz
              return (
                <Accordion.Panel
                  key={id}
                  header={
                    <div className='list-container'>
                      <div className='top'>
                        <div className='top-left'>{title}</div>
                        <div className='top-right'>{drawStatus(status)}</div>
                      </div>
                      <div className='bottom'>
                        <div className='bottom-left'>{dateFormat(val.created_at)}</div>
                        <div className='bottom-right'>
                        投注{point}积分{+val.pnl_point ? `,赢得${+val.pnl_point + (+point)}积分` : ''}
                        </div>
                      </div>
                    </div>
                  }>
                  <div className='result-table'>
                    <Flex align='center'>
                      <Flex.Item> <span className='result-table-title'>投注项</span> </Flex.Item>
                      <Flex.Item> <span className='result-table-title'>结果</span> </Flex.Item>
                      <Flex.Item> <span className='result-table-title'>结算状态</span> </Flex.Item>
                    </Flex>
                    <Flex align='center'>
                      <Flex.Item> <span className='result-table-res'>{val.answer_name || '--'}</span> </Flex.Item>
                      <Flex.Item> <span className='result-table-res'>{quiz.answer_name || '请耐心等待'}</span> </Flex.Item>
                      <Flex.Item> <span className='result-table-res'>{guessStatus(quiz.status)}</span> </Flex.Item>
                    </Flex>
                  </div>
                </Accordion.Panel>
              )
            })
          }
        </Accordion>
      </div>
    </React.Fragment>
  )
}
App.propTypes = {
  renderList: propTypes.array,
}
export default App
