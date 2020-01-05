import React from 'react'
import { NavBar, Icon, Carousel, Popover, Modal, NoticeBar } from 'antd-mobile'
import * as Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import './common'
import { history } from './func'
const alert = Modal.alert

export const height = window.innerHeight - 45

export const Nav = ({ back, children, title, rightContent, noleft }) => {
  return (
    <React.Fragment>
      <NavBar
        mode='dark'
        style={{ backgroundColor:'#ec3627' }}
        icon={!noleft && <Icon type='left' size='lg' onClick={back} style={{ position:'relative', left:'-15px' }} />}
        rightContent={rightContent}
      >{title || '帮助中心'}</NavBar>
      <div className='nav-body' style={{ height:height, width:'100%', overflow:'auto', position:'relative' }}>
        {children}
      </div>
    </React.Fragment>
  )
}

Nav.propTypes = {
  back:PropTypes.func,
  children:PropTypes.node,
  title:PropTypes.any,
  rightContent:PropTypes.node,
  noleft:PropTypes.bool
}
// 跑马灯
export class DetailCarousel extends React.Component {
  static propTypes = {
    dataList:PropTypes.array
  }
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  componentDidMount () {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      })
    }, 100)
  }
  render () {
    const { dataList } = this.props
    return (
      <React.Fragment>
        <Carousel
          autoplay={false}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {dataList.map((val, index) => (
            <a
              key={index}
              href='javascript:;'
              style={{ display: 'inline-block', width: '100%', height:415, textAlign:'center' }}
            >
              <img
                src={val}
                alt='图片加载失败'
                style={{ width: 234, height:'100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
      </React.Fragment>
    )
  }
}
// 跳转
const ItemPop = Popover.Item

export class SkipPopover extends React.Component {
  state={
    visible:false,
    selected: '',
  }
  onSelect = (opt) => {
    const name = opt.props.value
    const hash = window.location.hash.replace(/#\//, '')
    this.setState({
      visible: false,
    })
    if (hash !== name) {
      if (name === 'my-trade' || name === 'market') {
        if (!Cookies.get('Authorization')) {
          alert('提示', '您需要登录', [
            { text: '取消', onPress: () => null },
            { text: '确定', onPress: () => history.push('/login/market') },
          ])
          return
        }
      }
      if (name === 'login') {
        setImmediate(() => history.push(`/login/expire-token`))
        return
      }
      history.push(`/${name}`)
    }
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })
  }
  render () {
    return (
      <Popover mask
        overlayClassName='fortest'
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        overlay={[
              (<ItemPop key='4' value='my-trade' >
                <div className='nav-mask'>
                  <span className='iconfont'>&#xe606;</span>
                  <span className='pl-5' />
                我的交易
              </div>
              </ItemPop>),
              (<ItemPop key='5' value='market' >
                <div className='nav-mask'>
                  <span className='iconfont'>&#xe682;</span>
                  <span className='pl-5' />
                市场行情
              </div>
              </ItemPop>),
              (<ItemPop key='6' value='login' >
                <div className='nav-mask'>
                  <span className='iconfont'>&#xe608;</span>
                  <span className='pl-5' />
                切换账号
              </div>
              </ItemPop>),
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0],
        }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.onSelect}
          >
        <div style={{
          height: '100%',
          padding: '0 15px',
          marginRight: '-15px',
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <Icon type='ellipsis' />
        </div>
      </Popover>
    )
  }
}

export class Guide extends React.Component {
  render () {
    return (
      <NoticeBar mode='closable' icon={null}>
        如果体验更多功能，请下载天厚App
      </NoticeBar>
    )
  }
}
