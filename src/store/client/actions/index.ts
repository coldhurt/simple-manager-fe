// action types
import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  CLIENTS_FAILURE,
  TOGGLE_CLIENT,
  DELETE_CLIENT,
  LOADED_CLIENTS,
  FETCH_CLIENTS,
  IClient
} from '../types'

// action creators
export function addClient(client: IClient) {
  return { type: ADD_CLIENT, client }
}

export function addClientSuccess(client: IClient) {
  return { type: ADD_CLIENT_SUCCESS, client }
}

export function clientsFailure(error: string) {
  return { type: CLIENTS_FAILURE, error }
}

export function toggleClient(id: string) {
  return { type: TOGGLE_CLIENT, id }
}

export function deleteClient(id: string) {
  return { type: DELETE_CLIENT, id }
}

export function loadedClients(clients: IClient[]) {
  return { type: LOADED_CLIENTS, clients }
}

export function fetchClients() {
  return { type: FETCH_CLIENTS }
}
