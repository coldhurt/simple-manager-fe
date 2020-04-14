import friendReducer from './friend'
import sessionReducer from './session'
import authReducer from './auth'
import utilReducer from './util/reducers'
import { combineReducers } from 'redux'

export const reducerMaps = {
  friend: friendReducer,
  session: sessionReducer,
  auth: authReducer,
  util: utilReducer,
}

const rootReducer = combineReducers(reducerMaps)

export type AppState = ReturnType<typeof rootReducer>

// selectors
export const getSession = (state: AppState) => state.session
export const getAuth = (state: AppState) => state.auth
export const getUserInfo = (state: AppState) => state.auth.userInfo
export const getChatBoxMessages = (state: AppState) =>
  state.session.chatboxMessage
export const getFriend = (state: AppState) => state.friend
export const getUserList = (state: AppState) => state.friend.users

export default rootReducer
