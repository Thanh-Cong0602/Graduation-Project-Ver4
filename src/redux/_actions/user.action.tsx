import { userConstants } from '../_constants/user.constant'

export const setUserId = (userId: string) => {
  return {
    type: userConstants.SET_USER_ID,
    payload: userId
  }
}

export const setRoleUser = (role: string) => {
  return {
    type: userConstants.SET_ROLE_USER,
    payload: role
  }
}

export const setLoggedIn = (LoggedIn: boolean) => {
  return {
    type: userConstants.SET_LOGGED_IN,
    payload: LoggedIn
  }
}

export const setTokenLoggedIn = (token: string) => {
  return {
    type: userConstants.SET_TOKEN_LOGGED_IN,
    payload: token
  }
}
