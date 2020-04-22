import { ISettingAction, THEME_CHANGE, ThemeType, ISettingState } from './types'

const DEFAULT_SETTING_STATE: ISettingState = {
  theme: 'light',
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
      return {
        ...state,
        theme: action.data,
      }
    default:
      return state
  }
}
