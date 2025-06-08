import axios, { AxiosInstance } from 'axios'
import { clearAccessTokenToLS, getAccessTokenToLS, saveAccessTokenToLS } from './auth'
import { toast } from 'react-toastify'

class http {
  instance: AxiosInstance
  private access_token: string

  constructor() {
    this.access_token = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8081/',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (!config.headers?.skipAuth && this.access_token && config.headers) {
          config.headers.Authorization = `Bearer ${this.access_token}`
        }
        return config
      },
      (error) => {
        console.error('Error in request interceptor')
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)

        const { url } = response.config
        if (url === '/auth/login') {
          const loginData = response.data?.data

          if (loginData && loginData.access_token) {
            this.access_token = loginData.access_token
            saveAccessTokenToLS(this.access_token)
          } else {
            console.warn('Đăng nhập thất bại hoặc không có access_token', response.data)
          }
        } else if (url == '/auth/logout') {
          this.access_token = ''
          clearAccessTokenToLS()
        }
        return response
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          if (status === 403) {
            toast.error('Bạn không có quyền thực hiện chức năng này!')
            console.log('403')
          } else {
            console.error(`Lỗi từ server: ${status}`, error.response?.data)
          }
        } else {
          console.error('Lỗi không xác định:', error)
        }

        return Promise.reject(error)
      }
    )
  }
}

const httpInstance = new http().instance

export default httpInstance
