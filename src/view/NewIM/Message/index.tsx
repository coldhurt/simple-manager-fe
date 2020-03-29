import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import {
  imSessionListAction,
  friendListAction
} from '../../../store/user/actions'
import { IAdmin, IMSession } from '../../../store/user/types'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  CircularProgress,
  Badge
} from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

interface MessageProps {
  loading: boolean
  imSessions: IMSession[]
  sessionList(): void
  friends: IAdmin[]
  friendList(): void
}

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  avatar: {
    marginRight: '3vw',
    width: '10vw',
    height: '10vw'
  }
})

interface SessionItemProps {
  session: IMSession
  avatars: Map<string, IAdmin>
}

const SessionItem: React.SFC<SessionItemProps> = React.memo(
  ({ session, avatars }) => {
    const classes = useStyles()
    const { friend_id, lastMessage, _id, unread } = session
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
          <RouterLink to={`/NewIM/chat/${_id}`} ref={ref} {...itemProps} />
        )),
      [_id]
    )
    const user = avatars.get(friend_id)

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

const MessageList: React.SFC<MessageProps> = ({
  loading,
  imSessions,
  sessionList,
  friends,
  friendList
}) => {
  React.useEffect(() => {
    sessionList()
    if (friends.length === 0) friendList()
  }, [])
  const classes = useStyles()
  const avatars = new Map()
  for (const f of friends) {
    if (f && f._id) avatars.set(f._id, f)
  }
  return loading ? (
    <CircularProgress />
  ) : (
    <List className={classes.root}>
      {imSessions.map(item => (
        <SessionItem key={item._id} session={item} avatars={avatars} />
      ))}
    </List>
  )
}

const mapStateToProps = (state: AppState) => ({
  imSessions: state.users.imSessions,
  friends: state.users.friends,
  loading: state.users.loading
})

const mapDispatchToProps = {
  sessionList: imSessionListAction,
  friendList: friendListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
