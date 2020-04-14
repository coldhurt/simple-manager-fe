import { IUserInfo } from '../../../store/modules/auth/types'
import { ISession, IMessage } from '../../../store/modules/session/types'

export enum MessageType {
  FRIEND_LIST = 1001,
  FRIEND_STATUS = 1002,
  SESSION_LIST = 2001,
  SESSION_ADD = 2002,
  MESSAGE_RECEIVE = 3001,
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
  data: ISession[]
}

type SessionAdd = {
  type: typeof MessageType.SESSION_ADD
  data: ISession
}

type MessageReceive = {
  type: typeof MessageType.MESSAGE_RECEIVE
  session_id: string
  data: IMessage
}

export type MessageObject =
  | FriendList
  | FriendStatus
  | SessionList
  | SessionAdd
  | MessageReceive
