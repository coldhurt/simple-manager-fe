import { MessageProps } from '../../components/Message'

export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'

export interface IUtilState {
  message: MessageProps
}

export interface IShowMessageAction {
  type: typeof SHOW_MESSAGE
  message: MessageProps
}

export interface IHideMessageAction {
  type: typeof HIDE_MESSAGE
}

export type IUtilAction = IShowMessageAction | IHideMessageAction
