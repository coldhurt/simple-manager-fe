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
import SettingIcon from '@material-ui/icons/Settings'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useHistory,
} from 'react-router-dom'
import { getAuth } from '../../../store/modules'
import { userInfoAction } from '../../../store/modules/auth'
import getSocket from '../socket'
import { HeaderBar } from '../../../components'
import getText from '../../../i18n'
import { Modal } from 'antd'
import { Post } from '../../../utils'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  user: {
    marginTop: 60,
    padding: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: '1.5em',
  },
})

const User: React.SFC = () => {
  getSocket()
  const userInfo = useSelector(getAuth).userInfo
  const dispatch = useDispatch()
  const history = useHistory()
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
  const onLogout = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: `确定退出吗？`,
      onOk: () => {
        Post('/api/admin/logout').then(() => {
          history.push('/login')
        })
      },
    })
  }
  return userInfo ? (
    <Container className={classes.root}>
      <HeaderBar
        title={(userInfo && userInfo.nickname) || ''}
        showBack={false}
        rightText={getText('Logout')}
        onRight={onLogout}
      />
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
        <ListItem
          button
          disableGutters
          className={classes.user}
          onClick={() => history.push('/NewIM/user/setting')}
        >
          <ListItemIcon>
            <SettingIcon />
          </ListItemIcon>
          <ListItemText primary={getText('Setting')} />
          <ArrowForwardIcon />
        </ListItem>
      </List>
    </Container>
  ) : null
}

export default User
