import { IChuyenNganh } from '../types/chuyennganh.type'
import { ApiResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'
import { FormChuyenNganh } from '../utils/rules'

const chuyennganhApi = {
  getChuyenNganh() {
    return httpInstance.get<ApiResponse<FormChuyenNganh[]>>('/chuyennganh/list')
  },
  addChuyenNganh(body: IChuyenNganh) {
    return httpInstance.post<ApiResponse<null>>('/chuyennganh/add', body)
  },
  deleteChuyenNganh(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/chuyennganh/delete/${id}`)
  },
  updateChuyenNganh(body: FormChuyenNganh) {
    return httpInstance.post<ApiResponse<null>>('/chuyennganh/update', body)
  }
}

export default chuyennganhApi
