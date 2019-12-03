'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //开发环境的url
  // API_ROOT: '"http://www.wjune.top:8080/api"'
  API_ROOT: '"http://127.0.0.1:3000/api"'
})
