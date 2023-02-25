import { httpService } from './util/http.service'
import type { AuthResponse } from '@/models/http'
// import type { User } from '@/models/user'

export const authService = {
  login,
  logout,
  signup: signup,
  getLoggedInUser
}

async function login(username: string, password: string) {
  try {
    const user = await httpService.post<AuthResponse>('auth/login', { username, password })
    if (!user) throw new Error('Login failed.')
    return user
  } catch (err) {
    console.log('Error when trying to login:', err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post('auth/logout')
  } catch (err) {
    console.log('Error when trying to logout:', err)
    throw err
  }
}

async function signup(username: string, password: string) {
  try {
    const user = await httpService.post<AuthResponse>('auth/signup', { username, password })
    if (!user) throw new Error('signup failed.')
    return user
  } catch (err) {
    console.log('Error when trying to signup:', err)
    throw err
  }
}

async function getLoggedInUser() {
  // return { _id: '1', username: 'demo', email: 'demo@demo.com' }
  try {
    const user = await httpService.get<AuthResponse>('auth/logged-in-user')
    console.log(user)
    return user
  } catch (err) {
    console.log('Error when trying to get current user:', err)
    throw err
  }
}
