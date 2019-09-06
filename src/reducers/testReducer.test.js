import { fromJS, List } from 'immutable'
import { ITEM } from '../actions/types'
import testReducer from './testReducer';
describe('testReducer', () => {
  const initialState = fromJS({
    data: new List([]),
    fetching: false,
    success: false,
    error: null,
  })
  it('returns the initial state when an action type is not passed', () => {
    const reducer = testReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it('should handle GET_PHOTOS', () => {
    expect(
      testReducer(initialState, {
        type: ITEM.GET_PHOTOS
      })
    ).toMatchSnapshot()
  })

  it('should handle SUCCESS', () => {
    expect(
      testReducer(initialState, {
        type: ITEM.SUCCESS
      })
    ).toMatchSnapshot()
  })
});
