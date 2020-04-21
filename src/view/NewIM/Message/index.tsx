import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSession, getFriend } from '../../../store/modules'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  CircularProgress,
  Badge,
} from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { ISession } from '../../../store/modules/session/types'
import {
  sessionListAction,
  sessionDeleteAction,
} from '../../../store/modules/session'
import { friendListAction } from '../../../store/modules/friend'
import { IUserInfo } from '../../../store/modules/auth/types'
import { Modal } from 'antd'
import getSocket from '../socket'

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
  avatar: {
    marginRight: '3vw',
    width: '10vw',
    height: '10vw',
  },
})

interface SessionItemProps {
  session: ISession
  user: IUserInfo | null
  onDelete(id: string): void
}

const SessionItem: React.SFC<SessionItemProps> = React.memo(
  ({ session, user, onDelete }) => {
    const chat = getSocket()
    const classes = useStyles()
    const { friend_id, lastMessage, _id, unread } = session
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
          <RouterLink to={`/NewIM/chat/${_id}`} ref={ref} {...itemProps} />
        )),
      [_id]
    )
    // const dispatch = useDispatch()
    let ver: NodeJS.Timeout | null = null
    const onTouchStart = () => {
      ver = setTimeout(() => {
        Modal.confirm({
          okText: '确定',
          cancelText: '取消',
          title: `确定删除会话吗？`,
          onOk: () => {
            // chat.deleteSession(_id)
            onDelete(_id)
          },
        })
      }, 1000)
    }
    const onTouchEnd = () => ver && clearTimeout(ver)

    return (
      <li>
        <ListItem
          button
          component={renderLink}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <ListItemIcon>
            <Badge
              badgeContent={unread}
              color='secondary'
              className={classes.avatar}
            >
              <Avatar src={user ? user.avatar : ''} />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={user ? user.nickname || user.username : friend_id}
            secondary={lastMessage ? lastMessage.message : ''}
          />
        </ListItem>
      </li>
    )
  }
)

const MessageList: React.SFC = () => {
  const chat = getSocket()
  const { sessions, session_ids, listLoading } = useSelector(getSession)
  const { friends, friend_ids } = useSelector(getFriend)
  React.useEffect(() => {
    chat.getSessions()
  }, [chat])
  React.useEffect(() => {
    if (friend_ids.length === 0) chat.getFriends()
  }, [chat, friend_ids])
  const classes = useStyles()
  const onDeleteSession = (id: string) => {
    chat.deleteSession(id)
  }
  return listLoading ? (
    <CircularProgress />
  ) : (
    <List className={classes.root}>
      {session_ids.map((item) => {
        const session = sessions[item]
        return session ? (
          <SessionItem
            key={item}
            onDelete={onDeleteSession}
            session={session}
            user={friends[session.friend_id]}
          />
        ) : null
      })}
    </List>
  )
}
export default MessageList
