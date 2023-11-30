import { userConstants } from '../_constants/user.constant'

interface UserState {
  userId: string | null
  userName: string | null
  role: string | null
  loggedIn: boolean | null
}

interface UserAction {
  type: string
  payload: never
}

const initialState: UserState = {
  userId: null,
  userName: null,
  role: null,
  loggedIn: false
}

export function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
  case userConstants.SET_ROLE_USER:
    return {
      ...state,
      role: action.payload
    }
  case userConstants.SET_LOGGED_IN:
    return {
      ...state,
      loggedIn: action.payload
    }
  default:
    return state
  }
}
