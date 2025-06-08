import {
  BaiBaoDetailResponse,
  BaiBaoPageResponse,
  BaiBaoResponse,
  CreateFormBaiBao,
  FilterBaiBaoResponse
} from '../types/baibao.type'
import { ApiResponse, QueryConfigBaiBao } from '../types/scientist.type'
import httpInstance from '../utils/http'

const baibaoApi = {
  getAllBaiBao(body: QueryConfigBaiBao) {
    return httpInstance.get<ApiResponse<BaiBaoPageResponse>>('/baibao/list', { params: body })
  },
  getAllBaiBaoAdmin() {
    return httpInstance.get<ApiResponse<BaiBaoResponse[]>>('/baibao/admin/list')
  },
  getFromCreate() {
    return httpInstance.get<ApiResponse<CreateFormBaiBao>>('/baibao/admin/form')
  },
  getFilterBaiBao() {
    return httpInstance.get<ApiResponse<FilterBaiBaoResponse>>('/baibao/list/filter')
  },
  getDetailBaiBao(id: number) {
    return httpInstance.get<ApiResponse<BaiBaoDetailResponse>>(`/baibao/detail/${id}`)
  },
  addBaiBao(body: BaiBaoForm) {
    return httpInstance.post<ApiResponse<null>>('/baibao/create', body)
  }
}

export default baibaoApi
