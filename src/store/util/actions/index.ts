import { SHOW_MESSAGE, HIDE_MESSAGE } from '../types'
import { MessageProps } from '../../../components/Message'

// message action creators use for saga
export const showMessageAction = (message: MessageProps) => {
  return {
    type: SHOW_MESSAGE,
    message
  }
}

export const hideMessageAction = () => {
  return {
    type: HIDE_MESSAGE
  }
}
