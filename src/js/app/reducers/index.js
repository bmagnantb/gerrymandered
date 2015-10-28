import { combineReducers } from 'redux'

import svgMap from './svgMap'
import stateMetadata from './stateMetadata'

export default combineReducers({
  svgMap,
  stateMetadata
})
