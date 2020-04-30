import {
  TextField,
  Slide,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles,
  Button,
} from '@material-ui/core'
import * as React from 'react'
import { HeaderBar } from '../../../components'
import { commonPageStyle } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'antd'
import { getUserInfo, getUserList } from '../../../store/modules'
import { userInfoAction } from '../../../store/modules/auth'
import { IUserInfo } from '../../../store/modules/auth/types'
import { friendAddAction, userListAction } from '../../../store/modules/friend'
import getText from '../../../i18n'
import { pxToVw } from '../../../utils'

const useStyles = makeStyles({
  root: {
    padding: pxToVw(10),
  },
  avatar: {
    marginRight: '3vw',
    width: '10vw',
    height: '10vw',
  },
})

interface FriendItemProps {
  friend: IUserInfo
  friendAdd(): void
}

const FriendItem: React.SFC<FriendItemProps> = ({ friend, friendAdd }) => {
  const classes = useStyles()
  const { avatar, username, nickname } = friend
  return (
    <ListItem button onClick={() => friendAdd()}>
      <ListItemIcon>
        <Avatar src={avatar} className={classes.avatar} />
      </ListItemIcon>
      <ListItemText primary={nickname || username} />
    </ListItem>
  )
}

const AddFriend: React.SFC = () => {
  const userInfo = useSelector(getUserInfo)
  const dispatch = useDispatch()
  const users = useSelector(getUserList)
  React.useEffect(() => {
    if (!userInfo) dispatch(userInfoAction())
  }, [userInfo, dispatch])
  const [text, setText] = React.useState(
    userInfo ? userInfo.nickname || '' : ''
  )
  const classes = commonPageStyle()
  const onAdd = (data: IUserInfo) => {
    Modal.confirm({
      title: `确定添加${data.nickname || data.username}为好友吗`,
      onOk: () => {
        dispatch(friendAddAction(data._id))
      },
    })
  }
  return (
    <Slide direction='left' in={true} mountOnEnter unmountOnExit>
      <div>
        {userInfo && (
          <Container disableGutters className={classes.root}>
            <HeaderBar
              title={'添加好友'}
              showBack={true}
              backTo='/NewIM/friends'
            />
            {/* {loading && <CircularProgress />} */}
            <List className={classes.content}>
              <ListItem>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  fullWidth
                  placeholder='根据昵称搜索'
                />
                <Button
                  style={{ marginLeft: 10 }}
                  variant='contained'
                  color='primary'
                  onClick={() => dispatch(userListAction(text))}
                >
                  {getText('Search')}
                </Button>
              </ListItem>
              {users.map((item) => (
                <FriendItem
                  friendAdd={() => onAdd(item)}
                  key={item._id}
                  friend={item}
                />
              ))}
            </List>
          </Container>
        )}
      </div>
    </Slide>
  )
}

export default {
  view: AddFriend,
}
