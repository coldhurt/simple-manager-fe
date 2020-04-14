export const SESSION_LIST = 'IM_SESSION_LIST'
export const SESSION_LIST_FAILED = 'IM_SESSION_LIST_FAILED'
export const SESSION_LIST_SUCCESS = 'IM_SESSION_LIST_SUCCESS'
export const SESSION_ADD = 'IM_SESSION_ADD'
export const SESSION_ADD_FAILED = 'IM_SESSION_ADD_FAILED'
export const SESSION_ADD_SUCCESS = 'IM_SESSION_ADD_SUCCESS'
export const SESSION_DELETE = 'IM_SESSION_DELETE'
export const SESSION_DELETE_FAILED = 'IM_SESSION_DELETE_FAILED'
export const SESSION_DELETE_SUCCESS = 'IM_SESSION_DELETE_SUCCESS'
export const CHAT_BOX_LIST = 'CHAT_BOX_LIST'
export const CHAT_BOX_LIST_FAILED = 'CHAT_BOX_LIST_FAILED'
export const CHAT_BOX_LIST_SUCCESS = 'CHAT_BOX_LIST_SUCCESS'

export interface IMessage {
  message: string
  session_id: string
  send: boolean
  createdAt: string
  _id: string
}

export interface ISession {
  _id: string
  lastMessage?: IMessage
  user_id: string
  friend_id: string
  unread: number
  type: number // 1: 个人  2: 群组
}

export interface ISessionState {
  listLoading: boolean
  listError: string
  addLoading: boolean
  addError: string
  deleteLoading: boolean
  deleteError: string
  sessions: Record<string, ISession | null>
  session_ids: string[]
}

export interface ISessionListAction {
  type: typeof SESSION_LIST
}

export interface ISessionListSuccessAction {
  type: typeof SESSION_LIST_SUCCESS
  data: ISession[]
}

export interface ISessionListFailedAction {
  type: typeof SESSION_LIST_FAILED
  error: string
}

export interface ISessionAddAction {
  type: typeof SESSION_ADD
  data: {
    friend_id: string
    type?: number
  }
}

export interface ISessionAddSuccessAction {
  type: typeof SESSION_ADD_SUCCESS
  data: ISession
}

export interface ISessionAddFailedAction {
  type: typeof SESSION_ADD_FAILED
  error: string
}

export interface ISessionDeleteAction {
  type: typeof SESSION_DELETE
  session_id: string
}

export interface ISessionDeleteSuccessAction {
  type: typeof SESSION_DELETE_SUCCESS
  session_id: string
}

export interface ISessionDeleteFailedAction {
  type: typeof SESSION_DELETE_FAILED
  error: string
}

export type ISessionAction =
  | ISessionAddAction
  | ISessionAddFailedAction
  | ISessionAddSuccessAction
  | ISessionListAction
  | ISessionListSuccessAction
  | ISessionListFailedAction
  | ISessionDeleteAction
  | ISessionDeleteSuccessAction
  | ISessionDeleteFailedAction
