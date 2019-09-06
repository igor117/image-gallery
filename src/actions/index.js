import { createAction } from '../utils'
import { ITEM } from './types'

export const item = {
  request: () => createAction(ITEM.GET, { fetching: true, success: false, error: null }),
  getPhotos: () => createAction(ITEM.GET_PHOTOS, { fetching: true, success: false, error: null }),
  favourite: (id) => createAction(ITEM.FAVOURITE, { id, fetching: true, success: false, error: null }),
  success: data => createAction(ITEM.SUCCESS, {
    ...data, fetching: false, success: true, error: null,
  }),
  failure: error => createAction(ITEM.FAILURE, { ...error, fetching: false, success: false }),
}

export default item
