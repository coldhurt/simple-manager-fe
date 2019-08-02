export const ADD_CLIENT = 'ADD_CLIENT'
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS'
export const CLIENTS_FAILURE = 'CLIENTS_FAILURE'
export const TOGGLE_CLIENT = 'TOGGLE_CLIENT'
export const DELETE_CLIENT = 'DELETE_CLIENT'
export const LOADED_CLIENTS = 'LOADED_CLIENTS'
export const FETCH_CLIENTS = 'FETCH_CLIENTS'

export interface IClientState {
  loading: boolean
  saving: boolean
  error: string
  items: IClient[]
}

export interface IProduct {
  productName: string
  type: string
  count: number
  storageFee: number
  processingFee: number
}

export interface IClient {
  _id: string
  clientName: string
  tel: string
  payStatus: boolean
  products: Array<IProduct>
}

export interface IAddClientAction {
  type: typeof ADD_CLIENT
  client: IClient
}
export interface IAddClientSuccessAction {
  type: typeof ADD_CLIENT_SUCCESS
  client: IClient
}
export interface IClientsFailedAction {
  type: typeof CLIENTS_FAILURE
  error: string
}
export interface IToggleClientAction {
  type: typeof TOGGLE_CLIENT
  id: string
}
export interface IDeleteClientAction {
  type: typeof DELETE_CLIENT
  id: string
}
export interface ILoadedClientsAction {
  type: typeof LOADED_CLIENTS
  clients: IClient[]
}
export interface IFetchClients {
  type: typeof FETCH_CLIENTS
}

export type IClientAction =
  | IAddClientAction
  | IAddClientSuccessAction
  | IClientsFailedAction
  | IToggleClientAction
  | IDeleteClientAction
  | ILoadedClientsAction
  | IFetchClients
