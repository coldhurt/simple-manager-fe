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
export const IM_SESSION_LIST = 'IM_SESSION_LIST'
export const IM_SESSION_LIST_FAILED = 'IM_SESSION_LIST_FAILED'
export const IM_SESSION_LIST_SUCCESS = 'IM_SESSION_LIST_SUCCESS'
export const IM_SESSION_ADD = 'IM_SESSION_ADD'
export const IM_SESSION_ADD_FAILED = 'IM_SESSION_ADD_FAILED'
export const IM_SESSION_ADD_SUCCESS = 'IM_SESSION_ADD_SUCCESS'
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
export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED'
export const NOTIFICATION_STATUS = 'NOTIFICATION_STATUS'

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
  chatboxMessage: Record<string, IMessage[]>
  imSessions: IMSession[]
  notificationStatus: boolean
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
  session_id: string
  send: boolean
  createdAt: string
  _id: string
}

export interface IMSession {
  _id?: string
  lastMessage?: IMessage
  user_id: string
  friend_id: string
  unread: number
  type: number // 1: 个人  2: 群组
}

export interface IRegister {
  username: string
  password: string
  confirmPassword: string
}

export interface IRegisterAction {
  type: typeof USER_REGISTER
  data: IRegister
  callback: Function
}

export interface IRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS
  data: IAdmin
}

export interface IRegisterFailedAction {
  type: typeof USER_REGISTER_FAILED
  error: string
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
  nickname: string
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

export interface IIMSessionListAction {
  type: typeof IM_SESSION_LIST
}

export interface IIMSessionListSuccessAction {
  type: typeof IM_SESSION_LIST_SUCCESS
  data: IMSession[]
}

export interface IIMSessionListFailedAction {
  type: typeof IM_SESSION_LIST_FAILED
  error: string
}

export interface IIMSessionAddAction {
  type: typeof IM_SESSION_ADD
  data: {
    friend_id: string
    type?: number
  }
}

export interface IIMSessionAddSuccessAction {
  type: typeof IM_SESSION_ADD_SUCCESS
  data: IMSession
}

export interface IIMSessionAddFailedAction {
  type: typeof IM_SESSION_ADD_FAILED
  error: string
}

export interface IChatBoxListAction {
  type: typeof CHAT_BOX_LIST
  session_id: string
}

export interface IChatBoxListSuccessAction {
  type: typeof CHAT_BOX_LIST_SUCCESS
  session_id: string
  data: IMessage[]
}

export interface IChatBoxListFailedAction {
  type: typeof CHAT_BOX_LIST_FAILED
  error: string
}

export interface IChatBoxAddMessageAction {
  type: typeof CHAT_BOX_ADD_MESSAGE
  session_id: string
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

export interface INotificationStatusAction {
  type: typeof NOTIFICATION_STATUS
  status: boolean
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
  | IIMSessionAddAction
  | IIMSessionAddFailedAction
  | IIMSessionAddSuccessAction
  | IIMSessionListAction
  | IIMSessionListSuccessAction
  | IIMSessionListFailedAction
  | IRegisterAction
  | IRegisterFailedAction
  | IRegisterSuccessAction
  | INotificationStatusAction
