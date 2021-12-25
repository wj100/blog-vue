'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //开发环境的url
  API_ROOT: '"http://www.wangjun.work:3000/api"'
})
