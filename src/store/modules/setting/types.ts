// action types
export const THEME_CHANGE = 'THEME_CHANGE'
export const LOGOUT = 'LOGOUT'

export const actionTypes = {
  THEME_CHANGE,
}

export enum ThemeType {
  LIGHT = 'light',
  NIGHT = 'night',
}

export interface ISettingState {
  theme: ThemeType
}

export interface IChangeThemeAction {
  type: typeof THEME_CHANGE
  data: ThemeType
}

export interface ILogoutAction {
  type: typeof LOGOUT
}

export type ISettingAction = IChangeThemeAction | ILogoutAction
