import {
  ApiResponse,
  DataCreateScientsResponse,
  FilterResponse,
  NhaKhoaHocConfig,
  NhaKhoaHocDetailResponse,
  NhaKhoaHocFormDetailResponse,
  NhaKhoaHocHomeResponse,
  NhaKhoaHocListResponse
} from '../types/scientist.type'
import httpInstance from '../utils/http'

const scientistApi = {
  getallScientists(config: NhaKhoaHocConfig) {
    return httpInstance.get<ApiResponse<NhaKhoaHocListResponse>>('/scientist/list', { params: config })
  },
  getallScientistsAdmin() {
    return httpInstance.get<ApiResponse<NhaKhoaHocListResponse>>('/scientist/admin/list')
  },
  getFilter() {
    return httpInstance.get<ApiResponse<FilterResponse>>('/scientist/filter')
  },
  getDataFormAdmin() {
    return httpInstance.get<ApiResponse<DataCreateScientsResponse>>('/scientist/form/list')
  },
  getDetailScientist(id: string) {
    return httpInstance.get<ApiResponse<NhaKhoaHocDetailResponse>>(`/scientist/${id}`)
  },
  getDetailScientistForm(id: string) {
    return httpInstance.get<ApiResponse<NhaKhoaHocFormDetailResponse>>(`/scientist/form/detail/${id}`)
  },
  addNhaKhoaHoc(body: NhaKhoaHocHomeResponse) {
    return httpInstance.post<ApiResponse<null>>('/scientist/create', body)
  },
  deleteNhaKhoaHoc(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/scientist/delete/${id}`)
  },
  updateNhaKhoaHoc(body: NhaKhoaHocFormDetailResponse) {
    return httpInstance.post<ApiResponse<NhaKhoaHocFormDetailResponse>>('/scientist/update', body)
  }
}

export default scientistApi
