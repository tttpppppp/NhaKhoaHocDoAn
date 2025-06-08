import { Button, FloatButton, message, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DonViResponse } from '../../../types/scientist.type'
import donViApi from '../../../apis/donvi.api'
import { Helmet } from 'react-helmet-async'

export default function DonViQuanLyList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedDonVi, setSelectedDonVi] = useState<DonViResponse | null>(null)
  const showModal = (record: DonViResponse) => {
    setSelectedDonVi(record)
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
  } = useForm<DonViResponse>()

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<DonViResponse>()

  useEffect(() => {
    if (selectedDonVi) {
      resetEdit({
        donViId: selectedDonVi.donViId,
        dienthoai: selectedDonVi.dienthoai,
        tenDonVi: selectedDonVi.tenDonVi,
        email: selectedDonVi.email,
        status: selectedDonVi.status,
        diachi: selectedDonVi.diachi
      })
    }
  }, [selectedDonVi, resetEdit])

  const deleteChuyenNganhMụtation = useMutation({
    mutationFn: (id: number) => donViApi.deleteDonVi(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['donvi'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const updateDonViMutation = useMutation({
    mutationFn: (body: DonViResponse) => donViApi.updateDonVi(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['donvi'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại'
      })
    }
  })
  const createDonViMutation = useMutation({
    mutationFn: (body: DonViResponse) => donViApi.createDonVi(body),
    onSuccess: (data) => {
      resetAdd({
        dienthoai: '',
        tenDonVi: '',
        status: true,
        diachi: ''
      })
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['donvi'] })
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
    deleteChuyenNganhMụtation.mutate(id)
  }
  const onEditSubmit = handleSubmitEdit((data) => {
    updateDonViMutation.mutate(data)
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    createDonViMutation.mutate(data)
  })

  const columns: ColumnsType<DonViResponse> = [
    {
      title: '#',
      dataIndex: 'donViId',
      key: 'donViId'
    },
    {
      title: 'Tên đơn vị',
      dataIndex: 'tenDonVi',
      key: 'tenDonVi'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'dienthoai',
      key: 'dienthoai'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: DonViResponse) => (
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
      render: (_, record: DonViResponse) => (
        <Space size="middle">
          <Button color="yellow" variant="solid" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn xóa đơn vị này?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.donViId)}>
            <Button color="danger" variant="solid">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const { data } = useQuery({
    queryKey: ['donvi'],
    queryFn: donViApi.getallScientists
  })
  console.log(data)

  return (
    <div>
      <Helmet>
        <title>Danh sách đơn vị quản lý</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách đơn vị</h2>
      <Table
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          position: ['bottomLeft']
        }}
      />
      <Modal centered title="Chỉnh sửa đơn vị" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="space-y-4 w-full" noValidate onSubmit={onEditSubmit}>
          <div>
            <label className="block font-medium mb-1">ID</label>
            <input
              type="text"
              readOnly
              disabled
              placeholder="ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('donViId', { required: 'Tên không được để trống' })}
            />

            <label className="block font-medium mb-1">Tên đơn vị</label>
            <input
              type="text"
              placeholder="Nhập tên đơn vị"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('tenDonVi', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.tenDonVi && <p className="text-red-500 text-sm mt-2">{errorsEdit.tenDonVi.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="Nhập email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('email', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.email && <p className="text-red-500 text-sm mt-2">{errorsEdit.email.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('dienthoai', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.dienthoai && <p className="text-red-500 text-sm mt-2">{errorsEdit.dienthoai.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('diachi', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.diachi && <p className="text-red-500 text-sm mt-2">{errorsEdit.diachi.message}</p>}
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
      <Modal centered title="Thêm đơn vị" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        {' '}
        <form className="space-y-4 w-full" noValidate onSubmit={onAddSubmit}>
          <div>
            <label className="block font-medium mb-1">Tên đơn vị</label>
            <input
              type="text"
              placeholder="Nhập tên đơn vị"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('tenDonVi', { required: 'Tên không được để trống' })}
            />
            {errorsAdd.tenDonVi && <p className="text-red-500 text-sm mt-2">{errorsAdd.tenDonVi.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="Nhập email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('email', { required: 'Email không được để trống' })}
            />
            {errorsAdd.email && <p className="text-red-500 text-sm mt-2">{errorsAdd.email.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('dienthoai', { required: 'Số điện thoại không được để trống' })}
            />
            {errorsAdd.dienthoai && <p className="text-red-500 text-sm mt-2">{errorsAdd.dienthoai.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('diachi', { required: 'Địa chỉ không được để trống' })}
            />
            {errorsAdd.diachi && <p className="text-red-500 text-sm mt-2">{errorsAdd.diachi.message}</p>}
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
            Thêm
          </button>
        </form>
      </Modal>
      <Tooltip title="Thêm đơn vị" open>
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
