import React from 'react'
import Router from './route'
import './App.css'
import Message, { MessageProps } from './components/Message'
import { connect } from 'react-redux'
import { IUtilState } from './store/util/types'
import { showMessageAction, hideMessageAction } from './store/util/actions'
import { AppState } from './store'

export type MessageActionProps = {
  util: IUtilState
  showMessageAction(message: MessageProps): void
  hideMessageAction(): void
}

const App: React.SFC<MessageActionProps> = ({ util, hideMessageAction }) => {
  return (
    <div className='app-container'>
      <Message {...util.message} handleClose={hideMessageAction} />
      <Router />
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  util: state.util
})

const mapDispatchToProps = {
  showMessageAction,
  hideMessageAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
