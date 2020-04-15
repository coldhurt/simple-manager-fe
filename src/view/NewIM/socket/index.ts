import io from 'socket.io-client'
import { message } from 'antd'
import { debounce } from 'lodash'
import store from '../../../store/index'
import { AppState } from '../../../store/modules'
import { MessageObject, MessageType } from './types'
import { scrollToBottom } from '../Chat/ChatMessageList'
import {
  sessionListAction,
  sessionListSuccessAction,
  sessionDeleteSuccessAction,
  chatBoxAddMessageAction,
} from '../../../store/modules/session'
import { friendListSuccessAction } from '../../../store/modules/friend'

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
    this.chat.on('disconnect', this.handleDisconnect)
  }

  handleConnect = debounce((msg: string) => {
    message.info('connected')
  }, 2000)

  handleError = (err: any) => {
    if (err && err.message) {
      message.error(err.message)
    }
    // setTimeout(function() {
    if (err === 'need login') {
      window.location.href = '/login'
    }
    // }, 300)
  }

  handleDisconnect = (err: any) => {
    // message.error(err)
  }

  handleReceive = (msg: MessageObject) => {
    console.log(msg)
    switch (msg.type) {
      case MessageType.FRIEND_LIST:
        dispatch(friendListSuccessAction(msg.data))
        break
      case MessageType.FRIEND_STATUS:
        break
      case MessageType.SESSION_LIST:
        break
      case MessageType.SESSION_ADD:
        break
      case MessageType.MESSAGE_RECEIVE: {
        console.log(msg)
        const session_id = msg.data.session_id
        if (msg.data && session_id) {
          const state: AppState = store.getState()
          const { sessions } = state.session
          const session = sessions[session_id]
          if (!session) {
            dispatch(sessionListAction())
          } else {
            const newSession = { ...session }
            newSession.unread++
            sessions[session_id] = session
            const data = Object.values(sessions)
            dispatch(sessionListSuccessAction(data))
          }
          // if (state.users.notificationStatus) {
          //   new Notification('消息', { body: msg.data.message })
          // }
          // Notification.requestPermission(function (status) {
          //   new Notification('消息', { body: msg.data.message })
          // })
          dispatch(chatBoxAddMessageAction(msg.data))
          scrollToBottom()
        }
        break
      }
      default:
    }
  }

  sendMessage = (msg: { session_id: string; message: string }) => {
    this.chat && this.chat.emit('send', msg)
  }

  getMessage = (session_id: string) => {}

  deleteSession = (session_id: string) => {
    this.chat &&
      this.chat.emit('deleteSession', {
        session_id,
      })
    dispatch(sessionDeleteSuccessAction(session_id))
  }
}

const getSocket = (): Chat => {
  if (!chat) {
    chat = new Chat()
  }
  return chat
}

export default getSocket
