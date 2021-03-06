import * as React from 'react'
import { useSelector } from 'react-redux'
import { getFriend, getSession } from '../../../store/modules'
import {
  Avatar,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Fab,
  CircularProgress,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { IUserInfo } from '../../../store/modules/auth/types'
import getSocket from '../socket'
import AddModal from './AddModal'
import { pxToVw, pxToVh } from '../../../utils'

const useStyles = makeStyles({
  root: {
    padding: pxToVw(10),
  },
  avatar: {
    marginRight: '3vw',
    width: '10vw',
    height: '10vw',
  },
  add: {
    position: 'fixed',
    right: pxToVw(10),
    bottom: pxToVh(70),
  },
})

interface FriendItemProps {
  friend: IUserInfo
  sessionAdd(friend_id: string): void
}

const FriendItem: React.SFC<FriendItemProps> = ({ friend, sessionAdd }) => {
  const classes = useStyles()
  const { _id, avatar, username, nickname } = friend
  return (
    <li>
      <ListItem button onClick={() => sessionAdd(_id || '')}>
        <ListItemIcon>
          <Avatar src={avatar} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText primary={nickname || username} />
      </ListItem>
    </li>
  )
}

const Friends: React.SFC = () => {
  const chat = getSocket()
  const [showModal, setShowModal] = React.useState(false)
  const { friends, friend_ids, listLoading } = useSelector(getFriend)
  const { sessions, session_ids } = useSelector(getSession)
  const history = useHistory()
  React.useEffect(() => {
    if (friend_ids.length === 0) chat.getFriends()
  }, [chat, friend_ids])
  React.useEffect(() => {
    if (session_ids.length === 0) chat.getSessions()
  }, [chat, session_ids])
  const onAddSession = (friend_id: string) => {
    if (friend_id) {
      for (const session_id of session_ids) {
        const session = sessions[session_id]
        if (session && session.friend_id === friend_id) {
          // return
          history.push('/NewIM/chat/' + session_id)
          return
        }
      }
      chat.addSession(friend_id)
    }
  }
  const classes = useStyles()
  return (
    <>
      {listLoading ? (
        <CircularProgress />
      ) : (
        <List className={classes.root}>
          {friend_ids.map((item) => {
            const friend = friends[item]
            return friend ? (
              <FriendItem
                key={item}
                friend={friend}
                sessionAdd={onAddSession}
              />
            ) : null
          })}
        </List>
      )}
      <Fab
        color='primary'
        aria-label='add'
        className={classes.add}
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Fab>
      <AddModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
export default Friends
