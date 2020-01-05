import bg from 'images/egg/bg'
import z1 from 'images/egg/z1'
import z2 from 'images/egg/z2'
import z3 from 'images/egg/z3'
import z4 from 'images/egg/z4'
import z5 from 'images/egg/z5'
import yz from 'images/egg/yz'
import rule from 'images/egg/rule'
import clickMee from 'images/egg/click-mee'
import gonglueTitle from 'images/egg/gonglue-title'
import gonglueContent from 'images/egg/gonglue-content'
import time from 'images/egg/time'
import bigTitle from 'images/egg/big-title'
import pt from 'images/egg/pt'
import ptkz from 'images/egg/pt-kz'
import hj from 'images/egg/hj'
import hjkz from 'images/egg/hj-kz'
import baiyin from 'images/egg/baiyin'
import baiyinkz from 'images/egg/baiyin-kz'
import bojin from 'images/egg/bojin'
import bojinkz from 'images/egg/bojin-kz'
import zs from 'images/egg/zs'
import zskz from 'images/egg/zs-kz'
import ruleTitle from 'images/egg/rule-title'
const eggConfigList = [
  {
    index: 1,
    showClickMee: false,
    eggState: 'wz', // yz,kz
    wzEggUrl: pt,
    kzEggUrl: ptkz,
    yzEggUrl:yz,
    z: z1
  },
  {
    index: 2,
    showClickMee: false,
    eggState: 'wz', // yz,kz
    wzEggUrl: baiyin,
    kzEggUrl: baiyinkz,
    yzEggUrl:yz,
    z: z2
  },
  {
    index: 3,
    showClickMee: false,
    eggState: 'wz', // yz,kz
    wzEggUrl: hj,
    kzEggUrl: hjkz,
    yzEggUrl:yz,
    z: z3
  },
  {
    index: 4,
    showClickMee: false,
    eggState: 'wz', // yz,kz
    wzEggUrl: bojin,
    kzEggUrl: bojinkz,
    yzEggUrl:yz,
    z: z4
  }, {
    index: 5,
    showClickMee: false,
    eggState: 'wz', // yz,kz
    wzEggUrl: zs,
    kzEggUrl: zskz,
    yzEggUrl:yz,
    z: z5
  }
]
export {
   bg, z1, z2, z3, z4, z5, yz, rule, clickMee, gonglueTitle, gonglueContent, ruleTitle,
   time, bigTitle, pt, ptkz, hj, hjkz, baiyin, baiyinkz, bojin, bojinkz, zs, zskz, eggConfigList
}
