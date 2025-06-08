import { AuthResponse } from '../types/auth.type'
import httpInstance from '../utils/http'

export const loginAccount = (body: { email: string; password: string }) => {
  return httpInstance.post<AuthResponse>('/auth/login', body, { headers: { skipAuth: true } })
}
export const registerAccount = (body: { email: string; fullname: string; mobile: string; password: string }) => {
  return httpInstance.post<AuthResponse>('/user/createUser', body, { headers: { skipAuth: true } })
}
export const logoutAccount = () => {
  return httpInstance.post<AuthResponse>('/auth/logout', {}, { headers: { skipAuth: true } })
}
