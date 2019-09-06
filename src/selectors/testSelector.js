import { createSelector } from 'reselect'

const testState = state => state.get('testData')

const testDataSelector = () => createSelector(
  testState,
  state => {
    const data = state.get('data')

    return data
  },
)

const fetchingSelector = () => createSelector(
  testState,
  state => state.get('fetching'),
)

const errorSelector = () => createSelector(
  testState,
  state => {
    const error = state.get('error')

    return error
  },
)
export {
  testDataSelector,
  fetchingSelector,
  errorSelector,
}
