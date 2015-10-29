import React from 'react'
import d3 from 'd3'
import PureComponent from 'react-pure-render/component'

import stateShapes from '../data/stateShapes'

import './SVGMap.scss'
export default class SVGMap extends PureComponent {
  render() {
    // fix puerto rico sometime
    // const pr = stateShapes.features.filter(feature => feature.properties.NAME === 'Puerto Rico')[0]
    // console.log(pr, d3.geo.path()(pr))

    return <div>
        {this.props.children}
    </div>
  }
}
