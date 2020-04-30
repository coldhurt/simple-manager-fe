import { makeStyles, Container, Slide } from '@material-ui/core'
import React, { useState, useCallback } from 'react'
import { getSession, getFriend } from '../../../store/modules'
import { useSelector } from 'react-redux'
import { HeaderBar } from '../../../components'
import { useParams, useHistory } from 'react-router-dom'
import InputBar from './InputBar'
import getSocket from '../socket/index'
import ChatMessageList from './ChatMessageList'
import { toast } from '../../../utils'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const Chat: React.SFC = () => {
  const chat = getSocket()
  const history = useHistory()
  const classes = useStyles()
  const params = useParams<{ id: string }>()
  const [showEmoji, setShowEmoji] = useState(false)
  const [showPane, setShowPane] = useState(false)
  const session_id = params.id
  const { friends, friend_ids } = useSelector(getFriend)
  const { sessions, session_ids } = useSelector(getSession)
  React.useEffect(() => {
    if (friend_ids.length === 0) {
      chat.getFriends()
    }
  }, [friend_ids.length, chat])
  React.useEffect(() => {
    if (session_ids.length === 0) {
      chat.getSessions()
    }
  }, [chat, session_ids.length])

  const targetSession = sessions[session_id]
  if (
    Array.isArray(session_ids) &&
    session_ids.includes(session_id) &&
    !targetSession
  ) {
    toast.error('目标会话不存在')
    history.goBack()
  }
  let friend_id = targetSession ? targetSession.friend_id : null
  let target = null
  if (friend_id) target = friends[friend_id]

  const onSend = useCallback(
    (msg: string) => {
      if (msg && chat) {
        chat.sendMessage({
          session_id,
          message: msg,
        })
      }
    },
    [chat, session_id]
  )

  const toggleEmoji = useCallback(() => setShowEmoji(!showEmoji), [showEmoji])
  const togglePane = useCallback(() => setShowPane(!showPane), [showPane])

  const closePane = useCallback(() => {
    setShowEmoji(false)
    setShowPane(false)
  }, [])
  return (
    target && (
      <Slide
        direction='left'
        in={target ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <Container className={classes.root} disableGutters>
          <HeaderBar
            title={target.nickname || target.username || ''}
            showBack={true}
          />
          <ChatMessageList
            session_id={session_id}
            target={target}
            onClickList={closePane}
          />
          <InputBar
            onSend={onSend}
            showEmoji={showEmoji}
            showPane={showPane}
            togglePane={togglePane}
            toggleEmoji={toggleEmoji}
            session_id={session_id}
          />
        </Container>
      </Slide>
    )
  )
}

export default {
  view: Chat,
}
