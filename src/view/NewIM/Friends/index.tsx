import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFriend, getSession } from '../../../store/modules'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Fab,
} from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Link,
} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { sessionAddAction } from '../../../store/modules/session'
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
  add: {
    position: 'fixed',
    right: 10,
    bottom: 70,
  },
})

interface FriendItemProps {
  friend: IUserInfo
  sessionAdd(session: { friend_id: string }): void
}

const FriendItem: React.SFC<FriendItemProps> = ({ friend, sessionAdd }) => {
  const classes = useStyles()
  const { _id, avatar, username, nickname } = friend
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={`/NewIM/chat/${_id}`} ref={ref} {...itemProps} />
      )),
    [_id]
  )

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        onClick={() => sessionAdd({ friend_id: _id || '' })}
      >
        <ListItemIcon>
          <Avatar src={avatar} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText primary={nickname || username} />
      </ListItem>
    </li>
  )
}

const Friends: React.SFC = () => {
  const dispatch = useDispatch()
  const { friends, friend_ids } = useSelector(getFriend)
  const { sessions, session_ids } = useSelector(getSession)
  React.useEffect(() => {
    if (friend_ids.length === 0) dispatch(friendListAction())
  }, [dispatch, friend_ids])
  const onAddSession = (data: { friend_id: string }) => {
    for (const session_id of session_ids) {
      const session = sessions[session_id]
      if (session && session.friend_id === data.friend_id) {
        return
      }
    }
    dispatch(sessionAddAction(data))
  }
  const classes = useStyles()
  return (
    <div>
      <List className={classes.root}>
        {friend_ids.map((item) => {
          const friend = friends[item]
          return friend ? (
            <FriendItem key={item} friend={friend} sessionAdd={onAddSession} />
          ) : null
        })}
      </List>
      <Link to='/NewIM/friends/add'>
        <Fab color='primary' aria-label='add' className={classes.add}>
          <AddIcon />
        </Fab>
      </Link>
    </div>
  )
}
export default Friends
