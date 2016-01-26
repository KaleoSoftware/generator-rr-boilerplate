import React from 'react'
import {render} from 'react-dom'
import {Router, match} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import rootReducer from './reducers/index'
import configureStore, {history} from './shared'
import App from './App'
import routes from './routes'

const initialState = window.__INITIAL_STATE__

const store = configureStore(rootReducer, initialState)
const locale = 'en'

injectTapEventPlugin()

match({routes: routes(store.dispatch), location}, (error, redirectLocation, renderProps) => {
  render(
    <App store={store} locale={locale}>
      <Router {...renderProps} history={history} />
    </App>
  , document.getElementById('root'))
})
