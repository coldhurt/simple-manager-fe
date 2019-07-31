import {
  IUserAction,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED
} from '../types'

const DEFAULT_USER_STATE = {
  loading: false,
  error: '',
  success: false
}

export default function login(state = DEFAULT_USER_STATE, action: IUserAction) {
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
