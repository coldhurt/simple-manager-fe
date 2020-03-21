import {
  IAdmin,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST,
  FRIEND_LIST,
  FRIEND_LIST_FAILED,
  FRIEND_LIST_SUCCESS,
  FRIEND_ADD,
  FRIEND_ADD_FAILED,
  FRIEND_ADD_SUCCESS,
  USER_INFO,
  USER_INFO_FAILED,
  USER_INFO_SUCCESS,
  CHAT_BOX_LIST_FAILED,
  CHAT_BOX_LIST,
  CHAT_BOX_LIST_SUCCESS,
  IMessage,
  CHAT_BOX_ADD_MESSAGE,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_SUCCESS
} from '../types'

// login action creators
export const loginAction = (admin: IAdmin) => {
  return {
    type: USER_LOGIN,
    admin
  }
}

export const loginFailedAction = (error: string) => {
  return {
    type: USER_LOGIN_FAILED,
    error
  }
}

export const loginSuccessAction = (data: IAdmin) => {
  return {
    type: USER_LOGIN_SUCCESS,
    data
  }
}

export const userInfoAction = () => {
  return {
    type: USER_INFO
  }
}

export const userInfoFailedAction = (error: string) => {
  return {
    type: USER_INFO_FAILED,
    error
  }
}

export const userInfoSuccessAction = (data: IAdmin) => {
  return {
    type: USER_INFO_SUCCESS,
    data
  }
}
// user list creators
export const userListAction = () => {
  return {
    type: USER_LIST
  }
}

export const userListFailedAction = (error: string) => {
  return {
    type: USER_LIST_FAILED,
    error
  }
}

export const userListSuccessAction = (users: IAdmin[]) => {
  return {
    type: USER_LIST_SUCCESS,
    users
  }
}

// friend list creators
export const friendListAction = () => {
  return {
    type: FRIEND_LIST
  }
}

export const friendListFailedAction = (error: string) => {
  return {
    type: FRIEND_LIST_FAILED,
    error
  }
}

export const friendListSuccessAction = (friends: IAdmin[]) => {
  return {
    type: FRIEND_LIST_SUCCESS,
    friends
  }
}

export const friendAddAction = (friend_id: string) => {
  return {
    type: FRIEND_ADD,
    friend_id
  }
}

export const friendAddFailedAction = (error: string) => {
  return {
    type: FRIEND_ADD_FAILED,
    error
  }
}

export const friendAddSuccessAction = (friends: IAdmin[]) => {
  return {
    type: FRIEND_ADD_SUCCESS,
    friends
  }
}

export const chatBoxListAction = (friend_id: string) => {
  return {
    type: CHAT_BOX_LIST,
    friend_id
  }
}

export const chatBoxListFailedAction = (error: string) => {
  return {
    type: CHAT_BOX_LIST_FAILED,
    error
  }
}

export const chatBoxListSuccessAction = (data: IMessage[]) => {
  return {
    type: CHAT_BOX_LIST_SUCCESS,
    data
  }
}

export const chatBoxAddMessageAction = (data: IMessage) => {
  return {
    type: CHAT_BOX_ADD_MESSAGE,
    data
  }
}

export const updateUserInfoAction = (data: IAdmin, callback: Function) => {
  return {
    type: UPDATE_USER_INFO,
    data,
    callback
  }
}

export const updateUserInfoFailedAction = (error: string) => {
  return {
    type: UPDATE_USER_INFO_FAILED,
    error
  }
}

export const updateUserInfoSuccessAction = (data: IAdmin) => {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    data
  }
}
