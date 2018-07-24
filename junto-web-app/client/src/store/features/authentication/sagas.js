import * as c from './constants'
import { browserHistory } from 'react-router'
import { take, call, put, fork, cancelled, cancel } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import Api from 'api/index'
import { clearToken, setToken, getToken } from 'utils/storage'

function* authorize(username, password) {
  try {
    const { token } = yield call(Api.login, username, password)
    yield put({ type: c.LOGIN_SUCCESS, token })
    yield call(setToken, { token })
    yield call(browserHistory.push, '/dashboard')
    return token
  } catch (error) {
    yield put({ type: c.LOGIN_FAILURE, error })
  } finally {
    if (yield cancelled()) {

    }
  }
}



export function* loginFlow() {
  while (true) {
      const { username, password } = yield take(c.LOGIN_REQUEST)

      const task = yield fork(authorize, username, password)
      const action = yield take([c.LOGOUT, c.LOGIN_FAILURE])

      if (action.type === c.LOGOUT) {
        yield cancel(task)
        yield call(browserHistory.push, '/')
      }

      yield call(clearToken)
  }
}

function* authorizationCheck(action) {
  try {
    yield call(Api.authCheck)
    yield put({ type: c.AUTH_SUCCESS })
    yield call(action.callback)
  } catch (error) {
    yield put({ type: c.AUTH_FAILURE, error })
    yield call(action.replace, '/')
    yield call(action.callback)
  }
}


export function* watchAuthCheck() {
  yield takeLatest(c.AUTH_CHECK, authorizationCheck)
}
