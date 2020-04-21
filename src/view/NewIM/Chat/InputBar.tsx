import React, { useState, useCallback } from 'react'
import { Grid, TextField, Button, makeStyles } from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, EmojiData } from 'emoji-mart'
import getText from '../../../i18n'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    background: '#fff',
    alignItems: 'center',
  },
  inputWrap: {
    height: 50,
  },
  input: {
    height: 48,
    padding: 0,
  },
})

interface InputBarProps {
  onSend(msg: string): void
  showEmoji: boolean
  toggleEmoji(): void
  showPane: boolean
  togglePane(): void
}

const InputBar: React.SFC<InputBarProps> = ({
  onSend,
  showEmoji,
  toggleEmoji,
  showPane,
  togglePane,
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
        <Grid item xs={6}>
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
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
        </Grid>
        {message && (
          <Grid item>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              {getText('Send')}
            </Button>
          </Grid>
        )}
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
        </Grid>
      </Grid>
      {showEmoji && <Picker onSelect={addEmoji} />}
    </Grid>
  )
}

export default React.memo(InputBar)
