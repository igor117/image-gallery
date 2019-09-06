import { all, fork } from 'redux-saga/effects'
import watchTestSagas from './testSagas'

export default function* rootSaga() {
  yield all([
    fork(watchTestSagas),
  ])
}
