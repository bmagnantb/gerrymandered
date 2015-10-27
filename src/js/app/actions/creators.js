import { createAction } from 'redux-actions'

import { openStates } from '../api'
import {
  HIGHLIGHT_STATE_BORDER,
  REQUEST_METADATA
} from './types'

export const highlightStateBorder = createAction(HIGHLIGHT_STATE_BORDER)

/*
  REQUESTS
*/
export const getMetadata = createAction(REQUEST_METADATA, () => openStates.getMetadata())
