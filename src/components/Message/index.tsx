import { Snackbar } from '@material-ui/core'
import * as React from 'react'
import Alert from '@material-ui/lab/Alert'

export interface MessageProps {
  open?: boolean
  handleClose?(): void
  type?: 'success' | 'info' | 'warning' | 'error' | undefined
  message: string
  duration?: number
}

const Message: React.SFC<MessageProps> = ({
  open = false,
  handleClose,
  type = 'success',
  message,
  duration = 6000
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Message
