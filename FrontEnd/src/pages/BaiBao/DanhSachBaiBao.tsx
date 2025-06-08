import { useQuery } from '@tanstack/react-query'
import baibaoApi from '../../apis/article.api'
import { omitBy } from 'lodash'
import useQueryParams from '../../hooks/useQueryParams'
import { BaiBaoConfig } from '../../types/scientist.type'
import { Alert, Button, Spin } from 'antd'
import { Helmet } from 'react-helmet-async'
import BannerArticle from '../../components/BannerArticle'
import { Link } from 'react-router-dom'
import { BarChartOutlined, FileTextOutlined, GlobalOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons'
import { BaiBaoResponse } from '../../types/baibao.type'

export default function DanhSachBaiBao() {
  const queryParams = useQueryParams()
  const queryConfigBaiBao: BaiBaoConfig = omitBy(
    {
      page: queryParams.page ? String(queryParams.page) : '1',
      size: queryParams.size ? String(queryParams.size) : '12',
      donvi: queryParams.donvi,
      tacGia: queryParams.tacGia,
      loaiTapChi: queryParams.loaiTapChi,
      phanLoaiTapChi: queryParams.phanLoaiTapChi,
      capTapChi: queryParams.capTapChi,
      linhVuc: queryParams.linhVuc,
      tuThoiDiem: queryParams.tuThoiDiem,
      denThoiDiem: queryParams.denThoiDiem,
      tuKhoa: queryParams.tuKhoa
    },
    (value) => value === undefined || value === '' || value === 'undefined'
  )

  const { data: filterData } = useQuery({
    queryKey: ['filterBaibao'],
    queryFn: () => {
      return baibaoApi.getFilterBaiBao()
    }
  })
  const { data, isPending, error } = useQuery({
    queryKey: ['baibao'],
    queryFn: () => {
      return baibaoApi.getAllBaiBao(queryConfigBaiBao)
    }
  })

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[400px] rounded-lg shadow-md">
        <Spin tip="Đang tải dữ liệu" spinning={true}>
          <div className="h-[400px] w-[300px]" />
        </Spin>
      </div>
    )
  }

  if (error) {
    return <Alert message="Lỗi khi tải dữ liệu" description={error.message} type="error" showIcon className="m-4" />
  }

  const articles = data?.data?.data.baiBaoResponses

  return (
    <div className="">
      <Helmet>
        <title>Bài báo khoa học</title>
      </Helmet>
      {data && <BannerArticle filterBaibao={filterData?.data} queryConfigBaiBao={queryConfigBaiBao} />}
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 pb-1">
            <span className="border-b-2 border-primary inline-block w-[100px]">DỮ LIỆU</span> BÀI BÁO KHOA HỌC
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              {' '}
              {(data?.data?.data?.baiBaoResponses?.length ?? 0) > 0 && (
                <div className="text-sm text-gray-600">
                  {data?.data.data.page ?? 0} - {data?.data.data.size ?? 0} / {data?.data.data.totalElements ?? 0} KẾT
                  QUẢ
                </div>
              )}
            </span>
            <Button type="primary" className="bg-yellow-500 border-yellow-500 flex items-center gap-1">
              XUẤT RA EXCEL
            </Button>
          </div>
        </div>

        {articles?.length ? (
          articles.map((article: BaiBaoResponse, index: number) => (
            <Link to={`/article/detail/${article.id}`} key={index} className="no-underline">
              <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {article.tenBaiBao || 'Không có tiêu đề'}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    <FileTextOutlined /> {article.tenTapChi || 'Không có tạp chí'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    <GlobalOutlined /> Lĩnh vực: {article.tenLinhVuc || 'Không có lĩnh vực'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    <BarChartOutlined /> Danh mục: {article.tenCapTapChi?.trim() || 'Không có danh mục'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    <UserOutlined /> Tác giả: {article.tenTacGia || 'Không có tác giả'}
                  </p>
                  <p className="text-sm text-blue-600 flex items-center gap-1 mb-1">
                    <LinkOutlined /> Liên kết:{' '}
                    {article.lienket ? (
                      <a
                        href={article.lienket}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 truncate">
                        {article.lienket}
                      </a>
                    ) : (
                      'Không có liên kết'
                    )}
                  </p>
                </div>
                <span className="bg-red-500 text-white px-3 py-1 rounded">{article.issn || 'Không có ISSN'}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 my-10">Không có dữ liệu bài báo.</p>
        )}
      </div>
    </div>
  )
}
