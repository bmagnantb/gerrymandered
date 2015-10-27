import React from 'react'
import d3 from 'd3'
import PureComponent from 'react-pure-render/component'

import { highlightStateBorder } from '../actions/creators'

import './State.scss'
export default class State extends PureComponent {
  constructor(...p) {
    super(...p)
  }

  render() {
    const { dispatch, id, highlight, pathCoords } = this.props
    return <path onMouseEnter={() => dispatch(highlightStateBorder(id))}
                 stroke="black"
                 strokeWidth={highlight ? 3 : 1}
                 fill="white"
                 d={d3.geo.path()(pathCoords.toJS())}
                 style={{position: 'relative', zIndex: highlight ? 1 : 0}} />
  }
}
