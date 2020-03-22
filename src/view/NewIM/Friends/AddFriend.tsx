import {
  TextField,
  Slide,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  makeStyles,
  Button
} from '@material-ui/core'
import * as React from 'react'
import { IAdmin } from '../../../store/user/types'
import { HeaderBar } from '../../../components'
import { commonPageStyle } from '../styles'
import {
  friendAddAction,
  userListAction,
  userInfoAction
} from '../../../store/user/actions'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import { message, Modal } from 'antd'

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

interface AddFriendProps {
  userInfo: IAdmin | null
  users: IAdmin[]
  friendAdd(friend_id: string): void
  getUserInfo(): void
  userList(name?: string): void
}

interface FriendItemProps {
  friend: IAdmin
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

const AddFriend: React.SFC<AddFriendProps> = ({
  userInfo,
  users,
  userList,
  getUserInfo,
  friendAdd
}) => {
  React.useEffect(() => {
    if (!userInfo) getUserInfo()
  }, [userInfo, getUserInfo])
  const [text, setText] = React.useState(userInfo ? userInfo.nickname : '')
  React.useEffect(() => {
    if (!userInfo) getUserInfo()
  }, [userInfo, getUserInfo])
  const classes = commonPageStyle()
  const onAdd = (data: IAdmin) => {
    Modal.confirm({
      title: `确定添加${data.nickname || data.username}为好友吗`,
      onOk: () => {
        friendAdd(data._id || '')
      }
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
                  onChange={e => setText(e.target.value)}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  variant='contained'
                  color='primary'
                  onClick={() => userList(text)}
                >
                  搜索
                </Button>
              </ListItem>
              {users.map(item => (
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

const mapStateToProps = (state: AppState) => ({
  userInfo: state.users.userInfo,
  users: state.users.users
})

const mapDispatchToProps = {
  getUserInfo: userInfoAction,
  friendAdd: friendAddAction,
  userList: userListAction
}

export default {
  view: connect(mapStateToProps, mapDispatchToProps)(AddFriend)
}
