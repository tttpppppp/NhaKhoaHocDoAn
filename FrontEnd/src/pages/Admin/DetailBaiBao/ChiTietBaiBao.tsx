import { useParams } from 'react-router-dom'
import baibaoApi from '../../../apis/article.api'
import { useQuery } from '@tanstack/react-query'
import { Alert, Spin } from 'antd'
import BannerArticleDetail from '../../../components/BannerArticleDetail'

export default function ChiTietBaiBao() {
  const { id } = useParams<{ id: string }>()
  const { data, isPending, error } = useQuery({
    queryKey: ['baibao'],
    queryFn: () => {
      return baibaoApi.getDetailBaiBao(id ? parseInt(id) : 0)
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

  return (
    <div>
      <BannerArticleDetail />
      <div className="max-w-7xl mx-auto py-10">
        <div className="">
          <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">Thông tin bài báo khoa học</h1>

          <div className="space-y-2">
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Tên bài báo:</span> {data.data.data.tenBaiBao}
              </p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Tạp chí:</span>
              </p>
              <div className="ml-4 space-y-1">
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">ISSN:</span> {data.data.data.tapChiResponse?.issn}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Tên tạp chí:</span> {data.data.data.tapChiResponse?.tenTapChi}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Tạp chí:</span> {data.data.data.tapChiResponse?.tenLoaiTapChi}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Cơ quan xuất bản:</span>{' '}
                  {data.data.data.tapChiResponse?.tenCoQuanXuatBan}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Loại tạp chí:</span> {data.data.data.tapChiResponse?.tenPhanLoai}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Cấp tạp chí:</span> {data.data.data.tapChiResponse?.tenCapTapChi}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Năm:</span> {data.data.data.tapChiResponse?.nam}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Tập:</span> {data.data.data.tapChiResponse?.tap}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Số:</span> {data.data.data.tapChiResponse?.so}
                </p>
                <p className="text-gray-700 border-b border-gray-300 py-1">
                  <span className="font-semibold">Trang:</span> {data.data.data.tapChiResponse?.trang}
                </p>
              </div>
            </div>

            {/* Lĩnh vực */}
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Lĩnh vực:</span> {data.data.data?.tenLinhVuc}
              </p>
            </div>

            {/* Tác giả */}
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Tác giả:</span> {data.data.data?.tenTacGia}
              </p>
            </div>

            {/* Thuộc đề tài */}
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Thuộc đề tài:</span>
              </p>
            </div>

            {/* Liên kết */}
            <div className="border border-gray-300 p-2">
              <p className="text-gray-700">
                <span className="font-semibold">Liên kết:</span>{' '}
                <a className="text-blue-500" href={data.data.data?.lienket}>
                  {data.data.data?.lienket}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
