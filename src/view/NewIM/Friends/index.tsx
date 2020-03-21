import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import { friendListAction } from '../../../store/user/actions'
import { IAdmin } from '../../../store/user/types'
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

interface FriendItemProps {
  friend: IAdmin
}

const FriendItem: React.SFC<FriendItemProps> = ({ friend }) => {
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
      <ListItem button component={renderLink}>
        <ListItemIcon>
          <Avatar src={avatar} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText primary={nickname || username} />
      </ListItem>
    </li>
  )
}

const Friends: React.SFC<FriendsProps> = ({ friends, friendList }) => {
  React.useEffect(() => {
    friendList()
  }, [friendList])
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {friends.map(item => (
        <FriendItem key={item._id} friend={item} />
      ))}
    </List>
  )
}

const mapStateToProps = (state: AppState) => ({
  friends: state.users.friends
})

const mapDispatchToProps = {
  friendList: friendListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends)
