import { Store } from 'redux'
import { IUserState } from './user/types'

export interface IState extends Store {
  user: IUserState
}
