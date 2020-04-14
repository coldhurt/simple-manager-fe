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
import { sessionListAction } from '../../../store/modules/session'
import { friendListAction } from '../../../store/modules/friend'
import { IUserInfo } from '../../../store/modules/auth/types'

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
}

const SessionItem: React.SFC<SessionItemProps> = React.memo(
  ({ session, user }) => {
    const classes = useStyles()
    const { friend_id, lastMessage, _id, unread } = session
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
          <RouterLink to={`/NewIM/chat/${_id}`} ref={ref} {...itemProps} />
        )),
      [_id]
    )

    return (
      <li>
        <ListItem button component={renderLink}>
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
  const dispatch = useDispatch()
  const { sessions, session_ids, listLoading } = useSelector(getSession)
  const { friends, friend_ids } = useSelector(getFriend)
  React.useEffect(() => {
    dispatch(sessionListAction())
    if (friend_ids.length === 0) dispatch(friendListAction())
  }, [friend_ids, dispatch])
  const classes = useStyles()
  return listLoading ? (
    <CircularProgress />
  ) : (
    <List className={classes.root}>
      {session_ids.map((item) => {
        const session = sessions[item]
        return session ? (
          <SessionItem
            key={item}
            session={session}
            user={friends[session.friend_id]}
          />
        ) : null
      })}
    </List>
  )
}
export default MessageList
