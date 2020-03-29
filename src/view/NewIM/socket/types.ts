import { IAdmin, IMSession, IMessage } from '../../../store/user/types'

export enum MessageType {
  FRIEND_LIST = 1001,
  FRIEND_STATUS = 1002,
  SESSION_LIST = 2001,
  SESSION_ADD = 2002,
  MESSAGE_RECEIVE = 3001
}

type FriendList = {
  type: typeof MessageType.FRIEND_LIST
  data: IAdmin[]
}

type FriendStatus = {
  type: typeof MessageType.FRIEND_STATUS
  status: 'online' | 'offline'
  data: string[]
}

type SessionList = {
  type: typeof MessageType.SESSION_LIST
  data: IMSession[]
}

type SessionAdd = {
  type: typeof MessageType.SESSION_ADD
  data: IMSession
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
