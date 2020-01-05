// const pxtorem = require('postcss-pxtorem') // px转rem
const autoprefixer = require('autoprefixer') // 添加浏览器前缀

module.exports = {
  plugins: [
    // pxtorem({ rootValue: 40, propWhiteList: [], selectorBlackList: [/^html$/], minPixelValue: 2 }),
    autoprefixer({
      browsers: ['iOS >= 8', 'Android >= 4']
    })
  ]
}
