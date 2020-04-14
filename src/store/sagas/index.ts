import { call, put, takeLatest } from 'redux-saga/effects'
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
  CHAT_BOX_LIST,
  IChatBoxListAction,
  UPDATE_USER_INFO,
  IUpdateUserInfoAction,
  IIMSessionListAction,
  IM_SESSION_LIST,
  IIMSessionAddAction,
  IM_SESSION_ADD,
  IRegisterAction,
  USER_REGISTER,
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
  chatBoxListFailedAction,
  updateUserInfoSuccessAction,
  updateUserInfoFailedAction,
  imSessionListSuccessAction,
  imSessionListFailedAction,
  imSessionAddSuccessAction,
  imSessionAddFailedAction,
  registerSuccessAction,
  registerFailedAction,
} from '../user/actions'
import { Post } from '../../utils'
import { message } from 'antd'

function myFetch(url: string, body?: Object) {
  return Post(url, body)
}

function* login(action: ILoginAction) {
  try {
    const json = yield call(myFetch, `/api/admin/login`, action.admin)
    if (json.success) {
      yield put(loginSuccessAction(json.data))
      const location = window.location
      if (location.search) {
        const url = location.search.match(/url=(\/.+|http.+)/)
        if (url) {
          location.href = url[1]
        }
      } else {
        location.href = '/NewIM'
      }
    } else {
      yield put(loginFailedAction(json.msg))
    }
  } catch (e) {
    message.error(e.message)
    yield put(loginFailedAction(e.message))
  }
}

function* fetchUserList(action: IUserListAction) {
  try {
    const json = yield call(myFetch, '/api/admin/list', {
      nickname: action.nickname,
    })
    yield put(userListSuccessAction(json.data))
  } catch (e) {
    yield put(userListFailedAction(e.message))
  }
}

function* fetchFriendList(action: IFriendListAction) {
  try {
    const json = yield call(myFetch, '/api/friend/list')
    yield put(friendListSuccessAction(json.data))
  } catch (e) {
    yield put(friendListFailedAction(e.message))
  }
}

function* addFriend(action: IFriendAddAction) {
  try {
    const json = yield call(myFetch, '/api/friend/add', {
      friend_id: action.friend_id,
    })
    if (json.success) {
      message.success('添加成功')
    }
    yield put(friendAddSuccessAction(json.data))
  } catch (e) {
    yield put(friendAddFailedAction(e.message))
  }
}

function* fetchUserInfo() {
  try {
    const json = yield call(myFetch, '/api/admin/detail')
    yield put(userInfoSuccessAction(json.data))
  } catch (e) {
    yield put(friendAddFailedAction(e.message))
  }
}

function* fetchChatBoxMessage(action: IChatBoxListAction) {
  try {
    const json = yield call(myFetch, '/api/message/list', {
      session_id: action.session_id,
    })
    yield put(chatBoxListSuccessAction(action.session_id, json.data))
  } catch (e) {
    yield put(chatBoxListFailedAction(e.message))
  }
}

function* updateUserInfo(action: IUpdateUserInfoAction) {
  try {
    const json = yield call(myFetch, '/api/admin/update', action.data)
    action.callback(json)
    yield put(updateUserInfoSuccessAction(json.data))
  } catch (e) {
    yield put(updateUserInfoFailedAction(e.message))
  }
}

function* fetchSessionList(action: IIMSessionListAction) {
  try {
    const json = yield call(myFetch, '/api/session/list')
    yield put(imSessionListSuccessAction(json.data))
  } catch (e) {
    yield put(imSessionListFailedAction(e.message))
  }
}

function* addSession(action: IIMSessionAddAction) {
  try {
    const json = yield call(myFetch, '/api/session/add', action.data)
    yield put(imSessionAddSuccessAction(json.data))
  } catch (e) {
    yield put(imSessionAddFailedAction(e.message))
  }
}

function* register(action: IRegisterAction) {
  try {
    const json = yield call(myFetch, '/api/admin/register', action.data)
    action.callback(json)
    yield put(registerSuccessAction(json.data))
  } catch (e) {
    yield put(registerFailedAction(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(USER_LOGIN, login)
  yield takeLatest(USER_LIST, fetchUserList)
  yield takeLatest(FRIEND_LIST, fetchFriendList)
  yield takeLatest(FRIEND_ADD, addFriend)
  yield takeLatest(USER_INFO, fetchUserInfo)
  yield takeLatest(CHAT_BOX_LIST, fetchChatBoxMessage)
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo)
  yield takeLatest(IM_SESSION_LIST, fetchSessionList)
  yield takeLatest(IM_SESSION_ADD, addSession)
  yield takeLatest(USER_REGISTER, register)
}

export default rootSaga
