import React from 'react'
// import Api from 'api'
// import { Button, SearchBar } from 'antd-mobile'
import '../style'
import banner from 'images/home/banner.png'
const drawArr = [
  {
    name:'一等奖(第一名)',
    draw:'5000RMB',
    zp:'50%现金+50%赠金',
    textRight:'',
    floatRight:'',
  },
  {
    name:'二等奖(第二名)',
    draw:'2000RMB',
    zp:'50%现金+50%赠金',
    textRight:'text-right',
    floatRight:'right',
  },
  {
    name:'三等奖(第三名)',
    draw:'1000RMB',
    zp:'50%现金+50%赠金',
    textRight:'',
    floatRight:'',
  },
  {
    name:'四等奖(4-10名)',
    draw:'$50+实物',
    zp:'$50赠金+小米手环',
    textRight:'text-right',
    floatRight:'right',
  },
]

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <img src={banner} alt='' style={{ width:'100%', height:'auto', marginBottom:10 }} />
        <div className='gd-contest-draw'>
          <div className='draw-title'> <span>比赛</span><span>奖励</span></div>
          <ul className='draw-container'>
            {
            drawArr.map((v, i) => {
              return (
                <li key={i} className={v.textRight}>
                  <h3>{v.name}</h3>
                  <div className={v.floatRight}>
                    <h4>{v.draw}</h4>
                    <span>{v.zp}</span>
                  </div>
                </li>
              )
            })
          }
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
export default App
