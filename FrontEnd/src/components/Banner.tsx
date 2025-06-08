import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { FilterResponse, QueryConfig } from '../types/scientist.type'
import { useEffect } from 'react'

type FormValues = {
  keyword: string
  donViId: string
  ngachId: string
  chucDanhId: string
  hocViId: string
  linhVucNghienCuuId: string
}

export default function Banner({ filterData, queryConfig }: { filterData: FilterResponse; queryConfig: QueryConfig }) {
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm<FormValues>()
  useEffect(() => {
    reset({
      keyword: queryConfig.keyword || '',
      donViId: queryConfig.donvi || '',
      ngachId: queryConfig.ngach || '',
      chucDanhId: queryConfig.chucdanh || '',
      hocViId: queryConfig.hocvi || '',
      linhVucNghienCuuId: queryConfig.linhvucnghiencuu || ''
    })
  }, [queryConfig, reset])

  const onSubmit = (data: FormValues) => {
    navigate({
      pathname: '/scientists',
      search: createSearchParams({
        ...queryConfig,
        keyword: data.keyword,
        donvi: data.donViId,
        ngach: data.ngachId,
        chucdanh: data.chucDanhId,
        hocvi: data.hocViId,
        linhvucnghiencuu: data.linhVucNghienCuuId
      }).toString()
    })
  }

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative mb-20"
      style={{ backgroundImage: 'url("https://csdlkhoahoc.hueuni.edu.vn/csdl/images/bg5.jpg")' }}>
      <div className="bg-black bg-opacity-40 w-full h-full absolute inset-0"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-10 px-4 py-10 text-white">
          <div className="space-y-6 col-span-12 md:col-span-6 flex items-center flex-col justify-center">
            <h2 className="text-3xl uppercase leading-snug">Dữ liệu Nhà khoa học</h2>
            <p className="mt-2 flex items-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-600">
                Trang chủ
              </Link>
              <span className="w-1.5 h-1.5 rounded-full border border-white inline-block mx-2"></span>
              <span className="text-gray-300">Nhà khoa học</span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 bg-white text-[#555] p-6 rounded-sm shadow border-[#555] border-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="col-span-2">
                <select
                  {...register('donViId')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Chọn đơn vị--</option>
                  {filterData.donViResponses.map((item) => (
                    <option key={item.donViId} value={item.donViId}>
                      {item.tenDonVi}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  {...register('ngachId')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Chọn ngạch--</option>
                  {filterData.ngachRespionses.map((item) => (
                    <option key={item.ngachId} value={item.ngachId}>
                      {item.tenNgach}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  {...register('chucDanhId')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Chọn chức danh--</option>
                  {filterData.chucDanhResponses.map((item) => (
                    <option key={item.chucDanhId} value={item.chucDanhId}>
                      {item.tenChucDanh}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  {...register('hocViId')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Chọn học vị--</option>
                  {filterData.hocViResponses.map((item) => (
                    <option key={item.hocViId} value={item.hocViId}>
                      {item.tenHocVi}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  {...register('linhVucNghienCuuId')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Chọn lĩnh vực nghiên cứu--</option>
                  {filterData.linhVucNghienCuuResponses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenLinhVuc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 md:col-span-2 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-9 md:col-span-8">
                  <input
                    {...register('keyword')}
                    type="text"
                    placeholder="Từ khóa tìm kiếm"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-3 md:col-span-4">
                  <button
                    type="submit"
                    className="w-full bg-[#f71359] text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200">
                    Tìm Kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
