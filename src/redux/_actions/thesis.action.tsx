import { thesisConstants } from '../_constants/thesis.constant'
import AdvisorType from '../../types/AdvisorType'
import StudentType from '../../types/StudentType'

export const saveInforAdvisors = (advisors: AdvisorType[]) => {
  return {
    type: thesisConstants.SAVE_INFOR_ADVISORS,
    payload: advisors
  }
}

export const saveInforStudents = (students: StudentType[]) => {
  return {
    type: thesisConstants.SAVE_INFOR_STUDENTS,
    payload: students
  }
}