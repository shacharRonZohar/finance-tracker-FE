import Axios, { AxiosError, type AxiosResponse } from 'axios'
// import type { Endpoints } from '@/models/http'

const BASE_URL = import.meta.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get<T>(endpoint: Endpoints, data?: unknown) {
    return ajax<T>(endpoint, 'GET', data)
  },
  post<T>(endpoint: Endpoints, data?: unknown) {
    return ajax<T>(endpoint, 'POST', data)
  },
  put<T>(endpoint: Endpoints, data?: unknown) {
    return ajax<T>(endpoint, 'PUT', data)
  },
  delete<T>(endpoint: Endpoints, data?: unknown) {
    return ajax<T>(endpoint, 'DELETE', data)
  }
}

async function ajax<T>(endpoint: Endpoints, method = 'GET', data: unknown | null = null) {
  console.log('data:', data)
  try {
    const res = await axios<T>({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null
    })
    return res.data
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }
    throw err
  }
}
