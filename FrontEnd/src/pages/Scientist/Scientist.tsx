import ScientistCard from '../../components/ScientistCard'
import { useQuery } from '@tanstack/react-query'
import scientistApi from '../../apis/scientist.api'
import { NhaKhoaHocConfig, QueryConfig } from '../../types/scientist.type'
import { Helmet } from 'react-helmet-async'
import useQueryParams from '../../hooks/useQueryParams'
import { omitBy } from 'lodash'
import Banner from '../../components/Banner'
import { createSearchParams, Link } from 'react-router-dom'
import { Empty, Skeleton, Spin } from 'antd'
import Pagination from '../../components/Pagination'

export default function Scientist() {
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

  const { data, isPending } = useQuery({
    queryKey: ['scientists', queryConfig],
    queryFn: () => {
      return scientistApi.getallScientists(queryConfig as NhaKhoaHocConfig)
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
        <title>Khoa học</title>
      </Helmet>
      {filterData && <Banner filterData={filterData.data.data} queryConfig={queryConfig} />}
      {isPending ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
          <Spin tip="Đang tải dữ liệu" spinning={true}>
            <div style={{ height: 400, width: 300 }} />
          </Spin>
        </div>
      ) : (
        <div className="p-6 min-h-screen ">
          <div className="max-w-7xl mx-auto">
            {' '}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 relative">
                DỮ LIỆU NHÀ KHOA HỌC
                <p className="border-b-2 border-primary w-16 absolute bottom-[-5px] left-0"></p>
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  {(data?.data?.data?.nhaKhoaHocHomeResponses?.length ?? 0) > 0 && (
                    <div className="text-sm text-gray-600">
                      {data?.data.data.page ?? 0} - {data?.data.data.size ?? 0} / {data?.data.data.totalElements ?? 0}{' '}
                      KẾT QUẢ
                    </div>
                  )}
                </span>
                <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                  XUẤT RA EXCEL
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-3">
              {isPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="col-span-1">
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                  </div>
                ))
              ) : (data?.data?.data?.nhaKhoaHocHomeResponses ?? []).length > 0 ? (
                data?.data?.data?.nhaKhoaHocHomeResponses?.map((scientist) => (
                  <ScientistCard key={scientist.id} scientist={scientist} />
                ))
              ) : (
                <div className="col-span-12 text-center text-gray-500">
                  <Empty />
                  <p className="mt-2">Không có dữ liệu nhà khoa học nào</p>
                </div>
              )}
            </div>
            <div className="flex justify-center items-end mt-14 space-x-2 text-sm">
              {/* Nút Previous (Trước) */}
              <Link
                to={{
                  pathname: '/scientists',
                  search: createSearchParams({
                    ...queryConfig,
                    page: Math.max(Number(queryParams.page) - 1, 1).toString()
                  }).toString()
                }}
                className={`h-9 w-9 border rounded hover:bg-gray-100 flex items-center justify-center ${
                  data?.data?.data == null ? 'pointer-events-none opacity-50' : ''
                }`}>
                <i className="fas fa-arrow-left"></i>
              </Link>

              {/* Các nút phân trang */}
              <Pagination
                totalPages={data?.data?.data?.totalPages ?? 0}
                currentPage={Number(queryParams.page)}
                queryConfig={queryConfig}
              />
              {/* Nút Next (Sau) */}
              <Link
                to={{
                  pathname: '/scientists',
                  search: createSearchParams({
                    ...queryConfig,
                    page: Math.min(Number(queryParams.page) + 1, data?.data?.data?.totalPages ?? 0).toString()
                  }).toString()
                }}
                className={`h-9 w-9 border rounded hover:bg-gray-100 flex items-center justify-center ${
                  data?.data?.data == null ? 'pointer-events-none opacity-50' : ''
                }`}>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
