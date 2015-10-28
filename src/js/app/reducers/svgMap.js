import Immutable from 'immutable'

import { getStateIndexById } from '../utils'
import stateShapes from '../data/stateShapes'
import { HIGHLIGHT_STATE_BORDER, REQUEST_METADATA } from '../actions/types'

const initial = Immutable.fromJS({stateShapes, highlight: null})

export default (state = initial, {payload, type}) => {
  switch (type) {
    case HIGHLIGHT_STATE_BORDER:
      return state.set('highlight', payload)

    default:
      return state
  }
}
