import Immutable from 'immutable'

import { REQUEST_METADATA } from '../actions/types'

const initial = Immutable.fromJS({
  ongoingRequest: null,
  metadata: Immutable.List()
})

export default (state = initial, {type, payload, meta}) => {
  switch (type) {

    case REQUEST_METADATA:
      if (state.get('ongoingRequest') === null && meta.sequence.type === 'begin')
        return state.set('ongoingRequest', meta.sequence.id)
      else if (state.get('ongoingRequest') !== meta.sequence.id)
        return meta.sequence.type === 'begin' ? state.set('ongoingRequest', meta.sequence.id) : state
      else
        return Immutable.fromJS({
          ongoingRequest: null,
          metadata: Immutable.List.of(...payload)
        })

    default:
      return state
  }
}
