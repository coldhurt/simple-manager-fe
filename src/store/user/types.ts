export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_INFO = 'USER_INFO'
export const USER_INFO_FAILED = 'USER_INFO_FAILED'
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS'
export const USER_LIST = 'USER_LIST'
export const USER_LIST_FAILED = 'USER_LIST_FAILED'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const FRIEND_LIST = 'FRIEND_LIST'
export const FRIEND_LIST_FAILED = 'FRIEND_LIST_FAILED'
export const FRIEND_LIST_SUCCESS = 'FRIEND_LIST_SUCCESS'
export const FRIEND_ADD = 'FRIEND_ADD'
export const FRIEND_ADD_FAILED = 'FRIEND_ADD_FAILED'
export const FRIEND_ADD_SUCCESS = 'FRIEND_ADD_SUCCESS'
export const CHAT_BOX_LIST = 'CHAT_BOX_LIST'
export const CHAT_BOX_LIST_FAILED = 'CHAT_BOX_LIST_FAILED'
export const CHAT_BOX_LIST_SUCCESS = 'CHAT_BOX_LIST_SUCCESS'
export const CHAT_BOX_ADD_MESSAGE = 'CHAT_BOX_ADD_MESSAGE'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'

export interface IUserState {
  loading: boolean
  error: string
  success: boolean
  addFriendLoading: boolean
  // 用于登录
  admin: {
    username: string
    password: string
  }
  userInfo: IAdmin | null
  users: IAdmin[]
  friends: IAdmin[]
  chatboxMessage: IMessage[]
}

export interface IAdmin {
  avatar?: string
  username?: string
  password?: string
  nickname?: string
  _id?: string
  createdAt?: string
  lastMsg?: string
}

export interface IMessage {
  message: string
  sender: string
  receiver: string
  type: number
  createdAt: string
  _id: string
}

export interface ILoginAction {
  type: typeof USER_LOGIN
  admin: IAdmin
}

export interface ILoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS
  data: IAdmin
}

export interface ILoginFailedAction {
  type: typeof USER_LOGIN_FAILED
  error: string
}

export interface IUserInfoAction {
  type: typeof USER_INFO
}

export interface IUserInfoSuccessAction {
  type: typeof USER_INFO_SUCCESS
  data: IAdmin
}

export interface IUserInfoFailedAction {
  type: typeof USER_INFO_FAILED
  error: string
}

export interface IUserListAction {
  type: typeof USER_LIST
}

export interface IUserListSuccessAction {
  type: typeof USER_LIST_SUCCESS
  users: IAdmin[]
}

export interface IUserListFailedAction {
  type: typeof USER_LIST_FAILED
  error: string
}

export interface IFriendListAction {
  type: typeof FRIEND_LIST
}

export interface IFriendListSuccessAction {
  type: typeof FRIEND_LIST_SUCCESS
  friends: IAdmin[]
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
  friends: IAdmin[]
}

export interface IFriendAddFailedAction {
  type: typeof FRIEND_ADD_FAILED
  error: string
}

export interface IChatBoxListAction {
  type: typeof CHAT_BOX_LIST
  friend_id: string
}

export interface IChatBoxListSuccessAction {
  type: typeof CHAT_BOX_LIST_SUCCESS
  data: IMessage[]
}

export interface IChatBoxListFailedAction {
  type: typeof CHAT_BOX_LIST_FAILED
  error: string
}

export interface IChatBoxAddMessageAction {
  type: typeof CHAT_BOX_ADD_MESSAGE
  data: IMessage
}

export interface IUpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO
  data: IAdmin
  callback: Function
}

export interface IUpdateUserInfoFailedAction {
  type: typeof UPDATE_USER_INFO_FAILED
  error: string
}

export interface IUpdateUserInfoSuccessAction {
  type: typeof UPDATE_USER_INFO_SUCCESS
  data: IAdmin
}

export type IUserAction =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IUserInfoAction
  | IUserInfoFailedAction
  | IUserInfoSuccessAction
  | IUserListAction
  | IUserListFailedAction
  | IUserListSuccessAction
  | IFriendListAction
  | IFriendListSuccessAction
  | IFriendListFailedAction
  | IFriendAddAction
  | IFriendAddSuccessAction
  | IFriendAddFailedAction
  | IChatBoxListAction
  | IChatBoxListFailedAction
  | IChatBoxListSuccessAction
  | IChatBoxAddMessageAction
  | IUpdateUserInfoAction
  | IUpdateUserInfoSuccessAction
  | IUpdateUserInfoFailedAction
