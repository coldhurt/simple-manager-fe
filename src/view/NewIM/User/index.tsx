import * as React from 'react'
import { AppState } from '../../../store'
import { userInfoAction } from '../../../store/user/actions'
import { connect } from 'react-redux'
import { IUserState } from '../../../store/user/types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles,
  Container
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

interface UserProps {
  users: IUserState
  getUserInfo(): void
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  user: {
    background: '#eee',
    marginTop: 10,
    padding: 10,
    alignItems: 'center'
  },
  username: {
    fontSize: '1.5em'
  }
})

const User: React.SFC<UserProps> = ({ users, getUserInfo }) => {
  const { userInfo } = users
  React.useEffect(() => {
    if (!userInfo) {
      getUserInfo()
    }
  }, [userInfo, getUserInfo])
  const classes = useStyles()
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={`/NewIM/user/info`} ref={ref} {...itemProps} />
      )),
    []
  )
  return userInfo ? (
    <Container className={classes.root}>
      <List disablePadding>
        <ListItem
          button
          disableGutters
          className={classes.user}
          component={renderLink}
        >
          <ListItemIcon>
            <Avatar variant='rounded' src={userInfo.avatar} />
          </ListItemIcon>
          <ListItemText primary={userInfo.nickname || userInfo.username} />
          <ArrowForwardIcon />
        </ListItem>
      </List>
    </Container>
  ) : null
}

const mapStateToProps = (state: AppState) => ({
  users: state.users
})

const mapDispatchToProps = {
  getUserInfo: userInfoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
