var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  }
}
