const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const logger = require('../lib/logger')
const webpackConfig = require('../webpack.config')
const project = require('../../project.config')
const getDate = () => {
  const pad = n => n < 10 ? `0${n}` : n
  const date = new Date()
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  return `${dateStr} ${timeStr}`
}

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info(`This build time is ${getDate()}`))
  .then(() => logger.info('Target application environment: ' + chalk.bold(project.env)))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info(`Copying static assets from ./public to ./${project.outDir}.`)
    fs.copySync(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, `${project.outDir}/public`)
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Compiler finished successfully! See ./${project.outDir}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))

compile()
