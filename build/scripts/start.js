const port = require('../../project.config').port
const logger = require('../lib/logger')
const ip = require('ip')
logger.info('Starting server...')
require('../../server/main').listen(port, () => {
  logger.success('Server is running at http://' + ip.address() + `:${port}`)
})
