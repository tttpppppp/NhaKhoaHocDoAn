import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
}>
