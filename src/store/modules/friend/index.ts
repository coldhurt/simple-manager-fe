import {
  IFriendState,
  IFriendAction,
  IFriendListAction,
  FRIEND_LIST,
  FRIEND_LIST_FAILED,
  FRIEND_LIST_SUCCESS,
  FRIEND_ADD,
  FRIEND_ADD_FAILED,
  FRIEND_ADD_SUCCESS,
  FRIEND_DELETE,
  FRIEND_DELETE_FAILED,
  FRIEND_DELETE_SUCCESS,
  IFriendListFailedAction,
  IFriendListSuccessAction,
  IFriendAddAction,
  IFriendAddFailedAction,
  IFriendAddSuccessAction,
  IFriendDeleteAction,
  IFriendDeleteFailedAction,
  IFriendDeleteSuccessAction,
  IUserListAction,
  IUserListSuccessAction,
  IUserListFailedAction,
  USER_LIST,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
} from './types'
import { IUserInfo } from '../auth/types'
import { getIdsAndMapData } from '../../../utils'

const DEFAULT_FRIEND_STATE: IFriendState = {
  listLoading: false,
  listError: '',
  addLoading: false,
  addError: '',
  deleteLoading: false,
  deleteError: '',
  friends: {},
  friend_ids: [],
  users: [],
}

// friend action creators
export const userListAction = (nickname: string): IUserListAction => ({
  type: USER_LIST,
  nickname,
})
export const userListSuccessAction = (
  data: IUserInfo[]
): IUserListSuccessAction => ({
  type: USER_LIST_SUCCESS,
  data,
})
export const userListFailedAction = (error: string): IUserListFailedAction => ({
  type: USER_LIST_FAILED,
  error,
})
export const friendListAction = (): IFriendListAction => ({
  type: FRIEND_LIST,
})

export const friendListFailedAction = (
  error: string
): IFriendListFailedAction => ({
  type: FRIEND_LIST_FAILED,
  error,
})

export const friendListSuccessAction = (
  data: IUserInfo[]
): IFriendListSuccessAction => ({
  type: FRIEND_LIST_SUCCESS,
  data,
})

export const friendAddAction = (friend_id: string): IFriendAddAction => ({
  type: FRIEND_ADD,
  friend_id,
})

export const friendAddFailedAction = (
  error: string
): IFriendAddFailedAction => ({
  type: FRIEND_ADD_FAILED,
  error,
})

export const friendAddSuccessAction = (
  data: IUserInfo
): IFriendAddSuccessAction => ({
  type: FRIEND_ADD_SUCCESS,
  data,
})
export const friendDeleteAction = (friend_id: string): IFriendDeleteAction => ({
  type: FRIEND_DELETE,
  friend_id,
})

export const friendDeleteFailedAction = (
  error: string
): IFriendDeleteFailedAction => ({
  type: FRIEND_DELETE_FAILED,
  error,
})

export const friendDeleteSuccessAction = (
  friend_id: string
): IFriendDeleteSuccessAction => ({
  type: FRIEND_DELETE_SUCCESS,
  friend_id,
})

export default function friendReducer(
  state: IFriendState = DEFAULT_FRIEND_STATE,
  action: IFriendAction
): IFriendState {
  switch (action.type) {
    case FRIEND_LIST:
      return {
        ...state,
        listLoading: true,
      }
    case FRIEND_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listError: action.error,
      }
    case FRIEND_LIST_SUCCESS:
      const [friend_ids, friends] = getIdsAndMapData(action.data)
      return {
        ...state,
        listLoading: false,
        friend_ids,
        friends,
      }
    case FRIEND_ADD:
      return {
        ...state,
        addLoading: true,
      }
    case FRIEND_ADD_FAILED:
      return {
        ...state,
        addLoading: false,
        addError: action.error,
      }
    case FRIEND_ADD_SUCCESS: {
      const friend_id = action.data._id
      return {
        ...state,
        addLoading: false,
        friends: {
          ...state.friends,
          [friend_id]: action.data,
        },
        friend_ids: [friend_id, ...state.friend_ids],
      }
    }
    case FRIEND_DELETE:
      return {
        ...state,
        deleteLoading: true,
      }
    case FRIEND_DELETE_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.error,
      }
    case FRIEND_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        friends: {
          ...state.friends,
          [action.friend_id]: null,
        },
        friend_ids: state.friend_ids.filter(
          (item) => item !== action.friend_id
        ),
      }
    case USER_LIST:
      return {
        ...state,
        users: [],
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.data,
      }
    case USER_LIST_FAILED:
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}
