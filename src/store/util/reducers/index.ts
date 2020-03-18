import { IUtilAction, IUtilState, SHOW_MESSAGE, HIDE_MESSAGE } from '../types'

const DEFAULT_UTIL_STATE: IUtilState = {
  message: {
    open: false,
    message: '',
    type: 'success'
  }
}

export default function utilReducer(
  state: IUtilState = DEFAULT_UTIL_STATE,
  action: IUtilAction
): IUtilState {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        message: { ...state.message, ...action.message, open: true }
      }
    case HIDE_MESSAGE:
      return {
        ...state,
        message: { ...state.message, open: false }
      }
    default:
      return state
  }
}
