import React from 'react'
import Router from './route'
import './App.css'
import Message, { MessageProps } from './components/Message'
import { connect, useSelector } from 'react-redux'
import { IUtilState } from './store/modules/util/types'
import {
  showMessageAction,
  hideMessageAction,
} from './store/modules/util/actions'
import { AppState, getTheme } from './store/modules'
import {
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core'
import { darkTheme, theme } from './theme'

export type MessageActionProps = {
  util: IUtilState
  showMessageAction(message: MessageProps): void
  hideMessageAction(): void
}

export interface MyTheme {
  color: string
  backgroundColor: string
}

const useStyles = makeStyles((theme: MyTheme) => ({
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
  },
}))

const AppComponent = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} disableGutters>
      <CssBaseline>
        <Router />
      </CssBaseline>
    </Container>
  )
}

const App: React.SFC<MessageActionProps> = ({ util, hideMessageAction }) => {
  console.log(darkTheme)
  const themeState = useSelector(getTheme)
  return (
    <div className='app-container'>
      <ThemeProvider theme={themeState === 'night' ? darkTheme : theme}>
        <Message {...util.message} handleClose={hideMessageAction} />
        <AppComponent />
      </ThemeProvider>
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
