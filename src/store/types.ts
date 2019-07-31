import { IClientState } from './client/types'
import { Store } from 'redux'
import { IUserState } from './user/types'

export interface IState extends Store {
  clients: IClientState
  user: IUserState
}
