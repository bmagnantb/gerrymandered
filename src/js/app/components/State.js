import React from 'react'
import d3 from 'd3'
import PureComponent from 'react-pure-render/component'
import StateSvg from './StateSvg'
import { highlightStateBorder } from '../actions/creators'

import './State.scss'
export default class State extends PureComponent {
  constructor(...p) {
    super(...p);
    this.state={};
  }

  getTransformRotation(mousePos, bounds){
    if(this.props.highlight && mousePos){
      const { x, y } = mousePos;
      const range = 10;
      const [[xMin, yMin], [xMax, yMax]]  = bounds;
      const interpolateX = d3.scale.linear()
                            .domain([xMin,xMax])
                            .range([-range, range/2]);
      const interpolateY = d3.scale.linear()
                            .domain([yMin,yMax])
                            .range([-range, range]);
      const xDeg = interpolateY(y);
      const yDeg = interpolateX(x);

      return {
        transform:`rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
      };
    }
    return {
      transform:"rotateX(0deg) rotateY(0deg)"
    };
  }

  getFeature(pathCoords){
    if(this.pathCoords !== pathCoords){
      this.pathCoords = pathCoords;
      this.feature = pathCoords.toJS();
    }
    return this.feature;
  }

  getCentroid(){
    if(!this.centroid){
      this.centroid = d3.geo.path().centroid(this.feature);
    }
    return this.centroid;
  }

  getPath(){
    if(!this.path){
      this.path = d3.geo.path()(this.feature);
    }
    return this.path;
  }

  getBounds(){
    if(!this.bounds){
      this.bounds = d3.geo.path().bounds(this.feature);
    }
    return this.bounds;
  }

  render() {
    const { dispatch, id, highlight, pathCoords } = this.props;
    const feature = this.getFeature(pathCoords);
    const centroid = this.getCentroid(feature);
    const containerStyle = {
      position:'absolute',
      overflow:'visible',
      perspective:800,
      transformStyle:'preserve-3d',
      zIndex: highlight ? 1 : 0,
      width:'100%',
    };

    const transformOrigin={
      transformOrigin:`${centroid[0]}px ${centroid[1]}px`,
      transition:'transform .1s ease',
    };

    const svgStyle = {
      position:'absolute',
      overflow:'visible',
      transform: highlight ? 'scale(1.3,1.3) translateY(-5px)' : 'scale(1,1) translateY(0)',
      ...transformOrigin
    };
    const d = this.getPath(feature);
    const path = `<path filter=${highlight ? 'url(#f3)' : 'url()'}
          stroke="black"
          strokeWidth="1"
          fill="white"
          d=${d}
          style="position: 'relative', z-index: '${highlight ? 1 : 0}'"/>`;
    const filter = `<filter id="f3" x="0" y="0" width="300%" height="300%">
      <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>`
    const bounds = this.getBounds(feature);
    const transformRotation = this.getTransformRotation(this.state.mousePos, bounds);
    const transformStyle = {
      ...transformOrigin,
      ...transformRotation
    }
    return <div style={containerStyle}>
      <div style={transformStyle}>
        <StateSvg mouseEnterHandler={() => dispatch(highlightStateBorder(id))}
                  mouseMoveHandler={e => {
                    if(highlight){
                      this.setState({mousePos:{
                        x:e.clientX,
                        y:e.clientY
                      }});
                    }
                  }}
                  svgStyle={svgStyle}
                  path={path}
                  filter={filter}/>
      </div>
    </div>;
  }
}
