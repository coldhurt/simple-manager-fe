import * as React from 'react'
import { makeStyles, Grid, List, ListItem, Avatar } from '@material-ui/core'
import { getChatBoxMessages, getUserInfo } from '../../../store/modules'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { IUserInfo } from '../../../store/modules/auth/types'
import { IMessage } from '../../../store/modules/session/types'
import { userInfoAction } from '../../../store/modules/auth'
import getSocket from '../socket'
import { pxToVh, pxToVw } from '../../../utils'

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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    position: 'fixed',
    top: pxToVh(56),
    bottom: pxToVh(56),
    left: 0,
    right: 0,
    overflowY: 'scroll',
    padding: pxToVw(10),
  },
  item: {
    alignItems: 'center',
    height: '10vh',
  },
  itemMsg: {
    padding: pxToVw(10),
    backgroundColor: theme.palette.background.paper,
    borderRadius: pxToVw(3),
  },
}))

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
  return (
    <ListItem>
      {!message.send ? (
        <Grid item container justify='flex-start' className={classes.item}>
          <Grid item>
            <Avatar src={targetAvatar} style={{ marginRight: 10 }} />
          </Grid>
          <Grid item className={classes.itemMsg}>
            {message.message}
          </Grid>
        </Grid>
      ) : (
        <Grid item container justify='flex-end' className={classes.item}>
          <Grid item className={classes.itemMsg}>
            {message.message}
          </Grid>
          <Grid item>
            <Avatar
              src={userInfo ? userInfo.avatar : ''}
              style={{ marginLeft: 10 }}
            />
          </Grid>
        </Grid>
      )}
    </ListItem>
  )
}

interface ChatMessageListProps {
  session_id: string
  target: IUserInfo
  onClickList(): void
}

const ChatMessageList: React.SFC<ChatMessageListProps> = ({
  session_id,
  target,
  onClickList,
}) => {
  const chat = getSocket()
  const classes = useStyles()
  const targetAvatar = target ? target.avatar || '' : ''
  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo)
  React.useEffect(() => {
    if (session_id && chat) {
      chat.getMessage(session_id)
      scrollToBottom()
    }
  }, [session_id, chat])
  React.useEffect(() => {
    if (!userInfo) {
      dispatch(userInfoAction())
    }
  }, [userInfo, dispatch])
  const chatBoxMessages = useSelector(getChatBoxMessages)
  const messages = chatBoxMessages[session_id] || []
  return (
    <List
      className={classes.content}
      id='chat-box-message'
      onClick={onClickList}
    >
      {messages.map((item) => (
        <ChatMessageItem
          key={item._id}
          message={item}
          targetAvatar={targetAvatar}
          userInfo={userInfo}
        />
      ))}
    </List>
  )
}

export default ChatMessageList
