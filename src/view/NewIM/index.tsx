import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Container,
  Slide,
  Badge,
} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import GroupIcon from '@material-ui/icons/Group'
import PersonIcon from '@material-ui/icons/Person'
import Friends from './Friends'
import Message from './Message'
import User from './User'
import { useSelector } from 'react-redux'
import { getSession } from '../../store/modules'
import getSocket from './socket'
import getText from '../../i18n'
import { pxToVh } from '../../utils'

const useStyles = makeStyles({
  content: {
    position: 'fixed',
    bottom: pxToVh(56),
    width: '100vw',
    top: 0,
    overflowY: 'scroll',
    maxWidth: 800,
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    height: pxToVh(56),
    width: '100vw',
    maxWidth: 800,
  },
})

const Main: React.SFC<{ tab: string; prevTab: string }> = ({
  tab,
  prevTab,
}) => {
  const classes = useStyles()
  return (
    <div>
      <Slide
        direction={tab === 'message' || tab === 'friends' ? 'right' : 'left'}
        in={tab === 'message'}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.content} disableGutters>
          <Message />
        </Container>
      </Slide>
      <Slide
        direction={
          (tab === 'friends' && prevTab === 'message') || tab === 'message'
            ? 'left'
            : 'right'
        }
        in={tab === 'friends'}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.content} disableGutters>
          <Friends />
        </Container>
      </Slide>
      <Slide
        direction={tab === 'user' || tab === 'friends' ? 'left' : 'right'}
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
  history,
}) => {
  getSocket()
  const { tab } = match.params
  const [prevTab, setPrevTab] = React.useState(tab)
  const [currentTab, setCurrentTab] = React.useState(tab)
  const route = ['message', 'friends', 'user', 'chat']
  if (!route.includes(tab)) {
    history.push('/NewIM/message')
  }

  const { sessions } = useSelector(getSession)
  const unread = React.useMemo(() => {
    const values = Object.values(sessions)
    let unread = 0
    for (const item of values) {
      if (item) unread += item.unread
    }
    return unread
  }, [sessions])

  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setPrevTab(tab)
    setCurrentTab(newValue)
    history.push('/NewIM/' + newValue)
  }
  return (
    <div>
      <Main tab={currentTab} prevTab={prevTab} />
      <BottomNavigation
        onChange={handleChange}
        value={tab}
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction
          value='message'
          label={getText('Message')}
          icon={
            <Badge badgeContent={unread} color='secondary'>
              <MessageIcon />
            </Badge>
          }
        />
        <BottomNavigationAction
          value='friends'
          label={getText('Friends')}
          icon={<GroupIcon />}
        />
        <BottomNavigationAction
          value='user'
          label={getText('MyInfo')}
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </div>
  )
}

export default {
  view: NewIM,
}
