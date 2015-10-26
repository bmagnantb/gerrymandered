import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMetadata } from '../actions/creators'

import './Home.scss'
export class Home extends Component {
  componentWillMount() {
    this.props.dispatch(getMetadata())
  }

  render() {
    return <div>
      <h2>Home</h2>
    </div>
  }
}

const select = state => state

export default connect(select)(Home)
