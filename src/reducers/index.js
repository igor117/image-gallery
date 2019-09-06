import { combineReducers } from 'redux-immutable'
import routeReducer from './routeReducer'
import testReducer from './testReducer'

const rootReducer = asyncReducers => combineReducers({
  route: routeReducer,
  testData: testReducer,
  ...asyncReducers,
})

export default rootReducer
