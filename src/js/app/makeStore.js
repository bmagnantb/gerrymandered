import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

import { reduxPromiseMW } from './utils'
import reducer from './reducers'

export default function makeStore(initialState) {
  var store = applyMiddleware(reduxPromiseMW, createLogger())(createStore)(reducer)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
