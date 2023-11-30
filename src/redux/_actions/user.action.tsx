import { userConstants } from '../_constants/user.constant'
interface UserType {
  id: number
  uername: string
}
export const setUser = (user: UserType) => {
  return {
    type: userConstants.SET_USER,
    payload: user
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
