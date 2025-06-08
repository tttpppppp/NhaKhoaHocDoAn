import { ResponseDashboard } from '../types/dashboard.type'
import { ApiResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'

const dashboarApi = {
  getDashboard() {
    return httpInstance.get<ApiResponse<ResponseDashboard>>('/dashboard/list')
  }
}

export default dashboarApi
