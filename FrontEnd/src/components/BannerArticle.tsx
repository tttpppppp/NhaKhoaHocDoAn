import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { FilterBaiBaoResponse } from '../types/baibao.type'
import { ApiResponse, QueryConfigBaiBao } from '../types/scientist.type'
import { useEffect } from 'react'

type FormValues = {
  tuKhoa: string
  page: string
  size: string
  donVi: string
  tacGia: string
  loaiTapChi: string
  phanLoaiTapChi: string
  capTapChi: string
  linhVuc: string
  tuThoiDiem: string
  denThoiDiem: string
}

export default function BannerArticle({
  filterBaibao,
  queryConfigBaiBao
}: {
  filterBaibao?: ApiResponse<FilterBaiBaoResponse>
  queryConfigBaiBao: QueryConfigBaiBao
}) {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<FormValues>()
  useEffect(() => {
    if (queryConfigBaiBao) {
      reset({
        tuKhoa: queryConfigBaiBao.tuKhoa || '',
        page: String(queryConfigBaiBao.page || '1'),
        size: String(queryConfigBaiBao.size || '12'),
        donVi: queryConfigBaiBao.donvi || '',
        tacGia: queryConfigBaiBao.tacGia || '',
        loaiTapChi: queryConfigBaiBao.loaiTapChi || '',
        phanLoaiTapChi: queryConfigBaiBao.phanLoaiTapChi || '',
        capTapChi: queryConfigBaiBao.capTapChi || '',
        linhVuc: queryConfigBaiBao.linhVuc || '',
        tuThoiDiem: queryConfigBaiBao.tuThoiDiem || '',
        denThoiDiem: queryConfigBaiBao.denThoiDiem || ''
      })
    }
  }, [queryConfigBaiBao, reset])

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/articles',
      search: createSearchParams({
        ...queryConfigBaiBao,
        donvi: data.donVi,
        tacGia: data.tacGia,
        loaiTapChi: data.loaiTapChi,
        phanLoaiTapChi: data.phanLoaiTapChi,
        capTapChi: data.capTapChi,
        linhVuc: data.linhVuc,
        tuThoiDiem: data.tuThoiDiem,
        denThoiDiem: data.denThoiDiem,
        tuKhoa: data.tuKhoa
      }).toString()
    })
  })

  const data = filterBaibao?.data

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative mb-20"
      style={{ backgroundImage: 'url("https://csdlkhoahoc.hueuni.edu.vn/csdl/images/bg5.jpg")' }}>
      <div className="bg-black bg-opacity-40 w-full h-full absolute inset-0"></div>
      <form onSubmit={onSubmit}>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-10 px-4 py-10 text-white">
          <div className="space-y-6 col-span-12 md:col-span-6 flex items-center flex-col justify-center">
            <h2 className="text-3xl uppercase leading-snug">Dữ liệu bài báo khoa học</h2>
            <p className="mt-2 flex items-center">
              <a href="/" className="text-sm text-gray-500 hover:text-gray-600">
                Trang chủ
              </a>
              <span className="w-1.5 h-1.5 rounded-full border border-white inline-block mx-2"></span>
              <span className="text-gray-300">Dữ liệu bài báo khoa học</span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 bg-white text-[#555] p-6 rounded-sm shadow border-[#555] border-2">
            <div className="grid grid-cols-1 gap-2">
              {/* Ô Từ khóa tìm kiếm */}
              <input
                type="text"
                {...register('tuKhoa')}
                placeholder="Từ khóa tìm kiếm"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Dropdown Đơn vị */}
                <select {...register('donVi')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn đơn vị--</option>
                  {data?.donViResponse?.map((item) => (
                    <option key={item.donViId} value={item.donViId}>
                      {item.tenDonVi}
                    </option>
                  ))}
                </select>

                {/* Dropdown Tác giả */}
                <select {...register('tacGia')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn tác giả--</option>
                  {data?.nhaKhoaHocFormResponse?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.fullname}
                    </option>
                  ))}
                </select>

                {/* Dropdown Loại tạp chí */}
                <select {...register('loaiTapChi')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn loại tạp chí--</option>
                  {data?.loaiTapChiResponse?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenLoaiTapChi}
                    </option>
                  ))}
                </select>

                {/* Dropdown Phân loại tạp chí */}
                <select {...register('phanLoaiTapChi')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn phân loại tạp chí--</option>
                  {data?.phanLoaiTapChiResponse?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenPhanLoaiTapChi}
                    </option>
                  ))}
                </select>

                {/* Dropdown Cấp tạp chí */}
                <select {...register('capTapChi')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn cấp tạp chí--</option>
                  {data?.capTapChiResponse?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenCapTapChi}
                    </option>
                  ))}
                </select>

                <select {...register('linhVuc')} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">--Chọn lĩnh vực--</option>
                  {data?.linhVucNghienCuuResponse?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenLinhVuc}
                    </option>
                  ))}
                </select>

                <input type="date" {...register('tuThoiDiem')} className="w-full p-2 border border-gray-300 rounded" />

                <input type="date" {...register('denThoiDiem')} className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200">
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
