import React from 'react'
import PureComponent from 'react-pure-render/component'

import { highlightStateBorder } from '../actions/creators'

import './State.scss'
export default class State extends PureComponent {
  constructor(...p) {
    super(...p)
  }

  render() {
    const { dispatch, id, stroke, pathCoords, pathGen } = this.props
    return <path onMouseEnter={() => dispatch(highlightStateBorder(id))}
                 stroke="black"
                 strokeWidth={stroke}
                 fill="white"
                 d={pathGen(pathCoords.toJS())} />
  }
}
