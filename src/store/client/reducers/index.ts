import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  CLIENTS_FAILURE,
  TOGGLE_CLIENT,
  DELETE_CLIENT,
  LOADED_CLIENTS,
  FETCH_CLIENTS,
  IClientAction,
  IClient,
  IClientState
} from '../types'
export const CLIENTS_DEFAULT_STATE: IClientState = {
  loading: false,
  saving: false,
  error: '',
  items: []
}

export default function clientsReducer(
  state: IClientState = CLIENTS_DEFAULT_STATE,
  action: IClientAction
): IClientState {
  switch (action.type) {
    case LOADED_CLIENTS:
      return {
        ...state,
        items: action.clients,
        loading: false
      }

    case FETCH_CLIENTS: {
      return { ...state, loading: true }
    }

    case ADD_CLIENT:
      return { ...state, saving: true }

    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.client],
        saving: false
      }

    case CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        saving: false,
        error: action.error
      }

    case TOGGLE_CLIENT:
      return {
        ...state,
        items: state.items.map((client: IClient) =>
          client._id === action.id
            ? {
                ...client,
                payStatus: !client.payStatus
              }
            : client
        )
      }

    case DELETE_CLIENT:
      return {
        ...state,
        items: state.items.filter((client: IClient) => client._id !== action.id)
      }

    default:
      return state
  }
}
