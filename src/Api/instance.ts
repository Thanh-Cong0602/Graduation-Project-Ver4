import axios from 'axios'
import { store } from '../redux/_stores'
const API = axios.create()
API.defaults.headers.common['bku-key'] = '8e31b3553533e085da38702a5a8f220c'
API.interceptors.request.use(config => {
  const token = store.getState().userReducer.token
  if (token) {
    API.defaults.headers.common['bku-token'] = `Bearer ${token}`
  }
  return config
})

export default API
