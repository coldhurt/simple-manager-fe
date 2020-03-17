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
import {
  ILoginAction,
  USER_LOGIN,
  IUserListAction,
  USER_LIST,
  FRIEND_LIST,
  IFriendListAction,
  FRIEND_ADD,
  IFriendAddAction,
  USER_INFO,
  IUserInfoAction,
  CHAT_BOX_LIST,
  IChatBoxListAction
} from '../user/types'
import {
  loginSuccessAction,
  loginFailedAction,
  userListSuccessAction,
  userListFailedAction,
  friendListSuccessAction,
  friendListFailedAction,
  friendAddSuccessAction,
  friendAddFailedAction,
  userInfoSuccessAction,
  chatBoxListSuccessAction,
  chatBoxListFailedAction
} from '../user/actions'
import { IFetchArticleAction, FETCH_ARTICLES } from '../article/types'
import { fetchArticlesFailed, fetchArticlesSuccess } from '../article/actions'

const fetchOptions = {
  method: 'POST',
  body: '',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

function myFetch(url: string, options: RequestInit) {
  return fetch(`${url}`, options)
}

function* getAllClients() {
  try {
    const res = yield call(myFetch, '/api/client/list', fetchOptions)
    const clients = yield res.json()
    yield put(loadedClients(clients.data))
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* addClient(action: IAddClientAction) {
  try {
    const res = yield call(myFetch, '/api/client/add', {
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
    yield call(myFetch, `/api/client/delete`, {
      ...fetchOptions,
      body: JSON.stringify({ id: action.id })
    })
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* updateClient(action: IToggleClientAction) {
  try {
    yield call(myFetch, `/api/client/update`, {
      ...fetchOptions,
      body: JSON.stringify({ id: action.id })
    })
  } catch (e) {
    yield put(clientsFailure(e.message))
  }
}

function* login(action: ILoginAction) {
  try {
    const res = yield call(myFetch, `/api/admin/login`, {
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

function* fetchUserList(action: IUserListAction) {
  try {
    const res = yield call(myFetch, '/api/admin/list', fetchOptions)
    const userRes = yield res.json()
    yield put(userListSuccessAction(userRes.data))
  } catch (e) {
    yield put(userListFailedAction(e.message))
  }
}

function* fetchArticleList(action: IFetchArticleAction) {
  try {
    const res = yield call(myFetch, '/api/article/list', fetchOptions)
    const userRes = yield res.json()
    yield put(fetchArticlesSuccess(userRes.data))
  } catch (e) {
    yield put(fetchArticlesFailed(e.message))
  }
}

function* fetchFriendList(action: IFriendListAction) {
  try {
    const res = yield call(myFetch, '/api/friend/list', fetchOptions)
    const userRes = yield res.json()
    yield put(friendListSuccessAction(userRes.data))
  } catch (e) {
    yield put(friendListFailedAction(e.message))
  }
}

function* addFriend(action: IFriendAddAction) {
  try {
    const res = yield call(myFetch, '/api/friend/add', {
      ...fetchOptions,
      body: JSON.stringify({ friend_id: action.friend_id })
    })
    const userRes = yield res.json()
    yield put(friendAddSuccessAction(userRes.data))
  } catch (e) {
    yield put(friendAddFailedAction(e.message))
  }
}

function* fetchUserInfo() {
  try {
    const res = yield call(myFetch, '/api/admin/detail', fetchOptions)
    const userRes = yield res.json()
    yield put(userInfoSuccessAction(userRes.data))
  } catch (e) {
    yield put(friendAddFailedAction(e.message))
  }
}

function* fetchChatBoxMessage(action: IChatBoxListAction) {
  try {
    const res = yield call(myFetch, '/api/message/list', {
      ...fetchOptions,
      body: JSON.stringify({ friend_id: action.friend_id })
    })
    const userRes = yield res.json()
    yield put(chatBoxListSuccessAction(userRes.data))
  } catch (e) {
    yield put(chatBoxListFailedAction(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_CLIENTS, getAllClients)
  yield takeLatest(ADD_CLIENT, addClient)
  yield takeLatest(DELETE_CLIENT, deleteClient)
  yield takeEvery(TOGGLE_CLIENT, updateClient)
  yield takeLatest(USER_LOGIN, login)
  yield takeLatest(USER_LIST, fetchUserList)
  yield takeLatest(FETCH_ARTICLES, fetchArticleList)
  yield takeLatest(FRIEND_LIST, fetchFriendList)
  yield takeLatest(FRIEND_ADD, addFriend)
  yield takeLatest(USER_INFO, fetchUserInfo)
  yield takeLatest(CHAT_BOX_LIST, fetchChatBoxMessage)
}

export default rootSaga
