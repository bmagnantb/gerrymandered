import React from 'react'
import d3 from 'd3'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PureComponent from 'react-pure-render/component'

import { getMetadata } from '../actions/creators'
import { SVGMap, State } from '../components'

import './Home.scss'
export class Home extends PureComponent {
  componentWillMount() {
    this.props.dispatch(getMetadata())
  }

  render() {
    // console.log('home props', this.props)
    return <div>
      {this.renderStates()}
    </div>;
  }

  renderStates(){
    return this.props.features.map(
      feature => <State key={`state-${feature.getIn(['properties', 'NAME'])}`}
                      pathCoords={feature.get('geometry')}
                      id={feature.getIn(['properties', 'STATE'])}
                      dispatch={this.props.dispatch}
                      highlight={this.props.highlight === feature.getIn(['properties', 'STATE'])} />
    );
  }
}

const select = state => {
  return {
    features: state.svgMap.getIn(['stateShapes', 'features']),
    highlight: state.svgMap.get('highlight')
  }
}

export default connect(select)(Home)
