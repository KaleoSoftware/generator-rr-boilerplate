import {combineReducers} from 'redux'
import {routeReducer} from 'react-router-redux'

import app from './app'

const rootReducer = combineReducers({
  routing: routeReducer,

  app
})

export default rootReducer
