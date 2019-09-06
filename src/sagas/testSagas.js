// In case you need to use a selector
// import also select from redux-saga/effects
// and then simplie yield select(yourSelector())
//
// In case you need to redirect to whatever route
// import { push } from react-router-redux and then
// yield put(push('/next-page'))

import {
  put, call, takeLatest, all,
} from 'redux-saga/effects'
import axios from 'axios'

import { ITEM } from '../actions/types'

import { item } from '../actions'

function* handleGetPhotos() {
  try {
    const { data } = yield call(axios.get, 'https://jsonplaceholder.typicode.com/photos')
    yield put(item.success({ data }))
  } catch (e) {
    yield put(item.failure({ error: { ...e } }))
  }
}

function* watchTestSagas() {
  yield all([
    takeLatest(ITEM.GET_PHOTOS, handleGetPhotos),
  ])
}

export default watchTestSagas
