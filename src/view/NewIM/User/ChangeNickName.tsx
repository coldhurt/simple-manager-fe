import {
  TextField,
  Slide,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@material-ui/core'
import * as React from 'react'
import { IAdmin } from '../../../store/user/types'
import { HeaderBar } from '../../../components'
import { commonPageStyle } from '../styles'
import { useStyles } from './UserInfo'
import {
  userInfoAction,
  updateUserInfoAction
} from '../../../store/user/actions'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'

interface ChangeNickNameProps {
  userInfo: IAdmin | null
  getUserInfo(): void
  updateUserInfo(data: IAdmin, callback: Function): void
  loading: boolean
}

const ChangeNickName: React.SFC<ChangeNickNameProps> = ({
  userInfo,
  getUserInfo,
  updateUserInfo,
  loading
}) => {
  React.useEffect(() => {
    if (!userInfo) getUserInfo()
  }, [userInfo, getUserInfo])
  const [text, setText] = React.useState(userInfo ? userInfo.nickname : '')
  React.useEffect(() => {
    if (!userInfo) getUserInfo()
  }, [userInfo, getUserInfo])
  const classes = commonPageStyle()
  const cls = useStyles()
  const history = useHistory()
  const onSave = async () => {
    updateUserInfo({ nickname: text }, (res: any) => {
      if (res && res.success) {
        message.success('修改成功')
        setTimeout(() => {
          history.goBack()
        })
      }
    })
  }
  return (
    <Slide direction='left' in={true} mountOnEnter unmountOnExit>
      <div>
        {userInfo && (
          <Container disableGutters className={classes.root}>
            <HeaderBar
              title={'修改昵称'}
              showBack={true}
              backTo='/NewIM/user'
              rightText='保存'
              onRight={onSave}
            />
            {loading && <CircularProgress />}
            <List className={classes.content}>
              <ListItem>
                <ListItemText primary='昵称' />
                <TextField
                  value={text}
                  onChange={e => setText(e.target.value)}
                  InputProps={{
                    classes: {
                      input: cls.itemRight
                    }
                  }}
                />
              </ListItem>
            </List>
          </Container>
        )}
      </div>
    </Slide>
  )
}

const mapStateToProps = (state: AppState) => ({
  userInfo: state.users.userInfo,
  loading: state.users.loading
})

const mapDispatchToProps = {
  getUserInfo: userInfoAction,
  updateUserInfo: updateUserInfoAction
}

export default {
  view: connect(mapStateToProps, mapDispatchToProps)(ChangeNickName)
}
