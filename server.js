#!/usr/bin/env node

require('./server.babel')
var rootDir = __dirname

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

global.window = {
  location: {
    href: 'http://localhost:8000/',
    pathname: '/'
  }
}

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json)/i
  })) {
    return
  }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function () {
    require('./src/server')
  })
