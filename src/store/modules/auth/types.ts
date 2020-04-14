// action types
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED'
export const USER_INFO = 'USER_INFO'
export const USER_INFO_FAILED = 'USER_INFO_FAILED'
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'

export const actionTypes = {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_INFO,
  USER_INFO_FAILED,
  USER_INFO_SUCCESS,
}

export interface IAuthState {
  userInfo: IUserInfo | null
  loading: boolean
  error: string
}

export interface IRegister {
  username: string
  password: string
  confirmPassword: string
}

export interface IUserInfo {
  avatar?: string
  username?: string
  password?: string
  nickname?: string
  _id: string
  createdAt?: string
  lastMsg?: string
}

export interface ILoginData {
  username: string
  password: string
}

export interface ILoginAction {
  type: typeof USER_LOGIN
  data: ILoginData
}

export interface ILoginFailedAction {
  type: typeof USER_LOGIN_FAILED
  error: string
}

export interface ILoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS
  data: IUserInfo
}

export interface IRegisterAction {
  type: typeof USER_REGISTER
  data: IRegister
  callback: Function
}

export interface IRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS
  data: IUserInfo
}

export interface IRegisterFailedAction {
  type: typeof USER_REGISTER_FAILED
  error: string
}

export interface IUserInfoAction {
  type: typeof USER_INFO
}

export interface IUserInfoSuccessAction {
  type: typeof USER_INFO_SUCCESS
  data: IUserInfo
}

export interface IUserInfoFailedAction {
  type: typeof USER_INFO_FAILED
  error: string
}

export interface IUpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO
  data: IUserInfo
  callback: Function
}

export interface IUpdateUserInfoFailedAction {
  type: typeof UPDATE_USER_INFO_FAILED
  error: string
}

export interface IUpdateUserInfoSuccessAction {
  type: typeof UPDATE_USER_INFO_SUCCESS
  data: IUserInfo
}

export type IAuthAction =
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | IUserInfoAction
  | IUserInfoFailedAction
  | IUserInfoSuccessAction
  | IUpdateUserInfoAction
  | IUpdateUserInfoSuccessAction
  | IUpdateUserInfoFailedAction
