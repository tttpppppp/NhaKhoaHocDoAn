import { Button, FloatButton, message, Modal, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import baibaoApi from '../../../apis/article.api'
import { BaiBaoForm, BaiBaoResponse, CreateFormBaiBao } from '../../../types/baibao.type'
import Input from 'antd/es/input/Input'
import { Option } from 'antd/es/mentions'

export default function BaiBaoList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedBaiBao, setSelectedBaiBao] = useState<BaiBaoResponse | null>(null)
  const showModal = (record: BaiBaoResponse) => {
    setSelectedBaiBao(record)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const showModalAdd = () => {
    setIsModalOpenadd(true)
  }

  const handleOkAdd = () => {
    setIsModalOpenadd(false)
  }

  const handleCancelAdd = () => {
    setIsModalOpenadd(false)
  }
  const {
    control: controlAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<BaiBaoForm>()

  // const {
  //   register: registerAdd,
  //   handleSubmit: handleSubmitAdd,
  //   reset: resetAdd,
  //   formState: { errors: errorsAdd }
  // } = useForm<BaiBaoForm>()

  // useEffect(() => {
  //   if (selectedBaiBao) {
  //     resetEdit({})
  //   }
  // }, [selectedBaiBao, resetEdit])

  // const deleteChucDanhMụtation = useMutation({
  //   mutationFn: (id: number) => chucDanhApi.deleteChucDanh(id),
  //   onSuccess: (data) => {
  //     messageApi.open({
  //       type: 'success',
  //       content: `${data.data.message}`
  //     })
  //     queryClient.invalidateQueries({ queryKey: ['chucdanh'] })
  //   },
  //   onError: () => {
  //     messageApi.open({
  //       type: 'error',
  //       content: 'Xóa thất bại'
  //     })
  //   }
  // })
  // const updateChucDanhMutation = useMutation({
  //   mutationFn: (body: ChucDanhResponse) => chucDanhApi.updateChucDanh(body),
  //   onSuccess: (data) => {
  //     messageApi.open({
  //       type: 'success',
  //       content: `${data.data.message}`
  //     })
  //     queryClient.invalidateQueries({ queryKey: ['chucdanh'] })
  //   },
  //   onError: () => {
  //     messageApi.open({
  //       type: 'error',
  //       content: 'Cập nhật thất bại'
  //     })
  //   }
  // })
  const createChucDanhMutation = useMutation({
    mutationFn: (body: BaiBaoForm) => baibaoApi.addBaiBao(body),
    onSuccess: (data) => {
      resetAdd({
        tenBaiBao: '',
        issn: '',
        lienket: '',
        idTapChi: '',
        idLinhVuc: '',
        idTacGia: '',
        idDonVi: ''
      })
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['baibaoadmin'] })
    },
    onError: (error) => {
      console.log(error)

      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại'
      })
    }
  })
  // const handleDelete = (id: number) => {
  //   deleteChucDanhMụtation.mutate(id)
  // }
  // const onEditSubmit = handleSubmitEdit((data) => {
  //   updateChucDanhMutation.mutate(data)
  // })
  const onAddSubmit = handleSubmitAdd((data) => {
    createChucDanhMutation.mutate(data)
    console.log(data)
  })

  const columns: ColumnsType<BaiBaoResponse> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'ISSN',
      dataIndex: 'issn',
      key: 'issn'
    },
    {
      title: 'Tên bài báo',
      dataIndex: 'tenBaiBao',
      key: 'tenBaiBao'
    },
    {
      title: 'Tên tác giả',
      dataIndex: 'tenTacGia',
      key: 'mota'
    },
    {
      title: 'Tên tạp chí',
      dataIndex: 'tenTapChi',
      key: 'tenTapChi'
    },
    {
      title: 'Tên cấp tạp chí',
      dataIndex: 'tenCapTapChi',
      key: 'tenCapTapChi'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: BaiBaoResponse) => (
        <Space size="middle">
          <Tag className="uppercase" color={record.status ? 'green' : 'volcano'}>
            {record.status ? 'Active' : 'Unactive'}
          </Tag>
        </Space>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: BaiBaoResponse) => (
        <Space size="middle">
          <Button color="yellow" variant="solid" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn xóa chức danh này?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.id)}>
            <Button color="danger" variant="solid">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const { data } = useQuery({
    queryKey: ['baibaoadmin'],
    queryFn: baibaoApi.getAllBaiBaoAdmin
  })
  const { data: dataForm } = useQuery({
    queryKey: ['formbaibao'],
    queryFn: baibaoApi.getFromCreate
  })

  return (
    <div>
      <Helmet>
        <title>Danh sách chức danh</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách bài báo</h2>
      <Table
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        pagination={{
          pageSize: 5, // Số dòng mỗi trang
          showSizeChanger: true, // Cho phép người dùng chọn số dòng mỗi trang
          pageSizeOptions: ['5', '10', '20'], // Các lựa chọn dòng/trang
          position: ['bottomLeft']
        }}
      />
      {/* <Modal centered title="Chỉnh sửa chức danh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="space-y-4 w-full" noValidate>
          <div>
            <label className="block font-medium mb-1">ID</label>
            <input
              type="text"
              readOnly
              disabled
              placeholder="ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('chucDanhId', { required: 'Tên không được để trống' })}
            />

            <label className="block font-medium mb-1">Tên chức danh</label>
            <input
              type="text"
              placeholder="Nhập tên chuyên ngành"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('tenChucDanh', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.tenChucDanh && <p className="text-red-500 text-sm mt-2">{errorsEdit.tenChucDanh.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              placeholder="Nhập mô tả"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('mota', { required: 'Mô tả không được để trống' })}></textarea>
            {errorsEdit.mota && <p className="text-red-500 text-sm mt-2">{errorsEdit.mota.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Trạng thái</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('status')}>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Chỉnh sửa
          </button>
        </form>
      </Modal> */}
      <Modal centered title="Thêm bài báo" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        {' '}
        <form onSubmit={onAddSubmit} className="space-y-4 w-full" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên bài báo</label>
            <Controller
              name="tenBaiBao"
              control={controlAdd}
              rules={{ required: 'Tên bài báo là bắc buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập tên bài báo" style={{ width: '100%' }} />}
            />
            {errorsAdd.tenBaiBao && <p className="text-red-500 text-sm mt-2">{errorsAdd.tenBaiBao.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ISSN</label>
            <Controller
              name="issn"
              control={controlAdd}
              rules={{ required: 'ISSN là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập ISSN" style={{ width: '100%' }} />}
            />
            {errorsAdd.issn && <p className="text-red-500 text-sm mt-2">{errorsAdd.issn.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Liên kết</label>
            <Controller
              name="lienket"
              control={controlAdd}
              rules={{ required: 'Liên kết là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập ISSN" style={{ width: '100%' }} />}
            />
            {errorsAdd.lienket && <p className="text-red-500 text-sm mt-2">{errorsAdd.lienket.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Tạp chí</label>
            <Controller
              name="idTapChi"
              control={controlAdd}
              rules={{ required: 'Vui lòng chọn tạp chí' }}
              render={({ field }) => (
                <Select {...field} placeholder="Tạp chí" style={{ width: '100%' }}>
                  {dataForm?.data.data.tapChiResponses.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.tenTapChi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.idTapChi && <p className="text-red-500">{errorsAdd.idTapChi.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Lĩnh vực nghiên cứu</label>
            <Controller
              name="idLinhVuc"
              control={controlAdd}
              rules={{ required: 'Vui lòng chọn lĩnh vực' }}
              render={({ field }) => (
                <Select {...field} placeholder="Lĩnh vực nghiên cứu" style={{ width: '100%' }}>
                  {dataForm?.data.data.linhVucNghienCuuResponses.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.tenLinhVuc}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.idTapChi && <p className="text-red-500">{errorsAdd.idTapChi.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Đơn vị quản lý</label>
            <Controller
              name="idDonVi"
              control={controlAdd}
              rules={{ required: 'Vui lòng chọn đơn vị' }}
              render={({ field }) => (
                <Select {...field} placeholder="Đơn vị quản lý" style={{ width: '100%' }}>
                  {dataForm?.data.data.donViResponses.map((item) => (
                    <Option key={String(item.donViId)} value={String(item.donViId)}>
                      {item.tenDonVi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.idTapChi && <p className="text-red-500">{errorsAdd.idTapChi.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nhà khoa học</label>
            <Controller
              name="idTacGia"
              control={controlAdd}
              rules={{ required: 'Vui lòng chọn nhà khoa học' }}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  filterOption={(input, option) => String(option.value) === input.trim()}
                  placeholder="Chọn nhà khoa học"
                  allowClear
                  style={{ width: '100%' }}>
                  {dataForm?.data.data.nhaKhoaHocFormResponses.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.fullname}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.idTacGia && <p className="text-red-500 text-sm mt-2">{errorsAdd.idTacGia.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Thêm mới
          </button>
        </form>
      </Modal>
      <Tooltip title="Thêm bài báo" open>
        <FloatButton
          className="animate-bounce"
          style={{ right: 50 }}
          onClick={() => showModalAdd()}
          icon={<PlusOutlined />}
        />
      </Tooltip>
    </div>
  )
}
