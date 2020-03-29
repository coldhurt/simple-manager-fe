import io from 'socket.io-client'
import { message } from 'antd'
import { debounce } from 'lodash'
import store, { AppState } from '../../../store/index'
import { MessageObject, MessageType } from './types'
import {
  friendListSuccessAction,
  chatBoxAddMessageAction,
  imSessionListAction,
  imSessionListSuccessAction,
  notificationStatusAction
} from '../../../store/user/actions'
import { IMSession } from '../../../store/user/types'
import { scrollToBottom } from '../Chat/ChatMessageList'

const dispatch = store.dispatch

let chat: SocketIOClient.Socket | null = null

const getSocket = () => {
  if (!chat) {
    chat = io('/')
    Notification.requestPermission(function(status) {
      console.log(status) // 仅当值为 "granted" 时显示通知
      store.dispatch(notificationStatusAction(status === 'granted'))
    })
    chat.on('receive', (msg: MessageObject) => {
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
        case MessageType.MESSAGE_RECEIVE:
          console.log(msg)
          if (msg.data && msg.data.session_id) {
            const state: AppState = store.getState()
            const imSessions = Object.create(state.users.imSessions)
            let session_index = -1
            for (let i = 0; i < imSessions.length; i++) {
              if (imSessions[i]._id === msg.data.session_id) {
                session_index = i
                break
              }
            }
            if (session_index === -1) {
              dispatch(imSessionListAction())
            } else {
              const session = Object.create(imSessions[session_index])
              session.unread++
              imSessions[session_index] = session
              dispatch(imSessionListSuccessAction(imSessions))
            }
            // if (state.users.notificationStatus) {
            //   new Notification('消息', { body: msg.data.message })
            // }
            Notification.requestPermission(function(status) {
              new Notification('消息', { body: msg.data.message })
            })
            dispatch(chatBoxAddMessageAction(msg.data))
            scrollToBottom()
          }
          break
      }
    })
    chat.on(
      'connect',
      debounce((msg: string) => {
        message.info('connected')
      }, 2000)
    )
    chat.on('error', (err: any) => {
      if (err && err.message) {
        message.error(err.message)
      }
      // setTimeout(function() {
      if (err === 'need login') {
        window.location.href = '/login'
      }
      // }, 300)
    })
    chat.on('disconnect', (err: any) => {
      // message.error(err)
    })
  }
  return chat
}

export default getSocket
