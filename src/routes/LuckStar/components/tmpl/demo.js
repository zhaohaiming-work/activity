import React from 'react'
// import { Modal } from 'antd-mobile'
import '../huodong.scss'
import { history } from 'func'
// import { Nav } from 'components/commonTmpl'
// import * as Cookies from 'js-cookie'
import PropTypes from 'prop-types'// 校验
// import '../huodong'
// import { createForm } from 'rc-form'
import Datas from './data.js'

let num = 0, timer = ''

class App extends React.Component {
  state = {
    dataList:Datas
  }
  componentDidMount () {

  }
  rotats = () => {
    // console.log('11')
    let nums = parseInt(Math.random() * 7)
    // console.log(nums)
    num = -1
    clearInterval(timer)
    timer = setInterval(() => {
      num += 1
      const { dataList } = this.state
      const arr = dataList.map((val, index) => {
        const i = num % 8
        if (+val.index === i) {
          val.active = true
        } else {
          val.active = false
        }
        if (num > 14) {
          if (i === nums) {
            clearInterval(timer)
          }
        }
        return val
      })
      this.setState({
        dataList:arr
      })
    }, 50)
  }

  render () {
    const { dataList } = this.state
    return (
      <React.Fragment>
        <div className='dflex'>
          <div className={dataList[0].active ? 'active' : ''} />
          <div className={dataList[1].active ? 'active' : ''} />
          <div className={dataList[2].active ? 'active' : ''} />
        </div>
        <div className='dflex'>
          <div className={dataList[7].active ? 'active' : ''} />
          <div onClick={this.rotats}>点击</div>
          <div className={dataList[3].active ? 'active' : ''} />
        </div>
        <div className='dflex'>
          <div className={dataList[6].active ? 'active' : ''} />
          <div className={dataList[5].active ? 'active' : ''} />
          <div className={dataList[4].active ? 'active' : ''} />
        </div>
      </React.Fragment>
    )
  }
}

// Add.propTypes = {
//   name:PropTypes.string,
//   output:PropTypes.function
// }
// props传值组建与组建之间得唯一的桥梁,组建的属性就是这个组建得props

export default App
