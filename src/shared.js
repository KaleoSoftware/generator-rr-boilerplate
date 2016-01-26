import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {syncHistory} from 'react-router-redux'
import {browserHistory, useRouterHistory} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'

export default function configureStore(rootReducer, initialState) {
  let reduxRouterMiddleware
  if (__CLIENT__) reduxRouterMiddleware = syncHistory(history)

  const finalCreateStore = compose(
    applyMiddleware(thunk),
    __CLIENT__ ? applyMiddleware(reduxRouterMiddleware) : f => f,
    __CLIENT__ && __DEVELOPMENT__ && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export const history = __CLIENT__ ? browserHistory : useRouterHistory(createMemoryHistory)()
