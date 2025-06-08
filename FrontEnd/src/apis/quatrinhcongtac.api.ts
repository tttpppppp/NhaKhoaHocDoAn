import { ApiResponse, DataFormCreateResponse, QuaTrinhCongTacResponse } from '../types/scientist.type'
import httpInstance from '../utils/http'

const quaTrinhCongTacApi = {
  getAllQuaTrinhCongTac() {
    return httpInstance.get<ApiResponse<QuaTrinhCongTacResponse[]>>('/quatrinhcongtac/list')
  },
  getDataFormCreate() {
    return httpInstance.get<ApiResponse<DataFormCreateResponse>>('/quatrinhcongtac/list/form')
  },
  createQuaTrinhDaoTao(body: QuaTrinhCongTacResponse) {
    return httpInstance.post<ApiResponse<QuaTrinhCongTacResponse>>('/quatrinhcongtac/add', body)
  },
  deleteQuaTrinhCongTac(id: number) {
    return httpInstance.delete<ApiResponse<null>>(`/quatrinhcongtac/delete/${id}`)
  },
  getQuaTrinhCongTac(id: number) {
    return httpInstance.get<ApiResponse<QuaTrinhCongTacResponse>>(`/quatrinhcongtac/detail/${id}`)
  },
  updateQuaTrinhCongTac(body: QuaTrinhCongTacResponse) {
    return httpInstance.post<ApiResponse<QuaTrinhCongTacResponse>>('/quatrinhcongtac/update', body)
  }
}

export default quaTrinhCongTacApi
