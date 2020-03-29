import io from 'socket.io-client'
import { message } from 'antd'
import { debounce } from 'lodash'
import store, { AppState } from '../../../store/index'
import { MessageObject, MessageType } from './types'
import {
  friendListSuccessAction,
  chatBoxAddMessageAction,
  imSessionListAction,
  imSessionListSuccessAction
} from '../../../store/user/actions'
import { IMSession } from '../../../store/user/types'

const dispatch = store.dispatch

let chat: SocketIOClient.Socket | null = null

const getSocket = () => {
  if (!chat) {
    chat = io('/')
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
            const session = imSessions.filter(
              (item: IMSession) => item._id === msg.data.session_id
            )
            if (!session) {
              dispatch(imSessionListAction())
            } else {
              session.unread++
              dispatch(imSessionListSuccessAction(imSessions))
            }
          }
          dispatch(chatBoxAddMessageAction(msg.data))
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
