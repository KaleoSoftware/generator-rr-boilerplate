/*eslint-disable no-console */

// Enable runtime transpilation tot use ES2016 in node

var fs = require('fs')

var babelrc = fs.readFileSync('./.babelrc')
var config

try {
  config = JSON.parse(babelrc)
} catch(err) {
  console.error('ERROR: Error parsing your .babelrc')
  console.log(err)
}

require('babel-core/register')(config)
