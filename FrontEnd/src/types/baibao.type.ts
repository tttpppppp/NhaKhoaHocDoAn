export interface BaiBaoPageResponse {
  page: number
  size: number
  totalPages: number
  totalElements: number
  baiBaoResponses: BaiBaoResponse[]
}

export interface BaiBaoResponse {
  id: number
  tenBaiBao: string
  tenTapChi: string
  tenLinhVuc: string
  tenCapTapChi: string
  tenTacGia: string
  lienket: string
  issn: string
  status: string
}

export interface BaiBaoForm {
  tenBaiBao: string
  idTapChi: string
  idDonVi: string
  idLinhVuc: string
  idCapTapChi: string
  idTacGia: string
  lienket: string
  issn: string
  status: string
}

interface TapChiResponse {
  id: number
  issn: string
  tenTapChi: string | null
  tenCapTapChi: string
  tenCoQuanXuatBan: string
  tenLoaiTapChi: string
  tenPhanLoai: string
  tap: string
  so: string
  trang: string
  nam: number
}
export interface BaiBaoDetailResponse {
  tenBaiBao: string
  tapChiResponse: TapChiResponse
  tenLinhVuc: string
  tenTacGia: string
  lienket: string
  nam: number
}

export interface FilterBaiBaoResponse {
  donViResponse: DonViResponse[]
  loaiTapChiResponse: LoaiTapChiResponse[]
  phanLoaiTapChiResponse: PhanLoaiTapChiResponse[]
  capTapChiResponse: CapTapChiResponse[]
  linhVucNghienCuuResponse: LinhVucNghienCuuResponse[]
  nhaKhoaHocFormResponse: NhaKhoaHocFormResponse[]
}

export interface DonViResponse {
  donViId: number
  tenDonVi: string
  dienthoai: string
  diachi: string
  email: string
  status: boolean
}

export interface LoaiTapChiResponse {
  id: number
  tenLoaiTapChi: string
}

export interface PhanLoaiTapChiResponse {
  id: number
  tenPhanLoaiTapChi: string
}

export interface CapTapChiResponse {
  id: number
  tenCapTapChi: string
}

export interface LinhVucNghienCuuResponse {
  id: number
  tenLinhVuc: string
}

export interface NhaKhoaHocFormResponse {
  id: number
  fullname: string
}

export interface CreateFormBaiBao {
  tapChiResponses: TapChiResponse[]
  linhVucNghienCuuResponses: LinhVucNghienCuuResponse[]
  nhaKhoaHocFormResponses: NhaKhoaHocFormResponse[]
  donViResponses: DonViResponse[]
}
