export interface NhaKhoaHocHomeResponse {
  id: number
  fullname: string
  email: string
  dienthoai: string
  diachi: string
  chuyenmongiangday: string
  trinhdongoaingu: string
  gioitinh: string
  ngaySinh: Date
  chucdanh: string
  nganhDaoTao: string
  chuyenNganh: string
  tenDonVi: string
  image: string | null
  linhVucNghienCuu: LinhVucNghienCuuResponse[]
  hocvi: HocViResponse
  ngach: NgachResponse
  status: boolean
}
export type NhaKhoaHocType = {
  id: number
  fullname: string
  chucdanh: string
  nganhDaoTao: string
  chuyenNganh: string
  tenDonVi: string
  image: string | null
}
export interface NhaKhoaHocListResponse {
  page: number
  size: number
  totalPages: number
  totalElements: number
  nhaKhoaHocHomeResponses: NhaKhoaHocHomeResponse[]
}

export interface NhaKhoaHocConfig {
  keyword?: string
  page?: string | number
  size?: string | number
  donvi?: string | number
  ngach?: string | number
  chucdanh?: string | number
  hocvi?: string | number
  linhvucnghiencuu?: string | number
}

export interface BaiBaoConfig {
  tuKhoa?: string
  page?: string
  size?: string
  donvi?: string
  tacGia?: string
  loaiTapChi?: string
  phanLoaiTapChi?: string
  capTapChi?: string
  linhVuc?: string
  tuThoiDiem?: string
  denThoiDiem?: string
}
export interface DonViResponse {
  donViId: number
  tenDonVi: string
  email: string
  dienthoai: string
  diachi: string
  status: boolean
}

export interface NgachResponse {
  ngachId: number
  tenNgach: string
}

export interface ChucDanhResponse {
  chucDanhId: number
  tenChucDanh: string
  mota: string
  status: boolean
}

export interface HocViResponse {
  hocViId: number
  tenHocVi: string
  mota: string
  status: boolean
}

export interface LinhVucNghienCuuResponse {
  id: number
  tenLinhVuc: string
}

export interface FilterResponse {
  donViResponses: DonViResponse[]
  ngachRespionses: NgachResponse[]
  chucDanhResponses: ChucDanhResponse[]
  hocViResponses: HocViResponse[]
  linhVucNghienCuuResponses: LinhVucNghienCuuResponse[]
}

export interface DataCreateScientsResponse {
  donViResponses: DonViResponse[]
  ngachRespionses: NgachResponse[]
  chucDanhResponses: ChucDanhResponse[]
  hocViResponses: HocViResponse[]
  chuyenNganhResponses: ChuyenNganhResponse[]
  nganhDaoTaoResponses: NganhDaoTaoResponse[]
  linhVucNghienCuuResponses: LinhVucNghienCuuResponse[]
}

interface NganhDaoTaoResponse {
  id: number
  tenNganh: string
}

interface ChuyenNganhResponse {
  id: number
  tenChuyenNganh: string
  mota: string
  status: boolean
}
export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}
export type QueryConfig = {
  [key in keyof NhaKhoaHocConfig]: string
}

export type QueryConfigBaiBao = {
  [key in keyof BaiBaoConfig]: string
}

interface LinhVucNghienCuu {
  id: number
  tenLinhVuc: string
}
export interface QuaTrinhCongTacResponse {
  id: number
  tuNam: string
  denNam: string
  chucDanhCongTac: string
  coQuanCongTac: string
  chucVu: string
  fullname: string
  chuyenNganh: string
  nhakhoahoc: number
  status: string
}
interface quaTrinhDaoTaoResponse {
  bacDaoTao: string
  coSoDaoTao: string
  namTotNghiep: number
  nganhDaoTao: string
}
export interface NhaKhoaHocDetailResponse {
  fullname: string
  image: string
  chucdanh: string
  gioiTinh: string
  namSinh: string
  address: string
  dienThoai: string
  email: string
  nganhDaoTao: string
  chuyenNganh: string
  chuyenMonGiangDay: string
  linhVucNghienCuuResponses: LinhVucNghienCuu[]
  ngoaiNgu: string
  soLuongBaiBao: number
  donViResponse: DonViResponse
  quaTrinhCongTacResponses: QuaTrinhCongTacResponse[]
  quaTrinhDaoTaoResponses: quaTrinhDaoTaoResponse[]
}

interface CoQuanCongTac {
  id: number
  tenCoQuan: string
}

interface ChucDanhCongTac {
  id: number
  tenChucDanhCongTac: string
}

interface ChucVu {
  id: number
  tenChucVu: string
}
export interface DataFormCreateResponse {
  coQuanCongTacResponse: CoQuanCongTac[]
  chucDanhCongTacResponse: ChucDanhCongTac[]
  chucVuResponse: ChucVu[]
  nhaKhoaHocFormResponse: NhaKhoaHocHomeResponse[]
}

export interface NhaKhoaHocFormDetailResponse {
  fullname: string
  email: string
  address: string
  dienThoai: string
  trinhDoNgoaiNgu: string
  image: string
  chucdanhId: number | string
  gioiTinh: string
  chuyenNganhid: number | string
  donViId: number | string
  linhVucIds: number[] | string[]
  ngachid: number | string
  hocviId: number | string
  chuyenMonGiangDay: string | null
  status: number | string
  ngaySinh: string | null
}
