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
} from '../../../store/modules/session'
import { friendListSuccessAction } from '../../../store/modules/friend'
import { chatBoxAddMessageAction } from '../../../store/user/actions'
// import { notificationStatusAction } from '../../../store/user/actions'

const dispatch = store.dispatch

let chat: SocketIOClient.Socket | null = null

const getSocket = () => {
  if (!chat) {
    chat = io('/')
    // Notification.requestPermission(function (status) {
    //   console.log(status) // 仅当值为 "granted" 时显示通知
    //   store.dispatch(notificationStatusAction(status === 'granted'))
    // })
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
            Notification.requestPermission(function (status) {
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
