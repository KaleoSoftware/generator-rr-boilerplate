/*eslint-disable no-console */
/*global __DEVELOPMENT__, __DISABLE_SSR__, webpackIsomorphicTools */

import path from 'path'
import Express from 'express'
import compression from 'compression'
import Webpack from 'webpack'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {RouterContext, match} from 'react-router'

import rootReducer from './reducers/index'
import configureStore, {history} from './shared'
import App from './App'
import Html from './Html'
import routes from './routes'

const app = Express()

app.use(compression())

app.use(Express.static(path.join(__dirname, '..', 'static')))

// Development server
if (__DEVELOPMENT__) {
  const config = require('../webpack.config.dev')
  const compiler = Webpack(config)

// // Hot reloading
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

app.use((req, res) => {
  const store = configureStore(rootReducer)
  // Could get from cookie or something
  const locale = 'en'

  // Required for Material-UI
  global.navigator = {
    userAgent: req.get('User-Agent')
  }

  global.window = {
    location: {
      href: 'http://localhost:8000/',
      pathname: '/'
    }
  }

  // If request cookies are needed for sending requests in routes.js
  // Ex. User has a session_id cookie that the API expects
  // Take the session_id the user sent and re-send it in a
  // route.onEnter() callback.
  global.document = {
    cookie: req.get('Cookie')
  }

  const sendHerDown = (renderProps) => {
    res.send(
      '<!doctype html>\n' +
      renderToString(
        <Html
          assets={webpackIsomorphicTools.assets()}
          store={store}>
            <App store={store} locale={locale}>
              <RouterContext {...renderProps} history={history} />
            </App>
        </Html>
      )
    )
  }

  match({routes: routes(store.dispatch), location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error)
    } else if (redirectLocation) {
      res.direct(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200)
      sendHerDown(renderProps)
    } else {
      res.status(404).send('Not found')
    }
  })

})

// Listen
app.listen(8000, function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('App listening at http://localhost:8000')
})
