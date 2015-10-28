import React, { Component } from 'react'
import { Link } from 'react-router'

import '../../scss/style.scss'

export default class App extends Component {
  render() {
    return <div id="container">
      <header>
        <Link to="/">
          <h1>Gerrymandered</h1>
        </Link>
      </header>
      {this.props.children}
    </div>
  }
}
