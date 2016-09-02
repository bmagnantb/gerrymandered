import React from 'react'
import PureComponent from 'react-pure-render/component'
import d3 from 'd3'

import { highlightStateBorder } from '../actions/creators'

import './State.scss'
export default class State extends PureComponent {
  constructor(...p) {
    super(...p)
  }

  render() {
    const { dispatch, id, stroke, strokeWidth, fill, pathCoords, pathGen } = this.props

    return <path className="state-path"
                 onMouseEnter={() => dispatch(highlightStateBorder(id))}
                 stroke={stroke}
                 strokeWidth={strokeWidth}
                 fill={fill}
                 d={pathGen(pathCoords.toJS())} />
  }
}
