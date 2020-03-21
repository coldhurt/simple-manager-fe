import { makeStyles, Container, Slide } from '@material-ui/core'
import * as React from 'react'
import { IMessage, IAdmin } from '../../../store/user/types'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import {
  friendListAction,
  chatBoxAddMessageAction
} from '../../../store/user/actions'
import { HeaderBar } from '../../../components'
import { useParams } from 'react-router-dom'
import InputBar from './InputBar'
import getSocket from './socket'
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
  friendList(): void
  chatBoxAddMessage(message: IMessage): void
}

const Chat: React.SFC<ChatProps> = ({
  friends,
  friendList,
  chatBoxAddMessage
}) => {
  const onReceive = (msg: IMessage) => {
    chatBoxAddMessage(msg)
    scrollToBottom()
  }
  const chat = getSocket(onReceive)

  const classes = useStyles()

  const params = useParams<{ id: string }>()

  let target = null
  for (const f of friends) {
    if (f._id === params.id) {
      target = f
      break
    }
  }
  React.useEffect(() => {
    if (!friends || friends.length === 0) {
      friendList()
    }
  }, [friends, friendList])

  const onSend = (msg: string) => {
    if (msg && chat) {
      chat.emit('send', {
        receiver: params.id,
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
          <ChatMessageList />
          <InputBar onSend={onSend} />
        </Container>
      </Slide>
    )
  )
}

const mapStateToProps = (state: AppState) => ({
  friends: state.users.friends
})

const mapDispatchToProps = {
  friendList: friendListAction,
  chatBoxAddMessage: chatBoxAddMessageAction
}
export default {
  view: connect(mapStateToProps, mapDispatchToProps)(Chat)
}
