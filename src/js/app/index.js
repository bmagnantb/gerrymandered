import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import 'normalize.css'

import routes from './routes'
import makeStore from './makeStore'

window.onload = function() {
  console.log('app')

  render(
    <Provider store={makeStore({})}>
      <Router>
        {routes}
      </Router>
    </Provider>,
    document.querySelector('#app'))
}
