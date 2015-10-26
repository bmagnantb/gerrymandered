import React from 'react'
import { Router, Route } from 'react-router'

import App from './App'
import { Home } from './pages'

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
  </Route>
)
