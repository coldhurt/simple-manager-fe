import {
  TextField,
  Slide,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core'
import * as React from 'react'
import { HeaderBar } from '../../../components'
import { commonPageStyle } from '../styles'
import { useStyles } from './UserInfo'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  userInfoAction,
  updateUserInfoAction,
} from '../../../store/modules/auth'
import { getAuth } from '../../../store/modules'

const ChangeNickName: React.SFC = () => {
  const dispatch = useDispatch()
  const { userInfo, updateLoading } = useSelector(getAuth)
  React.useEffect(() => {
    if (!userInfo) dispatch(userInfoAction())
  }, [userInfo, dispatch])
  const [text, setText] = React.useState(userInfo ? userInfo.nickname : '')
  const classes = commonPageStyle()
  const cls = useStyles()
  const history = useHistory()
  const onSave = () => {
    dispatch(
      updateUserInfoAction({ nickname: text }, (res: any) => {
        if (res && res.success) {
          message.success('修改成功')
          setTimeout(() => {
            history.goBack()
          })
        }
      })
    )
  }
  return (
    <Slide direction='left' in={true} mountOnEnter unmountOnExit>
      <div>
        {userInfo && (
          <Container disableGutters className={classes.root}>
            <HeaderBar
              title={'修改昵称'}
              showBack={true}
              backTo='/NewIM/user/info'
              rightText='保存'
              onRight={onSave}
            />
            {updateLoading && <CircularProgress />}
            <List className={classes.content}>
              <ListItem>
                <ListItemText primary='昵称' />
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  InputProps={{
                    classes: {
                      input: cls.itemRight,
                    },
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
export default {
  view: ChangeNickName,
}
