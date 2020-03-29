import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Container,
  Slide,
  Badge
} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import GroupIcon from '@material-ui/icons/Group'
import PersonIcon from '@material-ui/icons/Person'
import Friends from './Friends'
import Message from './Message'
import User from './User'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import getSocket from './socket'

const useStyles = makeStyles({
  content: {
    position: 'fixed',
    bottom: 56,
    width: '100vw',
    top: 0,
    background: '#fff'
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    width: '100vw'
  }
})

const Main: React.SFC<{ tab: string }> = ({ tab }) => {
  const classes = useStyles()
  return (
    <div>
      <Slide
        direction={tab === 'message' ? 'left' : 'right'}
        in={tab === 'message'}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.content} disableGutters>
          <Message />
        </Container>
      </Slide>
      <Slide
        direction={tab === 'friends' ? 'left' : 'right'}
        in={tab === 'friends'}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.content} disableGutters>
          <Friends />
        </Container>
      </Slide>
      <Slide
        direction={tab === 'user' ? 'left' : 'right'}
        in={tab === 'user'}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.content} disableGutters>
          <User />
        </Container>
      </Slide>
    </div>
  )
}

const NewIM: React.SFC<RouteComponentProps<{ tab: string }>> = ({
  match,
  location,
  history
}) => {
  const chat = getSocket()
  console.log(match.params, location, history)
  const { tab } = match.params
  const route = ['message', 'friends', 'user', 'chat']
  if (!route.includes(tab)) {
    history.push('/NewIM/message')
  }

  const sessions = useSelector((state: AppState) => state.users.imSessions)
  let unread = 0
  for (const sess of sessions) {
    unread += sess.unread
  }

  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push('/NewIM/' + newValue)
  }
  return (
    <div>
      <Main tab={tab} />
      <BottomNavigation
        onChange={handleChange}
        value={tab}
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction
          value='message'
          label='Message'
          icon={
            <Badge badgeContent={unread} color='secondary'>
              <MessageIcon />
            </Badge>
          }
        />
        <BottomNavigationAction
          value='friends'
          label='Friends'
          icon={<GroupIcon />}
        />
        <BottomNavigationAction
          value='user'
          label='User'
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </div>
  )
}

export default {
  view: NewIM
}
