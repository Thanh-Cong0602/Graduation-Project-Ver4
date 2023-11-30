import AdvisorType from '../../types/AdvisorType'
import StudentType from '../../types/StudentType'
import { thesisConstants } from '../_constants/thesis.constant'

interface ThesisState {
  saveInforAdvisors: AdvisorType[] | null
  saveInforStudents: StudentType[] | null
}

const initialState: ThesisState = {
  saveInforAdvisors: [],
  saveInforStudents: []
}

interface ThesisAction {
  type: string
  payload: never
}

export function thesisReducer(
  state: ThesisState = initialState,
  action: ThesisAction
): ThesisState {
  switch (action.type) {
    case thesisConstants.SAVE_INFOR_ADVISORS:
      return {
        ...state,
        saveInforAdvisors: action.payload
      }
    case thesisConstants.SAVE_INFOR_STUDENTS:
      return {
        ...state,
        saveInforStudents: action.payload
      }
    default:
      return state
  }
}
