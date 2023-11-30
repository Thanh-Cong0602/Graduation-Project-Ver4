import { userConstants } from '../_constants'

interface UserState {
  userId: string | null
  userName: string | null
  role: string | null
  loggedIn: boolean | null
  token: string | null
}

interface UserAction {
  type: string
  payload: never
}

const initialState: UserState = {
  userId: null,
  userName: null,
  role: null,
  loggedIn: false,
  token: null
}

export function userReducer(state: UserState = initialState, action: UserAction): UserState {
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
    case userConstants.SET_TOKEN_LOGGED_IN:
      return {
        ...state,
        token: action.payload
      }
    case userConstants.SET_USER_ID:
      return {
        ...state,
        userId: action.payload
      }
    default:
      return state
  }
}
