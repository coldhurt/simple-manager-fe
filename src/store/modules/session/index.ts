import {
  ISessionState,
  ISessionAction,
  SESSION_LIST,
  SESSION_LIST_FAILED,
  SESSION_LIST_SUCCESS,
  SESSION_ADD,
  SESSION_ADD_FAILED,
  SESSION_ADD_SUCCESS,
  SESSION_DELETE,
  SESSION_DELETE_FAILED,
  SESSION_DELETE_SUCCESS,
  CHAT_BOX_LIST,
  CHAT_BOX_LIST_FAILED,
  CHAT_BOX_LIST_SUCCESS,
  IMessage,
  ISession,
} from './types'

const DEFAULT_SESSION_STATE: ISessionState = {
  listLoading: false,
  listError: '',
  addLoading: false,
  addError: '',
  deleteLoading: false,
  deleteError: '',
  sessions: {},
  session_ids: [],
}

export const actions = {
  sessionListAction: () => {
    return {
      type: SESSION_LIST,
    }
  },

  sessionListFailedAction: (error: string) => {
    return {
      type: SESSION_LIST_FAILED,
      error,
    }
  },
  sessionListSuccessAction: (data: ISession[]) => {
    return {
      type: SESSION_LIST_SUCCESS,
      data,
    }
  },
  sessionAddAction: (data: ISession) => {
    return {
      type: SESSION_ADD,
      data,
    }
  },

  sessionAddFailedAction: (error: string) => {
    return {
      type: SESSION_ADD_FAILED,
      error,
    }
  },

  sessionAddSuccessAction: (data: ISession[]) => {
    return {
      type: SESSION_ADD_SUCCESS,
      data,
    }
  },
  sessionDeleteAction: (session_id: string) => {
    return {
      type: SESSION_DELETE,
      session_id,
    }
  },

  sessionDeleteFailedAction: (error: string) => {
    return {
      type: SESSION_DELETE_FAILED,
      error,
    }
  },

  sessionDeleteSuccessAction: (session_id: string) => {
    return {
      type: SESSION_DELETE_SUCCESS,
      session_id,
    }
  },
  chatBoxListAction: (session_id: string) => {
    return {
      type: CHAT_BOX_LIST,
      session_id,
    }
  },
  chatBoxListFailedAction: (error: string) => {
    return {
      type: CHAT_BOX_LIST_FAILED,
      error,
    }
  },

  chatBoxListSuccessAction: (session_id: string, data: IMessage[]) => {
    return {
      type: CHAT_BOX_LIST_SUCCESS,
      session_id,
      data,
    }
  },
}

export default function sessionReducer(
  state: ISessionState = DEFAULT_SESSION_STATE,
  action: ISessionAction
): ISessionState {
  switch (action.type) {
    case SESSION_LIST:
      return {
        ...state,
        listLoading: true,
      }
    case SESSION_LIST_SUCCESS: {
      const session_ids = []
      const sessions: Record<string, ISession> = {}
      for (const session of action.data) {
        session_ids.push(session._id)
        sessions[session._id] = session
      }
      return {
        ...state,
        listLoading: false,
        session_ids,
        sessions,
      }
    }
    case SESSION_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listError: action.error,
      }
    case SESSION_ADD:
      return {
        ...state,
        addLoading: true,
      }
    case SESSION_ADD_SUCCESS: {
      const session_id = action.data._id
      return {
        ...state,
        addLoading: false,
        sessions: {
          ...state.sessions,
          [session_id]: action.data,
        },
        session_ids: [session_id, ...state.session_ids],
      }
    }
    case SESSION_ADD_FAILED:
      return {
        ...state,
        addLoading: false,
        addError: action.error,
      }
    case SESSION_DELETE:
      return {
        ...state,
        deleteLoading: true,
      }
    case SESSION_DELETE_SUCCESS: {
      const session_id = action.session_id
      return {
        ...state,
        deleteLoading: false,
        sessions: {
          ...state.sessions,
          [session_id]: null,
        },
        session_ids: state.session_ids.filter((item) => item !== session_id),
      }
    }
    case SESSION_DELETE_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.error,
      }
    default:
      return state
  }
}
