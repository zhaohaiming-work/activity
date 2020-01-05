const ip = require('ip')
const NODE_ENV = process.env.NODE_ENV || 'development'
const port = '3333'
module.exports = {
  port,
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: NODE_ENV === 'development' ? `http://${ip.address()}:${port}/`
  // : 'https://cdn-activity.tophold.com/',
  : './',
  /** Whether to generate sourcemaps */
  sourcemaps:NODE_ENV === 'development',
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  animation:false,
  /** The list of modules to bundle separately from the core application code */
  baseUrl: NODE_ENV === 'development' ? `https://staging.tophold.com/api/v2/` : 'https://api-v2.tophold.com/api/v2/',
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router-dom'
  ],
}
