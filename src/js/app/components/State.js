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
    const { dispatch, id, highlight, pathCoords } = this.props;
    const centroid = d3.geo.path().centroid(pathCoords.toJS());
    const containerStyle = {
      position:'absolute',
      overflow:'visible',
      perspective:800,
      transformStyle:'preserve-3d',
      zIndex: highlight ? 1 : 0,
      width:'100%',
    };

    const svgStyle = {
      position:'absolute',
      overflow:'visible',
      transform: highlight ? 'translateZ(10px) translateY(-5px)' : 'translateZ(0) translateY(0)',
      transition:'transform .2s ease',
      transformOrigin:`${centroid[0]+50}px ${centroid[1]}px`,
    };
    const d = d3.geo.path()(pathCoords.toJS());
    const path = `<path filter=${highlight ? 'url(#f3)' : 'url()'}
          stroke="black"
          strokeWidth="1"
          fill="white"
          d=${d}
          style="position: 'relative', z-index: '${highlight ? 1 : 0}'"/>`
    const filter = `<filter id="f3" x="0" y="0" width="300%" height="300%">
      <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>`
    return <div style={containerStyle}>
      <svg width="1" height="1" style={svgStyle}>
        <defs dangerouslySetInnerHTML={{__html: filter}}>
        </defs>
        <g onMouseEnter={() => dispatch(highlightStateBorder(id))} dangerouslySetInnerHTML={{__html: path}}>
        </g>

      </svg>
    </div>;
  }
}
