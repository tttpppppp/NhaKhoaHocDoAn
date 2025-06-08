import { Button, FloatButton, message, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import chucDanhApi from '../../../apis/chucdanh.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChucDanhResponse } from '../../../types/scientist.type'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'

export default function ChucDanhList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedChucDanh, setSelectedChucDanh] = useState<ChucDanhResponse | null>(null)
  const showModal = (record: ChucDanhResponse) => {
    setSelectedChucDanh(record)
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
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit }
  } = useForm<ChucDanhResponse>()

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<ChucDanhResponse>()

  useEffect(() => {
    if (selectedChucDanh) {
      resetEdit({
        chucDanhId: selectedChucDanh.chucDanhId,
        tenChucDanh: selectedChucDanh.tenChucDanh,
        mota: selectedChucDanh.mota,
        status: selectedChucDanh.status ?? true
      })
    }
  }, [selectedChucDanh, resetEdit])

  const deleteChucDanhMụtation = useMutation({
    mutationFn: (id: number) => chucDanhApi.deleteChucDanh(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chucdanh'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const updateChucDanhMutation = useMutation({
    mutationFn: (body: ChucDanhResponse) => chucDanhApi.updateChucDanh(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chucdanh'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại'
      })
    }
  })
  const createChucDanhMutation = useMutation({
    mutationFn: (body: ChucDanhResponse) => chucDanhApi.createChucDanh(body),
    onSuccess: (data) => {
      resetAdd({
        tenChucDanh: '',
        mota: '',
        status: true
      })
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chucdanh'] })
    },
    onError: (error) => {
      console.log(error)

      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại'
      })
    }
  })
  const handleDelete = (id: number) => {
    deleteChucDanhMụtation.mutate(id)
  }
  const onEditSubmit = handleSubmitEdit((data) => {
    updateChucDanhMutation.mutate(data)
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    console.log(data)
    createChucDanhMutation.mutate(data)
  })

  const columns: ColumnsType<ChucDanhResponse> = [
    {
      title: '#',
      dataIndex: 'chucDanhId',
      key: 'chucDanhId'
    },
    {
      title: 'Tên chức danh',
      dataIndex: 'tenChucDanh',
      key: 'tenChucDanh'
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'mota',
      width: 450
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (_, record: ChucDanhResponse) => (
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
      render: (_, record: ChucDanhResponse) => (
        <Space size="middle">
          <Button color="yellow" variant="solid" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn xóa chức danh này?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.chucDanhId)}>
            <Button color="danger" variant="solid">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const { data } = useQuery({
    queryKey: ['chucdanh'],
    queryFn: chucDanhApi.getAllChucDanh
  })

  return (
    <div>
      <Helmet>
        <title>Danh sách chức danh</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách chức danh</h2>
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
      <Modal centered title="Chỉnh sửa chức danh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form onSubmit={onEditSubmit} className="space-y-4 w-full" noValidate>
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
      </Modal>
      <Modal centered title="Thêm chức danh" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        {' '}
        <form onSubmit={onAddSubmit} className="space-y-4 w-full" noValidate>
          <div>
            <label className="block font-medium mb-1">Tên chức danh</label>
            <input
              type="text"
              placeholder="Nhập tên chuyên ngành"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('tenChucDanh', { required: 'Tên không được để trống' })}
            />
            {errorsAdd.tenChucDanh && <p className="text-red-500 text-sm mt-2">{errorsAdd.tenChucDanh.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              placeholder="Nhập mô tả"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('mota', { required: 'Mô tả không được để trống' })}></textarea>
            {errorsAdd.mota && <p className="text-red-500 text-sm mt-2">{errorsAdd.mota.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Trạng thái</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('status')}>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Thêm mới
          </button>
        </form>
      </Modal>
      <Tooltip title="Thêm chức danh" open>
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
