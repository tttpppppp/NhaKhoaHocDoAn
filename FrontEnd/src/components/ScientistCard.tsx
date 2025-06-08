import { Link } from 'react-router-dom'
import { NhaKhoaHocHomeResponse } from '../types/scientist.type'
import { gennerateNameId } from '../utils/utils'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface Props {
  scientist: NhaKhoaHocHomeResponse
}
export default function ScientistCard({ scientist }: Props) {
  return (
    <div className="bg-gray-100  p-6 rounded-sm shadow-md border-b-2 border-primary w-full  flex flex-col justify-between">
      <div className="flex space-x-4">
        {scientist.image ? (
          <img
            src={scientist.image ? scientist.image : 'https://csdlkhoahoc.hueuni.edu.vn/imgs/avatar.bmp'}
            alt={scientist.fullname}
            className="w-[80px] h-[80px] rounded object-cover flex-shrink-0"
          />
        ) : (
          <Avatar size={70} icon={<UserOutlined />} />
        )}

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-primary">{scientist.fullname}</h2>
          <p className="text-sm text-gray-600">{scientist.chucdanh}</p>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p className="text-[#666666]">
              <strong>Ngành đào tạo:</strong> <span className="block">{scientist.nganhDaoTao || '—'}</span>
            </p>
            <p className="text-[#666666]">
              <strong>Chuyên ngành đào tạo:</strong> <span className="block">{scientist.chuyenNganh || '—'}</span>
            </p>
            <p className="text-[#666666]">
              <strong>Đơn vị quản lý:</strong> <span className="block">{scientist.tenDonVi || '—'}</span>
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/scientists/detail/${gennerateNameId({ name: scientist.fullname, id: scientist.id })}`}
        className="mt-4 inline-block bg-[#202C45] text-white px-4 py-2 rounded hover:bg-blue-800 text-sm self-start">
        Xem chi tiết
      </Link>
    </div>
  )
}
