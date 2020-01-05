import React from 'react'
import { Route } from 'react-router-dom'
import Counter from './Counter/index'
import HuoDong from './HuoDong'
import Login from './Login'
// import GetBless from './GetBless'
import GdContest from './GdContest'
import LuckyDraw from './LuckyDraw'
import FebAct from './FebruaryActivity'
import Invite from './Invite'
import DayGuess from './DayGuess'
import TradeStr from './TradeStrategy'
import GoldenEgg from './GoldenEgg'
import March from './March'
import Demo from './LuckStar'
export default store => (
  <React.Fragment>
    <Route path='/demo' component={Demo(store)} />
    <Route path='/march' component={March(store)} />
    <Route path='/golden-egg' component={GoldenEgg(store)} />
    <Route path='/day-guess' component={DayGuess(store)} />
    <Route path='/trade-strategy' component={TradeStr(store)} />
    <Route path='/invite' component={Invite(store)} />
    <Route path='/feb-act' component={FebAct(store)} />
    <Route path='/lucky-draw' component={LuckyDraw(store)} />
    <Route path='/gd-contest' component={GdContest(store)} />
    <Route path='/login' component={Login()} />
    {/* <Route path='/get-bless' component={GetBless(store)} /> */}
    <Route path='/huodong' component={HuoDong(store)} />
    <Route path='/counter' component={Counter(store)} />
  </React.Fragment>
)
