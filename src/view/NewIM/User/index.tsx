import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles,
  Container,
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { getAuth } from '../../../store/modules'
import { userInfoAction } from '../../../store/modules/auth'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  user: {
    background: '#eee',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: '1.5em',
  },
})

const User: React.SFC = () => {
  const userInfo = useSelector(getAuth).userInfo
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (!userInfo) {
      dispatch(userInfoAction())
    }
  }, [userInfo, dispatch])
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

export default User
