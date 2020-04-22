import { ISettingAction, THEME_CHANGE, ThemeType, ISettingState } from './types'
import { getLocalStorage, setLocalStorage } from '../../../utils'

const theme = (() => {
  const v = getLocalStorage('theme') as ThemeType
  if (typeof v === 'string' && ['light', 'night'].includes(v)) {
    return v
  }
  setLocalStorage('theme', ThemeType.LIGHT)
  return ThemeType.LIGHT
})()

const DEFAULT_SETTING_STATE: ISettingState = {
  theme,
}

export const changeThemeAction = (data: ThemeType) => ({
  type: THEME_CHANGE,
  data,
})

export default function settingReducer(
  state: ISettingState = DEFAULT_SETTING_STATE,
  action: ISettingAction
): ISettingState {
  switch (action.type) {
    case THEME_CHANGE:
      setLocalStorage('theme', action.data)
      return {
        ...state,
        theme: action.data,
      }
    default:
      return state
  }
}
