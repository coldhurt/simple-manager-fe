import { makeStyles, Container, Slide } from '@material-ui/core'
import * as React from 'react'
import { IMessage, IAdmin, IMSession } from '../../../store/user/types'
import { getSession, getFriend } from '../../../store/modules'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderBar } from '../../../components'
import { useParams } from 'react-router-dom'
import InputBar from './InputBar'
import getSocket from '../socket/index'
import ChatMessageList from './ChatMessageList'
import { sessionListAction } from '../../../store/modules/session'
import { friendListAction } from '../../../store/modules/friend'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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
    backgroundSize: 'cover',
  },
})

interface ChatProps {
  friends: IAdmin[]
  imSessions: IMSession[]
  friendList(): void
  imSessionList(): void
  chatBoxAddMessage(message: IMessage): void
}

const Chat: React.SFC = () => {
  const chat = getSocket()
  const classes = useStyles()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const session_id = params.id
  const { friends, friend_ids } = useSelector(getFriend)
  const { sessions, session_ids } = useSelector(getSession)
  React.useEffect(() => {
    if (friend_ids.length === 0) {
      dispatch(friendListAction())
    }
  }, [friend_ids, dispatch])
  React.useEffect(() => {
    if (session_ids.length === 0) {
      dispatch(sessionListAction())
    }
  }, [session_ids, dispatch])

  const targetSession = sessions[session_id]
  let friend_id = targetSession ? targetSession.friend_id : null
  console.log('friend_id', friend_id)
  let target = null
  if (friend_id) target = friends[friend_id]

  const onSend = (msg: string) => {
    if (msg && chat) {
      chat.emit('send', {
        session_id,
        message: msg,
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

export default {
  view: Chat,
}
