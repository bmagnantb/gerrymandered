import React, { Component } from 'react'
import PureComponent from 'react-pure-render/component'

export default class StateSvg extends Component{
  render(){
    const { mouseMoveHandler, mouseEnterHandler, path, filter, svgStyle } = this.props;
    return <svg width="1" height="1" style={svgStyle}>
      <defs dangerouslySetInnerHTML={{__html: filter}}>
      </defs>
      <g onMouseEnter={mouseEnterHandler}
         dangerouslySetInnerHTML={{__html: path}}
         onMouseMove={mouseMoveHandler}>
      </g>

    </svg>;
  }
}
