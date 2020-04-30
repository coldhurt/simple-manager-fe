import io from 'socket.io-client'
import { toast } from '../../../utils'
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
  localVideoStream: MediaStream | null
  videoConnection: RTCPeerConnection | null
  constructor() {
    this.localVideoStream = null
    this.videoConnection = null
    this.chat = io('/')
    this.chat.on('receive', this.handleReceive)
    this.chat.on('connect', this.handleConnect)
    this.chat.on('error', this.handleError)
    this.chat.on('err', this.handleError)
    this.chat.on('disconnect', this.handleDisconnect)
  }

  handleConnect = debounce((msg: string) => {
    toast.info('connected')
  }, 2000)

  handleError = (err: ErrorMessage) => {
    if (err && err.type)
      switch (err.type) {
        case MessageType.ERROR_NEED_LOGIN:
          window.location.href = '/login'
          break
        default:
      }
    else toast.error(err)
  }

  showNotify = (msg = '', title = '消息') => {
    if (msg && window.Notification)
      window.Notification.requestPermission(function (status) {
        new window.Notification('消息', { body: msg })
      })
  }

  handleDisconnect = (err: any) => {
    toast.error(err)
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
      case MessageType.VIDEO_OFFER:
        this.onOffer(msg.session_id, msg.data)
        break
      case MessageType.VIDEO_ANSWER:
        this.onAnswer(msg.session_id, msg.data)
        break
      case MessageType.VIDEO_ICE_CANDIDATE:
        this.onCandidate(msg.session_id, msg.data)
        break
      case MessageType.VIDEO_LEAVE:
        this.closeVideo()
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

  sendCandidate = (session_id: string, candidate: RTCIceCandidate) => {
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.VIDEO_ICE_CANDIDATE,
        session_id,
        candidate,
      })
  }

  sendOffer = (session_id: string, offer: RTCSessionDescriptionInit) => {
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.VIDEO_OFFER,
        session_id,
        offer,
      })
  }

  sendAnswer = (session_id: string, offer: RTCSessionDescriptionInit) => {
    this.chat &&
      this.chat.emit('fetch', {
        type: MessageType.VIDEO_ANSWER,
        session_id,
        offer,
      })
  }

  startVideo = (
    session_id: string,
    video: HTMLVideoElement,
    friendVideo: HTMLVideoElement
  ) => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'user',
        },
        audio: false,
      })
      .then((stream) => {
        this.localVideoStream = stream
        if (video) {
          try {
            video.src = window.URL.createObjectURL(stream)
          } catch (e) {
            video.srcObject = stream
          }
          this.setupPeerConnection(session_id, stream, friendVideo)
        }
      })
      .catch((err) => {
        toast.error('视频权限获取失败', err)
      })
  }
  closeVideo = () => {
    if (this.localVideoStream) {
      this.localVideoStream.getTracks().forEach(function (track) {
        track.stop()
      })
    }
    this.videoConnection && this.videoConnection.close()
    this.videoConnection = null
  }

  setupPeerConnection = (
    session_id: string,
    stream: MediaStream,
    friendVideo: HTMLVideoElement
  ) => {
    const config = {
      iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
    }
    this.videoConnection = new RTCPeerConnection(config)
    this.videoConnection.ontrack = (e) => {
      friendVideo.src = window.URL.createObjectURL(e.streams[0])
    }
    this.videoConnection.addTrack(stream.getVideoTracks()[0], stream)
    this.videoConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendCandidate(session_id, event.candidate)
      }
    }
    this.videoConnection
      .createOffer()
      .then((offer) => {
        this.sendOffer(session_id, offer)
        this.videoConnection && this.videoConnection.setLocalDescription(offer)
      })
      .catch((err) => {
        console.error('createOffer error', err)
      })
  }

  onOffer = (session_id: string, offer: RTCSessionDescriptionInit) => {
    if (this.videoConnection) {
      const connection = this.videoConnection
      connection.setRemoteDescription(new RTCSessionDescription(offer))
      connection
        .createAnswer()
        .then((answer) => {
          this.sendAnswer(session_id, answer)
          connection && connection.setLocalDescription(answer)
        })
        .catch((err) => {
          console.error('createAnswer error', err)
        })
    }
  }

  onAnswer = (session_id: string, answer: RTCSessionDescriptionInit) => {
    this.videoConnection &&
      this.videoConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      )
  }

  onCandidate = (session_id: string, candidate: RTCIceCandidateInit) => {
    this.videoConnection &&
      this.videoConnection.addIceCandidate(new RTCIceCandidate(candidate))
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
