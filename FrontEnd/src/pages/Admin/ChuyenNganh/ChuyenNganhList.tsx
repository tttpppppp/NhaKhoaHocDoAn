import { Button, FloatButton, message, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormChuyenNganh } from '../../../utils/rules'
import chuyennganhApi from '../../../apis/chuyennganh'
import { Helmet } from 'react-helmet-async'

export default function ChuyenNganhList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedChuyenNganh, setSelectedChuyenNganh] = useState<FormChuyenNganh | null>(null)
  const showModal = (record: FormChuyenNganh) => {
    setSelectedChuyenNganh(record)
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
  } = useForm<FormChuyenNganh>()

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<FormChuyenNganh>()

  useEffect(() => {
    if (selectedChuyenNganh) {
      resetEdit({
        id: selectedChuyenNganh.id,
        tenChuyenNganh: selectedChuyenNganh?.tenChuyenNganh,
        mota: selectedChuyenNganh?.mota,
        status: selectedChuyenNganh?.status
      })
    }
  }, [selectedChuyenNganh, resetEdit])

  const deleteChuyenNganhMụtation = useMutation({
    mutationFn: (id: number) => chuyennganhApi.deleteChuyenNganh(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chuyennganh'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const updateChuyenNganhMutation = useMutation({
    mutationFn: (body: FormChuyenNganh) => chuyennganhApi.updateChuyenNganh(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chuyennganh'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại'
      })
    }
  })
  const createChuyenNganhMutation = useMutation({
    mutationFn: (body: FormChuyenNganh) => chuyennganhApi.addChuyenNganh(body),
    onSuccess: (data) => {
      resetAdd({
        tenChuyenNganh: '',
        mota: '',
        status: true
      })
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['chuyennganh'] })
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
    updateChuyenNganhMutation.mutate(data)
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    console.log(data)
    createChuyenNganhMutation.mutate(data)
  })

  const columns: ColumnsType<FormChuyenNganh> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên chuyên ngành',
      dataIndex: 'tenChuyenNganh',
      key: 'tenChuyenNganh'
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'mota',
      width: 450
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: FormChuyenNganh) => (
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
      render: (_, record: FormChuyenNganh) => (
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
    queryKey: ['chuyennganh'],
    queryFn: chuyennganhApi.getChuyenNganh
  })
  console.log(data)

  return (
    <div>
      <Helmet>
        <title>Danh sách chuyên ngành</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách chuyên ngành</h2>
      <Table
        columns={columns}
        dataSource={data?.data.data}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
          position: ['bottomLeft']
        }}
      />
      <Modal centered title="Chỉnh sửa chuyên ngành" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="space-y-4 w-full" noValidate onSubmit={onEditSubmit}>
          <div>
            <label className="block font-medium mb-1">ID</label>
            <input
              type="text"
              readOnly
              disabled
              placeholder="ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('id', { required: 'Tên không được để trống' })}
            />

            <label className="block font-medium mb-1">Tên chuyên ngành</label>
            <input
              type="text"
              placeholder="Nhập tên chuyên ngành"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('tenChuyenNganh', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.tenChuyenNganh && (
              <p className="text-red-500 text-sm mt-2">{errorsEdit.tenChuyenNganh.message}</p>
            )}
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
      <Modal centered title="Thêm chuyên ngành" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        {' '}
        <form onSubmit={onAddSubmit} className="space-y-4 w-full" noValidate>
          <div>
            <label className="block font-medium mb-1">Tên chuyên ngành</label>
            <input
              type="text"
              placeholder="Nhập tên chuyên ngành"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('tenChuyenNganh', { required: 'Tên không được để trống' })}
            />
            {errorsAdd.tenChuyenNganh && (
              <p className="text-red-500 text-sm mt-2">{errorsAdd.tenChuyenNganh.message}</p>
            )}
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
      <Tooltip title="Thêm chuyên ngành" open>
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
