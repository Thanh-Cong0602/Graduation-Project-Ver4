import API_BASE from '../config'
import API from '../instance'
import StudentType from '../../types/StudentType'

export function getAllStudents(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getAllAdvisors(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getStudentByStudentID(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getAdvisorByUUID(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function updateStudentAPI(endpoint: string, body: StudentType[] ) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}
