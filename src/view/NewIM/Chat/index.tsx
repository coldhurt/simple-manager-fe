import { makeStyles, Container, Slide } from '@material-ui/core'
import * as React from 'react'
import { IMessage, IAdmin, IMSession } from '../../../store/user/types'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import {
  friendListAction,
  chatBoxAddMessageAction,
  imSessionListAction
} from '../../../store/user/actions'
import { HeaderBar } from '../../../components'
import { useParams } from 'react-router-dom'
import InputBar from './InputBar'
import getSocket from '../socket/index'
import ChatMessageList, { scrollToBottom } from './ChatMessageList'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  content: {
    position: 'fixed',
    top: 56,
    bottom: 56,
    left: 0,
    right: 0,
    overflowY: 'scroll',
    padding: 10,
    backgroundImage: 'url("/images/chatbox1.jpg")',
    backgroundSize: 'cover'
  }
})

interface ChatProps {
  friends: IAdmin[]
  imSessions: IMSession[]
  friendList(): void
  imSessionList(): void
  chatBoxAddMessage(message: IMessage): void
}

const Chat: React.SFC<ChatProps> = ({
  friends,
  imSessions,
  friendList,
  imSessionList,
  chatBoxAddMessage
}) => {
  const chat = getSocket()

  const classes = useStyles()

  const params = useParams<{ id: string }>()
  const session_id = params.id

  let friend_id = null
  for (const f of imSessions) {
    if (f._id === session_id) {
      friend_id = f.friend_id
    }
  }
  console.log('friend_id', friend_id)

  let target = null
  if (friend_id)
    for (const f of friends) {
      if (f._id === friend_id) {
        target = f
        break
      }
    }
  React.useEffect(() => {
    if (!friends || friends.length === 0) {
      friendList()
    }
  }, [friends, friendList])

  React.useEffect(() => {
    if (!imSessions || imSessions.length === 0) {
      imSessionList()
    }
  }, [imSessions, imSessionList])

  const onSend = (msg: string) => {
    if (msg && chat) {
      chat.emit('send', {
        session_id,
        message: msg
      })
    }
  }
  return (
    target && (
      <Slide
        direction='left'
        in={target ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.root} disableGutters>
          <HeaderBar
            title={target.nickname || target.username || ''}
            showBack={true}
          />
          <ChatMessageList session_id={session_id} target={target} />
          <InputBar onSend={onSend} />
        </Container>
      </Slide>
    )
  )
}

const mapStateToProps = (state: AppState) => ({
  friends: state.users.friends,
  imSessions: state.users.imSessions
})

const mapDispatchToProps = {
  friendList: friendListAction,
  chatBoxAddMessage: chatBoxAddMessageAction,
  imSessionList: imSessionListAction
}
export default {
  view: connect(mapStateToProps, mapDispatchToProps)(Chat)
}
