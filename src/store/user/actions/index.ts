import {
  IAdmin,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS
} from '../types'

// login action creators
export const loginAction = (admin: IAdmin) => {
  return {
    type: USER_LOGIN,
    admin
  }
}

export const loginFailedAction = (error: string) => {
  return {
    type: USER_LOGIN_FAILED,
    error
  }
}

export const loginSuccessAction = () => {
  return {
    type: USER_LOGIN_SUCCESS
  }
}
