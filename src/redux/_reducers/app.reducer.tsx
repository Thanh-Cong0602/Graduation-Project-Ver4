import { appConstants } from '../_constants'

interface AppState {
  titlePage: string | null
  selectedKey: string | null
}

const initialState: AppState = {
  titlePage: 'Trang chủ hệ thống',
  selectedKey: '1'
}

interface AppAction {
  type: string
  payload: never
}

export function appReducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case appConstants.SET_TITLE_PAGE:
      return {
        ...state,
        titlePage: action.payload
      }
    case appConstants.SET_SELECTED_KEY:
      return {
        ...state,
        selectedKey: action.payload
      }
    default:
      return state
  }
}
