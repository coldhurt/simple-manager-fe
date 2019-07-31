import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  loadedClients,
  addClientSuccess,
  clientsFailure
} from '../client/actions'
import {
  FETCH_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  TOGGLE_CLIENT,
  IAddClientAction,
  IDeleteClientAction,
  IToggleClientAction
} from '../client/types'
import { ILoginAction, USER_LOGIN } from '../user/types'
import { loginSuccessAction, loginFailedAction } from '../user/actions'

const fetchOptions = {
  method: 'POST',
  body: '',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

function* getAllClients() {
  try {
    const res = yield call(fetch, 'getClientList', fetchOptions)
    const clients = yield res.json()
    yield put(loadedClients(clients.data))
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* addClient(action: IAddClientAction) {
  try {
    const res = yield call(fetch, 'addClient', {
      ...fetchOptions,
      body: JSON.stringify(action.client)
    })
    const client = yield res.json()
    yield put(addClientSuccess(client))
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* deleteClient(action: IDeleteClientAction) {
  try {
    yield call(fetch, `deleteClient`, {
      ...fetchOptions,
      body: JSON.stringify({ id: action.id })
    })
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* updateClient(action: IToggleClientAction) {
  try {
    yield call(fetch, `v1/clients/${action.id}`, {
      ...fetchOptions,
      body: JSON.stringify({ id: action.id })
    })
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* login(action: ILoginAction) {
  try {
    const res = yield call(fetch, `login`, {
      ...fetchOptions,
      body: JSON.stringify(action.admin)
    })
    const json = yield res.json()
    if (json.success) {
      yield put(loginSuccessAction())
    } else {
      yield put(loginFailedAction(json.msg))
    }
  } catch (e) {
    yield put(loginFailedAction(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_CLIENTS, getAllClients)
  yield takeLatest(ADD_CLIENT, addClient)
  yield takeLatest(DELETE_CLIENT, deleteClient)
  yield takeEvery(TOGGLE_CLIENT, updateClient)
  yield takeLatest(USER_LOGIN, login)
}

export default rootSaga
