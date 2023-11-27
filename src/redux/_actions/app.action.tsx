import { appConstants } from '../_constants'

export const setTitlePage = (title: string) => {
  return {
    type: appConstants.SET_TITLE_PAGE,
    payload: title
  }
}

export const setSelectedKey = (key: string) => {
  return {
    type: appConstants.SET_SELECTED_KEY,
    payload: key
  }
}
