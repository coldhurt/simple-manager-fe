import io from 'socket.io-client'
import { message } from 'antd'
import { debounce } from 'lodash'

let chat: SocketIOClient.Socket | null = null

const getSocket = (onReceive: Function) => {
  if (!chat) {
    chat = io('/')
    chat.on('receive', onReceive)
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
