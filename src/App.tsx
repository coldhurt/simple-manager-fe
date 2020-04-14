import React from 'react'
import Router from './route'
import './App.css'
import Message, { MessageProps } from './components/Message'
import { connect } from 'react-redux'
import { IUtilState } from './store/modules/util/types'
import {
  showMessageAction,
  hideMessageAction,
} from './store/modules/util/actions'
import { AppState } from './store/modules'
import { Container, CssBaseline, makeStyles } from '@material-ui/core'

export type MessageActionProps = {
  util: IUtilState
  showMessageAction(message: MessageProps): void
  hideMessageAction(): void
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    height: '100vh',
    display: 'flex',
    // alignContent: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
  },
})

const App: React.SFC<MessageActionProps> = ({ util, hideMessageAction }) => {
  const classes = useStyles()
  return (
    <div className='app-container'>
      <Message {...util.message} handleClose={hideMessageAction} />
      <Container className={classes.root} disableGutters>
        <CssBaseline>
          <Router />
        </CssBaseline>
      </Container>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  util: state.util,
})

const mapDispatchToProps = {
  showMessageAction,
  hideMessageAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
