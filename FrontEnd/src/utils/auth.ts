import { jwtDecode } from 'jwt-decode'
interface AccessTokenPayload {
  role: string[]
  sub: string
  iat: number
  exp: number
}
export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenToLS = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''

export const extractAccessToken = (access_token: string) => {
  const decoded = jwtDecode<AccessTokenPayload>(access_token)
  return decoded
}
