import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import { imSessionListAction } from '../../../store/user/actions'
import { IAdmin, IMSession } from '../../../store/user/types'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

interface FriendsProps {
  imSessions: IMSession[]
  sessionList(): void
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
}

const SessionItem: React.SFC<SessionItemProps> = ({ session }) => {
  const classes = useStyles()
  const { friend_id, lastMessage } = session
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={`/NewIM/chat/${friend_id}`} ref={ref} {...itemProps} />
      )),
    [friend_id]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon>
          <Avatar src={''} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText
          primary={friend_id}
          secondary={lastMessage ? lastMessage.message : ''}
        />
      </ListItem>
    </li>
  )
}

const MessageList: React.SFC<FriendsProps> = ({ imSessions, sessionList }) => {
  React.useEffect(() => {
    sessionList()
  }, [sessionList])
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {imSessions.map(item => (
        <SessionItem key={item._id} session={item} />
      ))}
    </List>
  )
}

const mapStateToProps = (state: AppState) => ({
  imSessions: state.users.imSessions
})

const mapDispatchToProps = {
  sessionList: imSessionListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
