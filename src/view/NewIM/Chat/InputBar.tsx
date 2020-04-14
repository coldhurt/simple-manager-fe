import React, { useState } from 'react'
import { Grid, TextField, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: 50,
  },
  input: {
    height: 48,
    padding: 0,
  },
})

interface InputBarProps {
  onSend(msg: string): void
}

const InputBar: React.SFC<InputBarProps> = ({ onSend }) => {
  const [message, setMessage] = useState('')
  const classes = useStyles()
  const onSubmit = () => {
    setMessage('')
    onSend(message)
  }
  return (
    <Grid
      container
      className={classes.root}
      justify='space-around'
      alignItems='center'
    >
      <Grid item xs={8}>
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
      <Grid item>
        <Button variant='contained' color='primary' onClick={onSubmit}>
          Send
        </Button>
      </Grid>
    </Grid>
  )
}

export default React.memo(InputBar)
