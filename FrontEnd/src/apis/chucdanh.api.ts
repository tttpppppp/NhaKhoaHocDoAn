import { ApiResponse, ChucDanhResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'

const chucDanhApi = {
  getAllChucDanh() {
    return httpInstance.get<ApiResponse<ChucDanhResponse[]>>('/chucdanh/list')
  },
  deleteChucDanh(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/chucdanh/delete/${id}`)
  },
  updateChucDanh(body: ChucDanhResponse) {
    return httpInstance.post<ApiResponse<ChucDanhResponse>>('/chucdanh/update', body)
  },
  createChucDanh(body: ChucDanhResponse) {
    return httpInstance.post<ApiResponse<ChucDanhResponse>>('/chucdanh/create', body)
  }
}

export default chucDanhApi
