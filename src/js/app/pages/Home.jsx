import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PureComponent from 'react-pure-render/component'
import Modal from 'react-modal'
import { createSelector } from 'reselect'
import d3 from 'd3'

import { makeEventStream } from '../utils'
import { getMetadata, highlightStateBorder } from '../actions/creators'
import { SVGMap, State } from '../components'

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '4em',
    left: '0',
    bottom: '0',
    right: '0'
  },
  content: {
    padding: '3em',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginTop: '-2em'
  }
}

const d3Path = d3.geo.path()

import './Home.scss'
export class Home extends PureComponent {
  constructor(...p) {
      super(...p)
      this.handlers = {}
  }

  componentWillMount() {
    this.props.dispatch(getMetadata())
  }

  componentDidMount() {
    const debounceAction$ = makeEventStream()
    debounceAction$.throttle(16).subscribe(action => this.props.dispatch(action))
    this.handlers = {
      debounceAction$
    }
  }

  render() {
    const { ongoingRequest, metadata, highlight, features, viewBox } = this.props
    const loading = ongoingRequest ? true : false

    return <div>
      <SVGMap viewBox={viewBox}>
        {loading
          ? <Modal isOpen={true} style={modalStyles}>
              <span className="fa fa-spinner fa-pulse fa-5x" />
            </Modal> : null}
        {features.map(
          feature => <State key={`state-${feature.getIn(['properties', 'NAME'])}`}
                            pathCoords={feature.get('geometry')}
                            pathGen={d3Path}
                            id={feature.getIn(['properties', 'STATE'])}
                            dispatch={this.handlers.debounceAction$}
                            stroke={feature.getIn(['properties', 'STATE']) === highlight ? 3 : 1} />)}
      </SVGMap>
    </div>
  }
}

const viewBoxSelector = createSelector(
  state => state.svgMap.getIn(['stateShapes', 'features']),
  features => {
    const [[left1, top1], [right1, bottom1]] = d3Path.bounds(features.get(0))
    const viewBox = features.rest().reduce((acc, feature) => {
      var [[left, top], [right, bottom]] = d3Path.bounds(feature.toJS())
      return [
        Math.min(left, acc[0]),
        Math.min(top, acc[1]),
        Math.max(right, acc[2]),
        Math.max(bottom, acc[3])
      ]
    }, [left1, top1, right1, bottom1])

    return {
      features,
      viewBox
    }
  })

const featuresSelector = createSelector(
  state => state.svgMap.get('highlight'),
  viewBoxSelector,
  (highlight, {features, viewBox}) => {
    const highlightFeature = features.findEntry(feature => feature.getIn(['properties', 'STATE']) === highlight)

    return {
      features: highlightFeature ? features.delete(highlightFeature[0]).push(highlightFeature[1]) : features,
      highlight,
      viewBox
    }
})

const select = createSelector(
  featuresSelector,
  state => state.stateMetadata.get('metadata'),
  state => state.stateMetadata.get('ongoingRequest'),
  (featuresSelects, metadata, ongoingRequest) => ({
    metadata,
    ongoingRequest,
    ...featuresSelects
  }))

export default connect(select)(Home)
