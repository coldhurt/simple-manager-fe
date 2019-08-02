import {
  IUserAction,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  IUserState
} from '../types'

const DEFAULT_USER_STATE: IUserState = {
  loading: false,
  error: '',
  success: false,
  admin: {
    username: '',
    password: ''
  }
}

export default function userReducer(
  state: IUserState = DEFAULT_USER_STATE,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
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
    default:
      return state
  }
}
