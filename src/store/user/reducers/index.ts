import {
  IUserAction,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  IUserState,
  USER_LIST,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  FRIEND_LIST,
  FRIEND_LIST_FAILED,
  FRIEND_LIST_SUCCESS,
  FRIEND_ADD_FAILED,
  FRIEND_ADD,
  FRIEND_ADD_SUCCESS,
  USER_INFO,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  CHAT_BOX_LIST,
  CHAT_BOX_LIST_FAILED,
  CHAT_BOX_LIST_SUCCESS,
  CHAT_BOX_ADD_MESSAGE,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO,
  IM_SESSION_ADD,
  IM_SESSION_ADD_FAILED,
  IM_SESSION_ADD_SUCCESS,
  IM_SESSION_LIST,
  IM_SESSION_LIST_SUCCESS,
  IM_SESSION_LIST_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED
} from '../types'

const DEFAULT_USER_STATE: IUserState = {
  loading: false,
  error: '',
  success: false,
  addFriendLoading: false,
  admin: {
    username: '',
    password: ''
  },
  userInfo: null,
  users: [],
  friends: [],
  chatboxMessage: [],
  imSessions: []
}

export default function userReducer(
  state: IUserState = DEFAULT_USER_STATE,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        loading: true
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case USER_REGISTER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    case USER_LOGIN:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.data,
        loading: false,
        success: true
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case USER_INFO:
      return {
        ...state
      }
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.data
      }
    case USER_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case USER_LIST:
      return {
        ...state,
        loading: true
      }
    case USER_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      }
    case FRIEND_LIST:
      return {
        ...state,
        loading: true
      }
    case FRIEND_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FRIEND_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.friends
      }
    case FRIEND_ADD:
      return {
        ...state,
        addFriendLoading: true
      }
    case FRIEND_ADD_FAILED:
      return {
        ...state,
        addFriendLoading: false,
        error: action.error
      }
    case FRIEND_ADD_SUCCESS:
      return {
        ...state,
        addFriendLoading: false,
        friends: state.friends.concat(action.friends)
      }
    case IM_SESSION_LIST:
      return {
        ...state,
        loading: true
      }
    case IM_SESSION_LIST_SUCCESS:
      return {
        ...state,
        imSessions: action.data,
        loading: false
      }
    case IM_SESSION_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case IM_SESSION_ADD:
      return {
        ...state,
        loading: true
      }
    case IM_SESSION_ADD_SUCCESS:
      return {
        ...state,
        imSessions: [...state.imSessions, action.data],
        loading: false
      }
    case IM_SESSION_ADD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CHAT_BOX_LIST:
      return {
        ...state,
        loading: true
      }
    case CHAT_BOX_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CHAT_BOX_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chatboxMessage: action.data
      }
    case CHAT_BOX_ADD_MESSAGE:
      return {
        ...state,
        chatboxMessage: state.chatboxMessage.concat(action.data)
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.data }
      }
    case UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
