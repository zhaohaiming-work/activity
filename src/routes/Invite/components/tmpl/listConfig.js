import jiangli from 'images/huodong/jiangli.png'
import giftBook from 'images/huodong/gift_book.png'

export const friendFlArr = [
  {
    index:1,
    youGet:'$28赠金',
    friendComplete:' 注册完成任务',
    // mark:'NEW',
    bottom:true,
  },
  {
    index:2,
    youGet:'实物大礼(价值99元)',
    friendComplete:' 新手任务',
    // mark:'NEW',
    // bottom:true,
  },
  {
    // index:2,
    youGet:'实物大礼(价值99元)',
    friendComplete:' 新手任务',
    // mark:'NEW',
    // bottom:true,
    img:giftBook
  },
]

export default [
  {
    index:1,
    youGet:'$5赠金',
    friendComplete:'实脸认证',
    // mark:'NEW',
    bottom:true,

  },
  {
    index:2,
    youGet:'100%充值优惠券',
    friendComplete:'交易量',
    mark:'NEW',
    bottom:true,
    friendCompleteValue:'$10000'
  },
  {
    index:3,
    youGet:'¥100现金',
    friendComplete:'实盘大赛',
    mark:'NEW',
    bottom:true,
    friendCompleteValue:'(1~50)'
  },
  {
    index:4,
    youGet:'返现4%～6%',
    friendComplete:'充值',
  },
  {
    img:jiangli
  },
  {
    index:5,
    youGet:'¥200话费～iphone8',
    friendComplete:'完成以上任务',
    mark:'HOT',
    // bottom:false,
    friendCompleteValue:'(1~4)'
  }
]
