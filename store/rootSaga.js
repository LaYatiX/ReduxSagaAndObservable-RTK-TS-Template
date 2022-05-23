import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  incrementAction,
  incrementActionError,
  incrementActionRequest,
  incrementActionSuccess,
  incrementSaga,
} from './features/counter/counterSagaSlice'
import Axios from 'axios'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

let callAPI = async ({ url, method, data }) => {
  return Axios({
    url,
    method,
    data,
  })
}

export function* fetchNumberSaga(action) {
  console.log(action.payload, 'action.payload')
  try {
    let result1 = yield call(() =>
      callAPI({
        url: 'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1',
      })
    )
    yield put(incrementActionSuccess(result1.data[0]))
    let result12 = yield call(() =>
      callAPI({
        url: 'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1',
      })
    )
    console.log(result12.data, 'result12')
    yield put(incrementActionSuccess(result12.data[0]))
  } catch (e) {
    yield put(incrementActionError())
  }
}

function* incrementAsync(action) {
  yield delay(1000)
  yield put(incrementSaga(action.payload))
}

function* watchIncrementAsync() {
  yield takeEvery(incrementAction.type, incrementAsync)
}
function* watchIncrementRequest() {
  yield takeEvery(incrementActionRequest.type, fetchNumberSaga)
}

export default function* rootSaga() {
  yield all([watchIncrementAsync(), watchIncrementRequest()])
}
