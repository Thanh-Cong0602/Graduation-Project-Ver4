import ThesisType from '../../types/ThesisType'
import API_BASE from '../config'
import API from '../instance'
export function getAllThesesAPI(endpoint: string) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function updateThesisAPI(endpoint: string, body: ThesisType[]) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function createThesisAPI(endpoint: string, body: ThesisType[]) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}
