import * as React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { IMessage, IAdmin } from '../../../store/user/types'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import { useParams } from 'react-router-dom'
import { userInfoAction, chatBoxListAction } from '../../../store/user/actions'
import { debounce } from 'lodash'

export const scrollToBottom = debounce(() => {
  setTimeout(() => {
    const dom = document.getElementById('chat-box-message')
    if (dom)
      dom.scrollTo({
        left: 0,
        top: dom.scrollHeight,
        behavior: 'smooth'
      })
  }, 200)
}, 300)

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

interface ChatMessageItemProps {
  message: IMessage
  targetAvatar: string
  userInfo: IAdmin | null
}

const ChatMessageItem: React.SFC<ChatMessageItemProps> = ({
  message,
  targetAvatar,
  userInfo
}) => {
  return userInfo && message.receiver === userInfo._id ? (
    <Grid item container justify='flex-start' alignItems='center'>
      <Grid item>
        <Avatar src={targetAvatar} style={{ marginRight: 10 }} />
      </Grid>
      <Grid item>{message.message}</Grid>
    </Grid>
  ) : (
    <Grid item container justify='flex-end' alignItems='center'>
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
  chatboxMessage: IMessage[]
  userInfo: IAdmin | null
  friends: IAdmin[]
  getUserInfo(): void
  chatBoxList(friend_id: string): void
}

const ChatMessageList: React.SFC<ChatMessageListProps> = ({
  chatboxMessage,
  userInfo,
  friends,
  getUserInfo,
  chatBoxList
}) => {
  const classes = useStyles()
  let targetAvatar = ''
  const params = useParams<{ id: string }>()
  for (const f of friends) {
    if (f._id === params.id) {
      targetAvatar = f.avatar || ''
      break
    }
  }
  React.useEffect(() => {
    if (params.id) {
      console.log(chatBoxList(params.id))
      scrollToBottom()
    }
  }, [params.id, chatBoxList])
  React.useEffect(() => {
    if (!userInfo) {
      getUserInfo()
    }
  }, [userInfo, getUserInfo])
  return (
    <Grid
      container
      className={classes.content}
      id='chat-box-message'
      spacing={2}
    >
      {chatboxMessage.map(item => (
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

const mapStateToProps = (state: AppState) => ({
  chatboxMessage: state.users.chatboxMessage,
  userInfo: state.users.userInfo,
  friends: state.users.friends
})

const mapDispatchToProps = {
  getUserInfo: userInfoAction,
  chatBoxList: chatBoxListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageList)
