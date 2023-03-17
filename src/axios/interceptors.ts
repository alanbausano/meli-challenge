import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.headers['Content-Type'] = 'application/json'
    request.headers.Accept = 'application/json'
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
