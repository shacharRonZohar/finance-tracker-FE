import { httpService } from './util/http.service'
import type { AuthResponse } from '@/models/http'
// import type { User } from '@/models/user'

export const authService = {
  login,
  logout,
  register,
  getLoggedInUser: getCurrentUser
}

async function login(username: string, password: string) {
  try {
    const { user } = await httpService.post<AuthResponse>('login', { username, password })
    if (!user) throw new Error('Login failed.')
    return user
  } catch (err) {
    console.log('Error when trying to login:', err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post('logout')
  } catch (err) {
    console.log('Error when trying to logout:', err)
    throw err
  }
}

async function register(username: string, password: string, email: string) {
  try {
    const { user } = await httpService.post<AuthResponse>('register', { username, password, email })
    if (!user) throw new Error('Register failed.')
    return user
  } catch (err) {
    console.log('Error when trying to register:', err)
    throw err
  }
}

async function getCurrentUser() {
  return { _id: '1', username: 'demo', email: 'demo@demo.com' }
  try {
    const { user } = await httpService.get<AuthResponse>('getCurrentUser')
    return user
  } catch (err) {
    console.log('Error when trying to get current user:', err)
    throw err
  }
}
