import { Button, FloatButton, message, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HocViResponse } from '../../../types/scientist.type'
import hocViApi from '../../../apis/hocvi.api'
import { Helmet } from 'react-helmet-async'

export default function HocViList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedHocVi, setSelectedHocVi] = useState<HocViResponse | null>(null)
  const showModal = (record: HocViResponse) => {
    setSelectedHocVi(record)
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
  } = useForm<HocViResponse>()

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<HocViResponse>()

  useEffect(() => {
    if (selectedHocVi) {
      resetEdit({
        hocViId: selectedHocVi.hocViId,
        tenHocVi: selectedHocVi.tenHocVi,
        mota: selectedHocVi.mota,
        status: selectedHocVi.status
      })
    }
  }, [selectedHocVi, resetEdit])

  const deleteHocViMụtation = useMutation({
    mutationFn: (id: number) => hocViApi.deleteHocVi(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['hocvi'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const updateHocViMutation = useMutation({
    mutationFn: (body: HocViResponse) => hocViApi.updateHocVi(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['hocvi'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại'
      })
    }
  })
  const createHocViMutation = useMutation({
    mutationFn: (body: HocViResponse) => hocViApi.addHocVi(body),
    onSuccess: (data) => {
      resetAdd({
        tenHocVi: '',
        mota: '',
        status: true
      })
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['hocvi'] })
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
    deleteHocViMụtation.mutate(id)
  }
  const onEditSubmit = handleSubmitEdit((data) => {
    updateHocViMutation.mutate(data)
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    createHocViMutation.mutate(data)
  })

  const columns: ColumnsType<HocViResponse> = [
    {
      title: '#',
      dataIndex: 'hocViId',
      key: 'hocViId'
    },
    {
      title: 'Tên học vị',
      dataIndex: 'tenHocVi',
      key: 'tenDonVi'
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'mota'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: HocViResponse) => (
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
      render: (_, record: HocViResponse) => (
        <Space size="middle">
          <Button color="yellow" variant="solid" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn xóa đơn vị này?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.hocViId)}>
            <Button color="danger" variant="solid">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const { data } = useQuery({
    queryKey: ['hocvi'],
    queryFn: hocViApi.getHocVi
  })
  console.log(data)

  return (
    <div>
      <Helmet>
        <title>Danh sách học vị</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách học vị</h2>
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
      <Modal centered title="Chỉnh sửa học vị" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="space-y-4 w-full" noValidate onSubmit={onEditSubmit}>
          <div>
            <label className="block font-medium mb-1">ID</label>
            <input
              type="text"
              readOnly
              disabled
              placeholder="ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('hocViId', { required: 'Tên không được để trống' })}
            />

            <label className="block font-medium mb-1">Tên đơn vị</label>
            <input
              type="text"
              placeholder="Nhập tên học vị"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('tenHocVi', { required: 'Tên không được để trống' })}
            />
            {errorsEdit.tenHocVi && <p className="text-red-500 text-sm mt-2">{errorsEdit.tenHocVi.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <input
              type="text"
              placeholder="Nhập mô tả"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerEdit('mota', { required: 'Tên không được để trống' })}
            />
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
      <Modal centered title="Thêm học vị" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        {' '}
        <form className="space-y-4 w-full" noValidate onSubmit={onAddSubmit}>
          <div>
            <label className="block font-medium mb-1">Tên học vị</label>
            <input
              type="text"
              placeholder="Nhập tên học vị"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('tenHocVi', { required: 'Tên không được để trống' })}
            />
            {errorsAdd.tenHocVi && <p className="text-red-500 text-sm mt-2">{errorsAdd.tenHocVi.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <input
              type="text"
              placeholder="Nhập số mô tả"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...registerAdd('mota', { required: 'Số điện thoại không được để trống' })}
            />
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
            Thêm
          </button>
        </form>
      </Modal>
      <Tooltip title="Thêm học vị" open>
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
