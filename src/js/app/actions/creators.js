import { createAction } from 'redux-actions'

import { openStates } from '../api'
import { REQUEST_METADATA } from './types'

export const getMetadata = createAction(REQUEST_METADATA, () => openStates.getMetadata())
