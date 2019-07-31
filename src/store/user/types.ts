export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'

export interface IUserState {
  loading: boolean
  error: string
  success: boolean
}

export interface IAdmin {
  username: string
  password: string
}

export interface ILoginAction {
  type: typeof USER_LOGIN
  admin: IAdmin
}

export interface ILoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS
  msg: string
}

export interface ILoginFailedAction {
  type: typeof USER_LOGIN_FAILED
  error: string
}

export type IUserAction =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
