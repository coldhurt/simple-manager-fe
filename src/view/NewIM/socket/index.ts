import io from 'socket.io-client'
import { message } from 'antd'
import { debounce } from 'lodash'
import store from '../../../store/index'
import { AppState } from '../../../store/modules'
import { MessageObject, MessageType, ErrorMessage } from './types'
import { scrollToBottom } from '../Chat/ChatMessageList'
import {
  sessionListAction,
  sessionListSuccessAction,
  sessionDeleteSuccessAction,
  chatBoxAddMessageAction,
  chatBoxListSuccessAction,
  sessionDeleteAction,
  sessionAddAction,
  sessionAddFailedAction,
  sessionAddSuccessAction,
  sessionListFailedAction,
  chatBoxListAction,
} from '../../../store/modules/session'
import {
  friendListSuccessAction,
  friendListAction,
} from '../../../store/modules/friend'

const dispatch = store.dispatch

export type ChatType = SocketIOClient.Socket | null

let chat: Chat | null = null

class Chat {
  chat: ChatType
  constructor() {
    this.chat = io('/')
    this.chat.on('receive', this.handleReceive)
    this.chat.on('connect', this.handleConnect)
    this.chat.on('error', this.handleError)
    this.chat.on('err', this.handleError)
    this.chat.on('disconnect', this.handleDisconnect)
  }

  handleConnect = debounce((msg: string) => {
    message.info('connected')
  }, 2000)

  handleError = (err: ErrorMessage) => {
    if (err && err.type)
      switch (err.type) {
        case MessageType.ERROR_NEED_LOGIN:
          window.location.href = '/login'
          break
        default:
      }
    else message.error(err)
  }

  showNotify = (msg = '', title = '消息') => {
    if (msg && window.Notification)
      window.Notification.requestPermission(function (status) {
        new window.Notification('消息', { body: msg })
      })
  }

  handleDisconnect = (err: any) => {
    message.error(err)
  }

  handleReceive = (msg: MessageObject) => {
    console.log('socket <<< ', msg)
    switch (msg.type) {
      case MessageType.FRIEND_LIST:
        dispatch(friendListSuccessAction(msg.data))
        break
      case MessageType.FRIEND_STATUS:
        break
      case MessageType.SESSION_LIST:
        if (msg.error) {
          dispatch(sessionListFailedAction(msg.error))
        } else {
          dispatch(sessionListSuccessAction(msg.data))
        }
        break
      case MessageType.SESSION_ADD:
        if (msg.error) {
          dispatch(sessionAddFailedAction(msg.error))
        } else {
          dispatch(sessionAddSuccessAction(msg.data))
        }
        break
      case MessageType.SESSION_DELETE:
        dispatch(sessionDeleteSuccessAction(msg.session_id))
        break
      case MessageType.MESSAGE_RECEIVE: {
        console.log(msg)
        const session_id = msg.data.session_id
        if (msg.data && session_id) {
          const state: AppState = store.getState()
          const sessions = { ...state.session.sessions }
          const session = sessions[session_id]
          if (!session) {
            dispatch(sessionListAction())
          } else {
            const newSession = { ...session }
            newSession.unread++
            sessions[session_id] = newSession
            const data = Object.values(sessions)
            dispatch(sessionListSuccessAction(data))
          }
          dispatch(chatBoxAddMessageAction(msg.data))
          scrollToBottom()
        }
        break
      }
      case MessageType.MESSAGE_LIST:
        dispatch(chatBoxListSuccessAction(msg.session_id, msg.data))
        break
      default:
    }
  }

  sendMessage = (msg: { session_id: string; message: string }) => {
    this.chat && this.chat.emit('send', msg)
  }

  getMessage = (session_id: string) => {
    dispatch(chatBoxListAction(session_id))
    console.log('socket >>> message list', session_id)
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.MESSAGE_LIST,
        session_id,
      })
  }

  getFriends = () => {
    dispatch(friendListAction())
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.FRIEND_LIST,
      })
  }

  getSessions = () => {
    dispatch(sessionListAction())
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.SESSION_LIST,
      })
  }

  addSession = (friend_id: string) => {
    dispatch(sessionAddAction({ friend_id }))
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.SESSION_ADD,
        friend_id,
      })
  }

  deleteSession = (session_id: string) => {
    dispatch(sessionDeleteAction(session_id))
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.SESSION_DELETE,
        session_id,
      })
  }

  logout = () => {}
}

const getSocket = (): Chat => {
  if (!chat) {
    chat = new Chat()
  }
  return chat
}

export default getSocket
