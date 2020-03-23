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
  makeStyles,
  Button
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
import { message } from 'antd'

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
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      console.log(files[0])
      const file = files[0]
      if (file.size > 1024000) {
        message.error('图片大小不能大于1MB')
        return
      }

      const formData = new FormData()
      formData.append('myFile', file)

      fetch('/api/admin/setAvatar', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.success) {
            getUserInfo()
          }
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
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
                {/* <Button variant='contained' component='label'>
                  Upload File
                  <input type='file' style={{ display: 'none' }} />
                </Button> */}
                <ListItemAvatar>
                  <Button component='label'>
                    <Avatar src={userInfo.avatar} />
                    <input
                      onChange={onChangeFile}
                      accept='image/png, image/jpeg'
                      type='file'
                      style={{ display: 'none' }}
                    />
                  </Button>
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
