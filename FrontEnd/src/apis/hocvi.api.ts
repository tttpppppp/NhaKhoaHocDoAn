import { ApiResponse, HocViResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'

const hocViApi = {
  getHocVi() {
    return httpInstance.get<ApiResponse<HocViResponse[]>>('/hocvi/list')
  },
  addHocVi(body: HocViResponse) {
    return httpInstance.post<ApiResponse<null>>('/hocvi/add', body)
  },
  deleteHocVi(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/hocvi/delete/${id}`)
  },
  updateHocVi(body: HocViResponse) {
    return httpInstance.post<ApiResponse<null>>('/hocvi/update', body)
  }
}

export default hocViApi
