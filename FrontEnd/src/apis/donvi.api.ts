import { ApiResponse, DonViResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'

const donViApi = {
  getallScientists() {
    return httpInstance.get<ApiResponse<DonViResponse[]>>('/donviquanly/list')
  },
  deleteDonVi(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/donviquanly/delete/${id}`)
  },
  updateDonVi(body: DonViResponse) {
    return httpInstance.post<ApiResponse<DonViResponse>>('/donviquanly/update', body)
  },
  createDonVi(body: DonViResponse) {
    return httpInstance.post<ApiResponse<DonViResponse>>('/donviquanly/add', body)
  }
}

export default donViApi
