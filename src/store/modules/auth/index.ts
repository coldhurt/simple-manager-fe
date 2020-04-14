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
}

export const actions = {
  registerAction: (data: IRegister, callback: Function): IRegisterAction => ({
    type: USER_REGISTER,
    data,
    callback,
  }),

  registerFailed: (error: string): IRegisterFailedAction => ({
    type: USER_REGISTER_FAILED,
    error,
  }),

  registerSuccess: (data: IUserInfo): IRegisterSuccessAction => ({
    type: USER_REGISTER_SUCCESS,
    data,
  }),

  // login action creators
  loginAction: (data: ILoginData): ILoginAction => ({
    type: USER_LOGIN,
    data,
  }),

  loginFailedAction: (error: string): ILoginFailedAction => ({
    type: USER_LOGIN_FAILED,
    error,
  }),

  loginSuccessAction: (data: IUserInfo): ILoginSuccessAction => ({
    type: USER_LOGIN_SUCCESS,
    data,
  }),

  userInfoAction: (): IUserInfoAction => ({
    type: USER_INFO,
  }),

  userInfoFailedAction: (error: string): IUserInfoFailedAction => ({
    type: USER_INFO_FAILED,
    error,
  }),

  userInfoSuccessAction: (data: IUserInfo): IUserInfoSuccessAction => ({
    type: USER_INFO_SUCCESS,
    data,
  }),
}

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
    default:
      return state
  }
}
