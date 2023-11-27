import ThesisType from '../../types/ThesisType'
import API_BASE from '../config'
import API from '../instance'
export function getAllTheses(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function updateThesis(endpoint: string, body: ThesisType[]) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function createThesis(endpoint: string, body: ThesisType[]) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}
