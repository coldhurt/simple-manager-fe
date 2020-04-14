import * as React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { getChatBoxMessages, getUserInfo } from '../../../store/modules'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'antd'
import { debounce } from 'lodash'
import { IUserInfo } from '../../../store/modules/auth/types'
import { IMessage } from '../../../store/modules/session/types'
import { chatBoxListAction } from '../../../store/modules/session'
import { userInfoAction } from '../../../store/modules/auth'

export const scrollToBottom = debounce(() => {
  setTimeout(() => {
    const dom = document.getElementById('chat-box-message')
    if (dom)
      dom.scrollTo({
        left: 0,
        top: dom.scrollHeight,
        behavior: 'smooth',
      })
  }, 200)
}, 300)

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
  item: {
    alignItems: 'center',
    height: '10vh',
  },
})

interface ChatMessageItemProps {
  message: IMessage
  targetAvatar: string
  userInfo: IUserInfo | null
}

const ChatMessageItem: React.SFC<ChatMessageItemProps> = ({
  message,
  targetAvatar,
  userInfo,
}) => {
  const classes = useStyles()
  return !message.send ? (
    <Grid item container justify='flex-start' className={classes.item}>
      <Grid item>
        <Avatar src={targetAvatar} style={{ marginRight: 10 }} />
      </Grid>
      <Grid item>{message.message}</Grid>
    </Grid>
  ) : (
    <Grid item container justify='flex-end' className={classes.item}>
      <Grid item>{message.message}</Grid>
      <Grid item>
        <Avatar
          src={userInfo ? userInfo.avatar : ''}
          style={{ marginLeft: 10 }}
        />
      </Grid>
    </Grid>
  )
}

interface ChatMessageListProps {
  session_id: string
  target: IUserInfo
}

const ChatMessageList: React.SFC<ChatMessageListProps> = ({
  session_id,
  target,
}) => {
  const classes = useStyles()
  const targetAvatar = target ? target.avatar || '' : ''
  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo)
  React.useEffect(() => {
    if (session_id) {
      console.log(dispatch(chatBoxListAction(session_id)))
      scrollToBottom()
    }
  }, [session_id, dispatch])
  React.useEffect(() => {
    if (!userInfo) {
      dispatch(userInfoAction())
    }
  }, [userInfo, dispatch])
  const chatBoxMessages = useSelector(getChatBoxMessages)
  const messages = chatBoxMessages[session_id] || []
  console.log('session_id', session_id)
  console.log('messsages', messages)
  return (
    <Grid
      container
      className={classes.content}
      id='chat-box-message'
      spacing={2}
    >
      {messages.map((item) => (
        <ChatMessageItem
          key={item._id}
          message={item}
          targetAvatar={targetAvatar}
          userInfo={userInfo}
        />
      ))}
    </Grid>
  )
}

export default ChatMessageList
