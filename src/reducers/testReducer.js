import { fromJS, List } from 'immutable'
import { ITEM } from '../actions/types'

const initialState = fromJS({
  data: new List([]),
  fetching: false,
  success: false,
  error: null,
})

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM.GET_PHOTOS:
    case ITEM.SUCCESS:
    case ITEM.FAILURE:
      return state.merge(action.payload)
    case ITEM.FAVOURITE:
      const { id } = action.payload;
      let data = state.get('data').slice(0);
      if (typeof data[id].favourite === 'undefined')
        data[id].favourite = true;
      else
        data[id].favourite = !data[id].favourite;
      
      return state.set('data', data);
    default:
      return state
  }
}
