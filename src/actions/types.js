import { createActionTypes } from '../utils'

export const ITEM = createActionTypes('ITEM', [
  'GET_PHOTOS',
  'FAVOURITE',
  'SUCCESS',
  'FAILURE',
])

export default ITEM
