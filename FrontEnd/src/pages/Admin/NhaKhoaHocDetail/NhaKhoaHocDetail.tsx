import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import scientistApi from '../../../apis/scientist.api'
import { Helmet } from 'react-helmet-async'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function NhaKhoaHocDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['detailScientist', id],
    queryFn: () => {
      return scientistApi.getDetailScientist(id as string)
    }
  })

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>{data?.data?.data?.fullname}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="w-full px-6 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-indigo-800 font-medium text-sm">
            <i className="bi bi-arrow-left mr-2"></i>
            Quay lại
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden flex flex-col items-center">
          {/* Profile Image */}
          <div className="pt-8">
            {data?.data?.data?.image ? (
              <Image
                width={200}
                height={200}
                className="rounded-full shadow-md object-cover"
                src={data?.data?.data?.image}
                alt={data?.data?.data?.fullname}
              />
            ) : (
              <Avatar size={200} icon={<UserOutlined />} className="bg-gray-200 text-gray-600" />
            )}
          </div>
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800">{data?.data?.data?.fullname}</h2>
            <p className="text-lg text-primary font-medium mt-2">{data?.data?.data?.chucdanh}</p>
          </div>

          {/* Stats Section */}
          <div className="w-full px-6 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: 'BÀI BÁO', value: 0 },
                { label: 'SÁCH - GIÁO TRÌNH', value: 0 },
                { label: 'ĐỀ TÀI KHOA HỌC', value: 1 },
                { label: 'GIẢI THƯỞNG', value: 1 }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full px-6 py-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 text-center border-b-2 border-primary inline-block pb-2 mb-6">
              Thông tin
            </h3>
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
                <div className="space-y-3 text-gray-700 text-sm">
                  <div className="flex items-center">
                    <i className="bi bi-person-fill text-primary mr-3"></i>
                    <p>
                      <strong>Họ và tên:</strong> {data?.data?.data?.fullname}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-gender-male text-primary mr-3"></i>
                    <p>
                      <strong>Giới tính:</strong> {data?.data?.data?.gioiTinh}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-calendar-date text-primary mr-3"></i>
                    <p>
                      <strong>Năm sinh:</strong> {data?.data?.data?.namSinh}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <i className="bi bi-geo-alt-fill text-primary mr-3 mt-1"></i>
                  <p>
                    <strong>Địa chỉ:</strong> {data?.data?.data?.address}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <i className="bi bi-telephone-fill text-primary mr-3 mt-1"></i>
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

          {/* Expertise Section */}
          <div className="w-full px-6 py-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 text-center border-b-2 border-pink-500 inline-block pb-2 mb-6">
              Chuyên môn
            </h3>
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm max-w-lg mx-auto">
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <strong>Chức danh:</strong>
                  <p>{data?.data?.data?.chucdanh}</p>
                </div>
                <div>
                  <strong>Ngành đào tạo:</strong>
                  <p>{data?.data?.data?.nganhDaoTao}</p>
                </div>
                <div>
                  <strong>Chuyên ngành đào tạo:</strong>
                  <p>{data?.data?.data?.chuyenNganh}</p>
                </div>
                <div>
                  <strong>Chuyên môn giảng dạy:</strong>
                  <p>{data?.data?.data?.chuyenMonGiangDay}</p>
                </div>
                <div>
                  <strong>Lĩnh vực nghiên cứu:</strong>
                  <p>{data?.data?.data?.linhVucNghienCuuResponses?.map((item) => item.tenLinhVuc).join(', ')}</p>
                </div>
                <div>
                  <strong>Trình độ ngoại ngữ:</strong>
                  <p>{data?.data?.data?.ngoaiNgu}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="w-full px-6 py-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center border-b-2 border-pink-600 inline-block pb-2 mb-6">
              Quá trình
            </h2>

            {/* Đơn vị quản lý */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
              <h3 className="flex items-center justify-center text-lg font-semibold text-gray-800 mb-4">
                <i className="fa-solid fa-user text-primary mr-2"></i>
                Đơn vị quản lý
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 font-semibold">Đơn vị</th>
                      <th className="py-3 px-4 font-semibold">Địa chỉ cơ quan</th>
                      <th className="py-3 px-4 font-semibold">Điện thoại cơ quan</th>
                      <th className="py-3 px-4 font-semibold">Email cơ quan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3 px-4">{data?.data?.data?.donViResponse?.tenDonVi}</td>
                      <td className="py-3 px-4">{data?.data?.data?.donViResponse?.diachi}</td>
                      <td className="py-3 px-4">{data?.data?.data?.donViResponse?.dienthoai}</td>
                      <td className="py-3 px-4">{data?.data?.data?.donViResponse?.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quá trình công tác */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
              <h3 className="flex items-center justify-center text-lg font-semibold text-gray-800 mb-4">
                <i className="fa-solid fa-briefcase text-primary mr-2"></i>
                Quá trình công tác
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 font-semibold">Thời gian</th>
                      <th className="py-3 px-4 font-semibold">Chức danh công tác</th>
                      <th className="py-3 px-4 font-semibold">Cơ quan công tác</th>
                      <th className="py-3 px-4 font-semibold">Chức vụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.data?.quaTrinhCongTacResponses?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-4">
                          Từ {item.tuNam} đến {item.denNam}
                        </td>
                        <td className="py-3 px-4">{item.chucDanhCongTac}</td>
                        <td className="py-3 px-4">{item.coQuanCongTac}</td>
                        <td className="py-3 px-4">{item.chucVu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quá trình đào tạo */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h3 className="flex items-center justify-center text-lg font-semibold text-gray-800 mb-4">
                <i className="fa-solid fa-graduation-cap text-primary mr-2"></i>
                Quá trình đào tạo
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 font-semibold">Bậc đào tạo</th>
                      <th className="py-3 px-4 font-semibold">Cơ sở đào tạo</th>
                      <th className="py-3 px-4 font-semibold">Ngành đào tạo</th>
                      <th className="py-3 px-4 font-semibold">Năm tốt nghiệp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.data?.quaTrinhDaoTaoResponses?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-4">{item.bacDaoTao}</td>
                        <td className="py-3 px-4">{item.coSoDaoTao}</td>
                        <td className="py-3 px-4">{item.nganhDaoTao}</td>
                        <td className="py-3 px-4">{item.namTotNghiep}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
