import { IUserInfo } from '../auth/types'

export interface IFriendState {
  listLoading: boolean
  listError: string
  addLoading: boolean
  addError: string
  deleteLoading: boolean
  deleteError: string
  users: IUserInfo[]
  friends: Record<string, IUserInfo | null>
  friend_ids: string[]
}

export const USER_LIST = 'USER_LIST'
export const USER_LIST_FAILED = 'USER_LIST_FAILED'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const FRIEND_LIST = 'FRIEND_LIST'
export const FRIEND_LIST_FAILED = 'FRIEND_LIST_FAILED'
export const FRIEND_LIST_SUCCESS = 'FRIEND_LIST_SUCCESS'
export const FRIEND_ADD = 'FRIEND_ADD'
export const FRIEND_ADD_FAILED = 'FRIEND_ADD_FAILED'
export const FRIEND_ADD_SUCCESS = 'FRIEND_ADD_SUCCESS'
export const FRIEND_DELETE = 'FRIEND_DELETE'
export const FRIEND_DELETE_FAILED = 'FRIEND_DELETE_FAILED'
export const FRIEND_DELETE_SUCCESS = 'FRIEND_DELETE_SUCCESS'

export const actionTypes = {
  USER_LIST,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  FRIEND_LIST,
  FRIEND_LIST_FAILED,
  FRIEND_LIST_SUCCESS,
  FRIEND_ADD,
  FRIEND_ADD_FAILED,
  FRIEND_ADD_SUCCESS,
  FRIEND_DELETE,
  FRIEND_DELETE_FAILED,
  FRIEND_DELETE_SUCCESS,
}

export interface IUserListAction {
  type: typeof USER_LIST
  nickname: string
}

export interface IUserListSuccessAction {
  type: typeof USER_LIST_SUCCESS
  data: IUserInfo[]
}

export interface IUserListFailedAction {
  type: typeof USER_LIST_FAILED
  error: string
}

export interface IUserListAction {
  type: typeof USER_LIST
}

export interface IFriendListAction {
  type: typeof FRIEND_LIST
}

export interface IFriendListSuccessAction {
  type: typeof FRIEND_LIST_SUCCESS
  data: IUserInfo[]
}

export interface IFriendListFailedAction {
  type: typeof FRIEND_LIST_FAILED
  error: string
}

export interface IFriendAddAction {
  type: typeof FRIEND_ADD
  friend_id: string
}

export interface IFriendAddSuccessAction {
  type: typeof FRIEND_ADD_SUCCESS
  data: IUserInfo
}

export interface IFriendAddFailedAction {
  type: typeof FRIEND_ADD_FAILED
  error: string
}

export interface IFriendDeleteAction {
  type: typeof FRIEND_DELETE
  friend_id: string
}

export interface IFriendDeleteSuccessAction {
  type: typeof FRIEND_DELETE_SUCCESS
  friend_id: string
}

export interface IFriendDeleteFailedAction {
  type: typeof FRIEND_DELETE_FAILED
  error: string
}

export type IFriendAction =
  | IUserListAction
  | IUserListFailedAction
  | IUserListSuccessAction
  | IFriendListAction
  | IFriendListFailedAction
  | IFriendListSuccessAction
  | IFriendAddAction
  | IFriendAddFailedAction
  | IFriendAddSuccessAction
  | IFriendDeleteAction
  | IFriendDeleteFailedAction
  | IFriendDeleteSuccessAction
