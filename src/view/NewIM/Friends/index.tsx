import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import {
  friendListAction,
  imSessionAddAction
} from '../../../store/user/actions'
import { IAdmin, IMSession } from '../../../store/user/types'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Fab
} from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Link
} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

interface FriendsProps {
  friends: IAdmin[]
  friendList(): void
  sessionAdd(session: { friend_id: string }): void
}

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  avatar: {
    marginRight: '3vw',
    width: '10vw',
    height: '10vw'
  },
  add: {
    position: 'fixed',
    right: 10,
    bottom: 70
  }
})

interface FriendItemProps {
  friend: IAdmin
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

const Friends: React.SFC<FriendsProps> = ({
  friends,
  friendList,
  sessionAdd
}) => {
  React.useEffect(() => {
    friendList()
  }, [friendList])
  const classes = useStyles()
  return (
    <div>
      <List className={classes.root}>
        {friends.map(item => (
          <FriendItem key={item._id} friend={item} sessionAdd={sessionAdd} />
        ))}
      </List>
      <Link to='/NewIM/friends/add'>
        <Fab color='primary' aria-label='add' className={classes.add}>
          <AddIcon />
        </Fab>
      </Link>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  friends: state.users.friends
})

const mapDispatchToProps = {
  friendList: friendListAction,
  sessionAdd: imSessionAddAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends)
