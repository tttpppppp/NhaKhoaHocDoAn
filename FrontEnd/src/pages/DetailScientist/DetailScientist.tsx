import { Link, useParams } from 'react-router-dom'
import { QueryConfig } from '../../types/scientist.type'
import useQueryParams from '../../hooks/useQueryParams'
import { omitBy } from 'lodash'
import Banner from '../../components/Banner'
import scientistApi from '../../apis/scientist.api'
import { useQuery } from '@tanstack/react-query'
import { getIdFromUrl } from '../../utils/utils'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet-async'
export default function DetailScientist() {
  const { id } = useParams()
  const idSplit = getIdFromUrl(id as string)
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: Number(queryParams.page) || 1,
      size: Number(queryParams.size) || 12,
      keyword: queryParams.keyword,
      donvi: queryParams.donvi,
      ngach: queryParams.ngach,
      chucdanh: queryParams.chucdanh,
      hocvi: queryParams.hocvi,
      linhvucnghiencuu: queryParams.linhvucnghiencuu
    },
    (value) => value === undefined || value === '' || value === 'undefined'
  )

  const { data } = useQuery({
    queryKey: ['detailScientist', id],
    queryFn: () => {
      return scientistApi.getDetailScientist(idSplit as string)
    }
  })
  const { data: filterData } = useQuery({
    queryKey: ['filter'],
    queryFn: () => {
      return scientistApi.getFilter()
    }
  })

  return (
    <div>
      <Helmet>
        <title>{data?.data?.data?.fullname}</title>
      </Helmet>
      {filterData && <Banner filterData={filterData.data.data} queryConfig={queryConfig} />}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white w-full max-w-6xl p-6 grid grid-cols-12 gap-28">
          {/* Left - Avatar */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center">
            {data?.data?.data?.image ? (
              <div>
                <Image width={300} src={data?.data?.data?.image} />
              </div>
            ) : (
              <Avatar size={200} icon={<UserOutlined />} />
            )}
            <h2 className="text-2xl font-semibold mt-4">{data?.data?.data?.fullname}</h2>
            <p className="text-primary">{data?.data?.data?.chucdanh}</p>
          </div>

          {/* Right - Info */}
          <div className="col-span-12 md:col-span-8">
            {/* Stats */}
            <div className="flex mb-6 text-center gap-28">
              <div className="text-3xl">
                <Link to={`/articles?tacGia=${idSplit}`} className=" text-primary">
                  {data?.data?.data?.soLuongBaiBao}
                </Link>
                <p className="text-gray-600 text-sm">BÀI BÁO</p>
              </div>
              <div className="text-3xl">
                <p className="text-primary">0</p>
                <p className="text-gray-600 text-sm">SÁCH - GIÁO TRÌNH</p>
              </div>
              <div className="text-3xl">
                <p className="text-primary">1</p>
                <p className="text-gray-600 text-sm">ĐỀ TÀI KHOA HỌC</p>
              </div>
              <div className="text-3xl">
                <p className="text-primary">1</p>
                <p className="text-gray-600 text-sm">Giải thưởng</p>
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-2 gap-6">
              {/* Thông tin */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-primary inline-block">Thông tin:</h3>

                <div className="space-y-4 mt-4 text-sm text-gray-700">
                  {/* Khối: Họ tên, Giới tính, Năm sinh */}
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <i className="bi bi-person-fill text-primary mr-2"></i>
                      <p>
                        <strong>Họ và tên:</strong> {data?.data?.data?.fullname}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <i className="bi bi-gender-male text-primary mr-2"></i>
                      <p>
                        <strong>Giới tính: </strong>
                        {''}
                        {data?.data?.data?.gioiTinh}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-calendar-date text-primary mr-2"></i>
                      <p>
                        <strong>Năm sinh:</strong> {data?.data?.data?.namSinh}
                      </p>
                    </div>
                  </div>

                  {/* Khối: Địa chỉ */}
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="flex items-start">
                      <i className="bi bi-geo-alt-fill text-primary mr-2 mt-1"></i>
                      <p>
                        <strong>Địa chỉ: </strong> {data?.data?.data?.address}
                      </p>
                    </div>
                  </div>

                  {/* Khối: Liên hệ */}
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="flex items-start">
                      <i className="bi bi-telephone-fill text-primary mr-2 mt-1"></i>
                      <div>
                        <p>
                          <strong>Liên hệ:</strong>
                        </p>
                        <p>Điện thoại: {data?.data?.data?.dienThoai}</p>
                        <p>Email: {data?.data?.data?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chuyên môn */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-pink-500 inline-block">Chuyên môn:</h3>

                <div className="space-y-4 mt-4 text-sm text-gray-700">
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="mb-2">
                      <strong>Chức danh:</strong>
                      <p>{data?.data?.data?.chucdanh}</p>
                    </div>
                    <div className="mb-2">
                      <strong>Ngành đào tạo:</strong>
                      <p>{data?.data?.data?.nganhDaoTao}</p>
                    </div>
                    <div className="mb-2">
                      <strong>Chuyên ngành đào tạo:</strong>
                      <p>{data?.data?.data?.chuyenNganh}</p>
                    </div>
                    <div className="mb-2">
                      <strong>Chuyên môn giảng dạy:</strong>
                      <p>{data?.data?.data?.chuyenMonGiangDay}</p>
                    </div>
                    <div className="mb-2">
                      <strong>Lĩnh vực nghiên cứu:</strong>
                      <p>
                        {data?.data?.data?.linhVucNghienCuuResponses.map((item) => {
                          return (
                            <span key={item.id}>
                              {item.tenLinhVuc} {', '}
                            </span>
                          )
                        })}
                      </p>
                    </div>
                    <div>
                      <strong>Trình độ ngoại ngữ:</strong>
                      <p>{data?.data?.data?.ngoaiNgu}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b-2 border-pink-600 inline-block pb-1">Quá trình:</h2>

          {/* Đơn vị quản lý */}
          <div className="bg-gray-100 rounded-lg p-4 space-y-4">
            <h3 className="flex items-center text-sm font-semibold space-x-2">
              <span className="text-sm">
                <i className="fa-solid fa-user"></i>
              </span>
              <span>Đơn vị quản lý</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-[#666666]">
                    <th className="py-2 px-4">Đơn vị</th>
                    <th className="py-2 px-4">Địa chỉ cơ quan</th>
                    <th className="py-2 px-4">Điện thoại cơ quan</th>
                    <th className="py-2 px-4">Email cơ quan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t text-[#666666]">
                    <td className="py-2 px-4">{data?.data.data.donViResponse.tenDonVi}</td>
                    <td className="py-2 px-4">{data?.data.data.donViResponse.diachi}</td>
                    <td className="py-2 px-4">{data?.data.data.donViResponse.dienthoai}</td>
                    <td className="py-2 px-4">{data?.data.data.donViResponse.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quá trình công tác */}
          <div className="bg-gray-100 rounded-lg p-4 space-y-4">
            <h3 className="flex items-center text-sm font-semibold space-x-2">
              <span className="text-sm">
                <i className="fa-solid fa-briefcase"></i>
              </span>
              <span>Quá trình công tác</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-[#666666]">
                    <th className="py-2 px-4">Thời gian</th>
                    <th className="py-2 px-4">Chức danh công tác</th>
                    <th className="py-2 px-4">Cơ quan công tác</th>
                    <th className="py-2 px-4">Chức vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.data.quaTrinhCongTacResponses.map((item) => {
                    return (
                      <tr className="border-t text-[#666666]">
                        <td className="py-2 px-4">
                          Từ {item.tuNam} đến {item.denNam}
                        </td>
                        <td className="py-2 px-4">{item.chucDanhCongTac}</td>
                        <td className="py-2 px-4">{item.coQuanCongTac}</td>
                        <td className="py-2 px-4">{item.chucVu}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 space-y-4">
            <h3 className="flex items-center text-sm font-semibold space-x-2">
              <span className="text-sm">
                <i className="fa-solid fa-graduation-cap"></i>
              </span>
              <span>Quá trình đào tạo</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-[#666666]">
                    <th className="py-2 px-4">Bậc đào tạo</th>
                    <th className="py-2 px-4">Cơ sở đào tạo</th>
                    <th className="py-2 px-4">Ngành đào tạo</th>
                    <th className="py-2 px-4">Năm tốt nghiệp</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.data.quaTrinhDaoTaoResponses.map((item) => {
                    return (
                      <tr className="border-t text-[#666666]">
                        <td className="py-2 px-4">{item.bacDaoTao}</td>
                        <td className="py-2 px-4">{item.coSoDaoTao}</td>
                        <td className="py-2 px-4">{item.nganhDaoTao}</td>
                        <td className="py-2 px-4">{item.namTotNghiep}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
