import React, { useState } from 'react'
import { Grid, TextField, Button, makeStyles } from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, EmojiData } from 'emoji-mart'
import { Link } from 'react-router-dom'
import { pxToVh } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    // background: '#fff',
    background: theme.palette.background.default,
    alignItems: 'center',
  },
  inputWrap: {
    height: pxToVh(50),
  },
  input: {
    height: pxToVh(48),
    padding: 0,
  },
}))

interface InputBarProps {
  onSend(msg: string): void
  showEmoji: boolean
  toggleEmoji(): void
  showPane: boolean
  togglePane(): void
  session_id: string
}

const InputBar: React.SFC<InputBarProps> = ({
  onSend,
  showEmoji,
  toggleEmoji,
  showPane,
  togglePane,
  session_id,
}) => {
  const [message, setMessage] = useState('')
  const classes = useStyles()
  const onSubmit = () => {
    setMessage('')
    onSend(message)
  }
  const addEmoji = (emoji: EmojiData & { native: string }) => {
    console.log(emoji)
    setMessage(message + emoji.native)
  }
  return (
    <Grid container className={classes.root} direction='column'>
      <Grid
        container
        className={classes.inputWrap}
        justify='space-around'
        alignItems='center'
      >
        <Grid item style={{ flex: 1 }}>
          <TextField
            fullWidth
            value={message}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`)
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault()
                onSubmit()
              }
            }}
            onFocus={() => {
              if (showPane) togglePane()
              if (showEmoji) togglePane()
            }}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
        </Grid>
        {/* {message && (
          <Grid item>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              {getText('Send')}
            </Button>
          </Grid>
        )} */}
        <Grid item>
          <Button
            style={{
              fontSize: 30,
              height: 40,
              lineHeight: 1,
            }}
            variant='text'
            color='primary'
            onClick={toggleEmoji}
          >
            {'😀'}
          </Button>
          <Button
            style={{
              fontSize: 30,
              height: 40,
              lineHeight: 1,
            }}
            variant='text'
            color='primary'
            onClick={togglePane}
          >
            +
          </Button>
        </Grid>
      </Grid>
      {showEmoji && <Picker darkMode onSelect={addEmoji} />}
      {showPane && (
        <div>
          <Link to={`/NewIM/chat/video/${session_id}`}>
            <Button>视频</Button>
          </Link>
        </div>
      )}
    </Grid>
  )
}

export default React.memo(InputBar)
