import StudentType from '../../types/StudentType'
import API_BASE from '../config'
import API from '../instance'

export function registerNewAccountAPI(endpoint: string, body: StudentType[]) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function loginAPI(endpoint: string, body: Record<string, unknown>) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function logoutAPI(endpoint: string) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`)
}
