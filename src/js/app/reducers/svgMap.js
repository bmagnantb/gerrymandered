import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { getStateIndexById } from '../utils'
import stateShapes from '../data/stateShapes'
import { HIGHLIGHT_STATE_BORDER, UNHIGHLIGHT_STATE_BORDER } from '../actions/types'

const initialState = Immutable.fromJS({stateShapes, highlight: null})

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case HIGHLIGHT_STATE_BORDER:
      return state.set('highlight', payload)

    default:
      return state
  }
}
