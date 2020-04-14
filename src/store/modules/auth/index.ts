import {
  IRegister,
  IUserInfo,
  IAuthState,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_INFO,
  USER_INFO_FAILED,
  USER_INFO_SUCCESS,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_SUCCESS,
  IAuthAction,
  IRegisterAction,
  IRegisterFailedAction,
  IRegisterSuccessAction,
  ILoginAction,
  ILoginData,
  ILoginFailedAction,
  ILoginSuccessAction,
  IUserInfoAction,
  IUserInfoFailedAction,
  IUserInfoSuccessAction,
} from './types'

const DEFAULT_AUTH_STATE: IAuthState = {
  userInfo: null,
  loading: false,
  error: '',
  updateError: '',
  updateLoading: false,
}

export interface IUpdateInfo {
  avatar?: string
  username?: string
  password?: string
  nickname?: string
  createdAt?: string
  lastMsg?: string
}

export const updateUserInfoAction = (data: IUpdateInfo, callback: Function) => {
  return {
    type: UPDATE_USER_INFO,
    data,
    callback,
  }
}

export const updateUserInfoFailedAction = (error: string) => {
  return {
    type: UPDATE_USER_INFO_FAILED,
    error,
  }
}

export const updateUserInfoSuccessAction = (data: IUserInfo) => {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    data,
  }
}

export const registerAction = (
  data: IRegister,
  callback: Function
): IRegisterAction => ({
  type: USER_REGISTER,
  data,
  callback,
})

export const registerFailedAction = (error: string): IRegisterFailedAction => ({
  type: USER_REGISTER_FAILED,
  error,
})

export const registerSuccessAction = (
  data: IUserInfo
): IRegisterSuccessAction => ({
  type: USER_REGISTER_SUCCESS,
  data,
})

// login action creators
export const loginAction = (data: ILoginData): ILoginAction => ({
  type: USER_LOGIN,
  data,
})

export const loginFailedAction = (error: string): ILoginFailedAction => ({
  type: USER_LOGIN_FAILED,
  error,
})

export const loginSuccessAction = (data: IUserInfo): ILoginSuccessAction => ({
  type: USER_LOGIN_SUCCESS,
  data,
})

export const userInfoAction = (): IUserInfoAction => ({
  type: USER_INFO,
})

export const userInfoFailedAction = (error: string): IUserInfoFailedAction => ({
  type: USER_INFO_FAILED,
  error,
})

export const userInfoSuccessAction = (
  data: IUserInfo
): IUserInfoSuccessAction => ({
  type: USER_INFO_SUCCESS,
  data,
})

export default function authReducer(
  state: IAuthState = DEFAULT_AUTH_STATE,
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loading: true,
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.data,
        error: '',
      }
    case USER_REGISTER:
      return {
        ...state,
        loading: true,
      }
    case USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.data,
        error: '',
      }
    case USER_INFO:
      return {
        ...state,
        loading: true,
      }
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.data,
        error: '',
      }
    case USER_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        updateLoading: true,
      }
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        userInfo: { ...state.userInfo, ...action.data },
      }
    case UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateError: action.error,
      }
    default:
      return state
  }
}
