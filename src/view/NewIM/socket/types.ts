import { IUserInfo } from '../../../store/modules/auth/types'
import { ISession, IMessage } from '../../../store/modules/session/types'

export enum MessageType {
  FRIEND_LIST = 1001,
  FRIEND_STATUS = 1002,
  FRIEND_DELETE = 1003,
  SESSION_LIST = 2001,
  SESSION_ADD = 2002,
  SESSION_DELETE = 2003,
  MESSAGE_RECEIVE = 3001,
  MESSAGE_LIST = 3002,
  USER_INFO = 4001,
  ERROR_NEED_LOGIN = 5001,
}

type FriendList = {
  type: typeof MessageType.FRIEND_LIST
  data: IUserInfo[]
}

type FriendStatus = {
  type: typeof MessageType.FRIEND_STATUS
  status: 'online' | 'offline'
  data: string[]
}

type SessionList = {
  type: typeof MessageType.SESSION_LIST
  error: string
  data: ISession[]
}

type SessionAdd = {
  type: typeof MessageType.SESSION_ADD
  data: ISession
  error: string
}

type SessionDelete = {
  type: typeof MessageType.SESSION_DELETE
  session_id: string
}

type MessageReceive = {
  type: typeof MessageType.MESSAGE_RECEIVE
  session_id: string
  data: IMessage
}

type MessageList = {
  type: typeof MessageType.MESSAGE_LIST
  session_id: string
  data: IMessage[]
}

export type MessageObject =
  | FriendList
  | FriendStatus
  | SessionList
  | SessionAdd
  | SessionDelete
  | MessageReceive
  | MessageList

type NeedLogin = {
  type: typeof MessageType.ERROR_NEED_LOGIN
}

export type ErrorMessage = NeedLogin
