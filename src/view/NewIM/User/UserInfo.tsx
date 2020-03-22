import * as React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Slide,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles
} from '@material-ui/core'
import { AppState } from '../../../store'
import { userInfoAction } from '../../../store/user/actions'
import { IAdmin } from '../../../store/user/types'
import { HeaderBar } from '../../../components'
import { commonPageStyle } from '../styles'
import ArrowForward from '@material-ui/icons/ArrowForward'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

interface UserInfoProps {
  userInfo: IAdmin | null
  getUserInfo(): void
}

export const useStyles = makeStyles({
  itemRight: {
    textAlign: 'right',
    paddingRight: 10
  }
})

const UserInfo: React.SFC<UserInfoProps> = ({ userInfo, getUserInfo }) => {
  React.useEffect(() => {
    if (!userInfo) getUserInfo()
  }, [userInfo, getUserInfo])
  const classes = commonPageStyle()
  const cls = useStyles()
  const [show, setShow] = React.useState(true)
  const onBack = () => {
    setShow(false)
    return true
  }

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={`/NewIM/user/info/nickname`} ref={ref} {...itemProps} />
      )),
    []
  )
  return (
    <Slide direction='left' in={show} mountOnEnter unmountOnExit>
      <div>
        {userInfo && (
          <Container disableGutters className={classes.root}>
            <HeaderBar
              title={'修改个人信息'}
              showBack={true}
              onBack={onBack}
              backTo='/NewIM/user'
            />
            <List className={classes.content}>
              <ListItem button>
                <ListItemText primary='头像' />
                <ListItemAvatar>
                  <Avatar src={userInfo.avatar} />
                </ListItemAvatar>
              </ListItem>
              <ListItem button component={renderLink}>
                <ListItemText primary='昵称' />
                <ListItemText
                  primary={userInfo.nickname || userInfo.username}
                  className={cls.itemRight}
                />
                <ArrowForward />
              </ListItem>
              <ListItem></ListItem>
            </List>
          </Container>
        )}
      </div>
    </Slide>
  )
}

const mapStateToProps = (state: AppState) => ({
  userInfo: state.users.userInfo
})

const mapDispatchToProps = {
  getUserInfo: userInfoAction
}

export default {
  view: connect(mapStateToProps, mapDispatchToProps)(UserInfo)
}
