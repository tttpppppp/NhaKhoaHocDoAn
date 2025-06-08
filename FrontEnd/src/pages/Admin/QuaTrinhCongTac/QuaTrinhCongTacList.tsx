import { Button, DatePicker, FloatButton, message, Modal, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { QuaTrinhCongTacResponse } from '../../../types/scientist.type'
import quaTrinhCongTacApi from '../../../apis/quatrinhcongtac.api'
import { Option } from 'antd/es/mentions'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'

export default function QuaTrinhCongTacList() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [selectedQuaTrinhCongTacid, setSelectedQuaTrinhCongTacid] = useState<string | null>(null)
  const [selectedQTCT, setSelectedQTCT] = useState<QuaTrinhCongTacResponse | null>(null)
  const { data } = useQuery({
    queryKey: ['quatrinhcongtac'],
    queryFn: quaTrinhCongTacApi.getAllQuaTrinhCongTac
  })
  const { data: detailQTCT } = useQuery({
    queryKey: ['detailQTCT', selectedQuaTrinhCongTacid],
    queryFn: () =>
      quaTrinhCongTacApi.getQuaTrinhCongTac(selectedQuaTrinhCongTacid ? Number(selectedQuaTrinhCongTacid) : 0),
    enabled: !!selectedQuaTrinhCongTacid
  })

  console.log('detailQTCT', detailQTCT?.data.data.chucDanhCongTac)

  const { data: dataForm } = useQuery({
    queryKey: ['dataform'],
    queryFn: quaTrinhCongTacApi.getDataFormCreate
  })
  useEffect(() => {
    if (detailQTCT) {
      setSelectedQTCT(detailQTCT.data.data)
    }
  }, [detailQTCT])

  function parseDDMMYYYY(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split('/')
    if (!day || !month || !year) return null
    return new Date(`${year}-${month}-${day}`)
  }

  const showModal = (record: QuaTrinhCongTacResponse) => {
    setSelectedQuaTrinhCongTacid(String(record.id) ? String(record.id) : null)
    setIsModalOpen(true)
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
    control: controllEdit,
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit }
  } = useForm<QuaTrinhCongTacResponse>()

  const {
    control: controllAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd }
  } = useForm<QuaTrinhCongTacResponse>()

  useEffect(() => {
    if (selectedQTCT) {
      resetEdit({
        chucDanhCongTac: selectedQTCT.chucDanhCongTac ? String(selectedQTCT.chucDanhCongTac) : '',
        coQuanCongTac: selectedQTCT.coQuanCongTac ? String(selectedQTCT.coQuanCongTac) : '',
        denNam: selectedQTCT.denNam ? moment(selectedQTCT.denNam) : null,
        id: selectedQTCT.id,
        nhakhoahoc: String(selectedQTCT.nhakhoahoc) || '',
        tuNam: selectedQTCT.tuNam ? moment(selectedQTCT.tuNam) : null,
        chucVu: selectedQTCT.chucVu ? String(selectedQTCT.chucVu) : '',
        status: selectedQTCT.status ? 'true' : 'false'
      })
    }
  }, [selectedQTCT, resetEdit])

  const deleteQTCTMụtation = useMutation({
    mutationFn: (id: number) => quaTrinhCongTacApi.deleteQuaTrinhCongTac(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['quatrinhcongtac'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const updateQTCTMutation = useMutation({
    mutationFn: (body: QuaTrinhCongTacResponse) => quaTrinhCongTacApi.updateQuaTrinhCongTac(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['quatrinhcongtac'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại'
      })
    }
  })
  const createQuaTrinhCongTacMutation = useMutation({
    mutationFn: (body: QuaTrinhCongTacResponse) => quaTrinhCongTacApi.createQuaTrinhDaoTao(body),
    onSuccess: (data) => {
      resetAdd({})
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['quatrinhcongtac'] })
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
    deleteQTCTMụtation.mutate(id)
  }
  const onEditSubmit = handleSubmitEdit((data) => {
    updateQTCTMutation.mutate(data)
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    createQuaTrinhCongTacMutation.mutate(data)
  })

  const columns: ColumnsType<QuaTrinhCongTacResponse> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên nhà khoa học',
      dataIndex: 'fullname',
      key: 'fullname'
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'chuyenNganh',
      key: 'chuyenNganh'
    },
    {
      title: 'Từ năm',
      dataIndex: 'tuNam',
      key: 'tuNam'
    },
    {
      title: 'Đến năm',
      dataIndex: 'denNam',
      key: 'denNam'
    },
    {
      title: 'Chức danh công tác',
      dataIndex: 'chucDanhCongTac',
      key: 'chucDanhCongTac'
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      key: 'chucVu'
    },
    {
      title: 'Cơ quan công tác',
      dataIndex: 'coQuanCongTac',
      key: 'coQuanCongTac'
    },
    {
      title: 'Thời gian hoàn thành',
      dataIndex: 'thoigianhientai',
      key: 'thoigianhientai',
      render: (_, record: QuaTrinhCongTacResponse) => {
        const currentYear = new Date().getFullYear()

        let endYear: number | null = null
        if (record.denNam) {
          const parsedDate = parseDDMMYYYY(record.denNam)
          if (parsedDate && !isNaN(parsedDate.getTime())) {
            endYear = parsedDate.getFullYear()
          }
        }

        let statusText = 'Không rõ'
        let color: 'default' | 'green' | 'volcano' = 'default'

        if (endYear !== null) {
          if (endYear < currentYear) {
            statusText = 'Hoàn thành'
            color = 'volcano'
          } else {
            statusText = 'Đang công tác'
            color = 'green'
          }
        }

        return (
          <Space size="middle">
            <Tag className="uppercase" color={color}>
              {statusText}
            </Tag>
          </Space>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: QuaTrinhCongTacResponse) => {
        const statusText = record.status ? 'Hoạt động' : 'Không hoạt động'
        const color = record.status ? 'green' : 'volcano'
        return (
          <Space size="middle">
            <Tag className="uppercase" color={color}>
              {statusText}
            </Tag>
          </Space>
        )
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: QuaTrinhCongTacResponse) => (
        <Space size="middle">
          <Button color="yellow" variant="solid" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn quá trình này?"
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

  return (
    <div>
      <Helmet>
        <title>Danh sách quá trình công tác</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách quá trình công tác</h2>
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
      <Modal
        centered
        title="Chỉnh sửa quá trình công tác"
        open={isModalOpen}
        onOk={onEditSubmit}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy">
        <form className="space-y-4 w-full" onSubmit={onEditSubmit}>
          {/* Cơ quan công tác */}
          <label className="block text-sm font-medium">Cơ quan công tác</label>
          <Controller
            name="coQuanCongTac"
            control={controllEdit}
            rules={{ required: 'Vui lòng chọn cơ quan công tác' }}
            render={({ field }) => (
              <Select {...field} placeholder="Chọn cơ quan công tác" style={{ width: '100%' }}>
                {dataForm?.data.data.coQuanCongTacResponse.map((item) => (
                  <Option key={item.id} value={String(item.id)}>
                    {item.tenCoQuan}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errorsEdit.coQuanCongTac && <p className="text-red-500">{errorsEdit.coQuanCongTac.message}</p>}

          {/* Chức danh công tác */}
          <label className="block text-sm font-medium">Chức danh công tác</label>
          <Controller
            name="chucDanhCongTac"
            control={controllEdit}
            rules={{ required: 'Vui lòng chọn chức danh công tác' }}
            render={({ field }) => (
              <Select {...field} placeholder="Chức danh công tác" style={{ width: '100%' }}>
                {dataForm?.data.data.chucDanhCongTacResponse.map((item) => (
                  <Option key={item.id} value={String(item.id)}>
                    {item.tenChucDanhCongTac}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errorsEdit.chucDanhCongTac && <p className="text-red-500">{errorsEdit.chucDanhCongTac.message}</p>}

          {/* Chức vụ công tác */}
          <label className="block text-sm font-medium">Chức vụ công tác</label>
          <Controller
            name="chucVu"
            control={controllEdit}
            rules={{ required: 'Vui lòng chọn chức vụ công tác' }}
            render={({ field }) => (
              <Select {...field} placeholder="Chức vụ công tác" style={{ width: '100%' }}>
                {dataForm?.data.data.chucVuResponse.map((item) => (
                  <Option key={item.id} value={String(item.id)}>
                    {item.tenChucVu}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errorsEdit.chucVu && <p className="text-red-500">{errorsEdit.chucVu.message}</p>}

          {/* Từ năm */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Từ năm</label>
            <Controller
              name="tuNam"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn ngày' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? moment(field.value) : null}
                />
              )}
            />
            {errorsEdit.tuNam && <p className="text-red-500 text-sm mt-2">{errorsEdit.tuNam.message}</p>}
          </div>

          {/* Đến năm */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Đến năm</label>
            <Controller
              name="denNam"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn ngày' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? moment(field.value) : null}
                />
              )}
            />
            {errorsEdit.denNam && <p className="text-red-500 text-sm mt-2">{errorsEdit.denNam.message}</p>}
          </div>

          {/* Nhà khoa học */}
          <label className="block text-sm font-medium text-gray-700">Nhà khoa học</label>
          <Controller
            name="nhakhoahoc"
            control={controllEdit}
            rules={{ required: 'Vui lòng chọn nhà khoa học' }}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                filterOption={(input, option) => String(option.value) === input.trim()}
                placeholder="Chọn nhà khoa học"
                allowClear
                style={{ width: '100%' }}>
                {dataForm?.data.data.nhaKhoaHocFormResponse.map((item) => (
                  <Option key={String(item.id)} value={String(item.id)}>
                    {item.fullname}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errorsEdit.nhakhoahoc && <p className="text-red-500 text-sm mt-2">{errorsEdit.nhakhoahoc.message}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <Controller
              name="status"
              control={controllEdit}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn trạng thái" style={{ width: '100%' }}>
                  <Option value="true">Hoạt động</Option>
                  <Option value="false">Không hoạt động</Option>
                </Select>
              )}
            />
            {errorsEdit.status && <p className="text-red-500 text-sm mt-2">{errorsEdit.status.message}</p>}
          </div>
        </form>
      </Modal>

      <Modal
        centered
        title="Thêm quá trình công tác"
        open={isModalOpenAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}>
        {' '}
        <form className="space-y-4 w-full" noValidate onSubmit={onAddSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cơ quan công tác</label>
            <Controller
              name="coQuanCongTac"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn cơ quan công tác' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn cơ quan công tác" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.coQuanCongTacResponse.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.tenCoQuan}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.coQuanCongTac && <p className="text-red-500 text-sm mt-2">{errorsAdd.coQuanCongTac.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức danh công tác</label>
            <Controller
              name="chucDanhCongTac"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn chức danh công tác' }}
              render={({ field }) => (
                <Select {...field} placeholder="chọn chức danh công tác" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chucDanhCongTacResponse.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.tenChucDanhCongTac}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.chucDanhCongTac && (
              <p className="text-red-500 text-sm mt-2">{errorsAdd.chucDanhCongTac.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức vụ</label>
            <Controller
              name="chucVu"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn chức vụ' }}
              render={({ field }) => (
                <Select {...field} placeholder="chọn chức vụ" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chucVuResponse.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.tenChucVu}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.chucVu && <p className="text-red-500 text-sm mt-2">{errorsAdd.chucVu.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Từ năm</label>
            <Controller
              name="tuNam"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn ngày' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value}
                />
              )}
            />
            {errorsAdd.tuNam && <p className="text-red-500 text-sm mt-2">{errorsAdd.tuNam.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Đến năm</label>
            <Controller
              name="denNam"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn ngày' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  onChange={(date) => field.onChange(date)}
                  value={field.value}
                />
              )}
            />
            {errorsAdd.denNam && <p className="text-red-500 text-sm mt-2">{errorsAdd.denNam.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nhà khoa học</label>
            <Controller
              name="nhakhoahoc"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn nhà khoa học' }}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  filterOption={(input, option) => option?.props.value.toLowerCase().includes(input.toLowerCase())}
                  placeholder="Chọn nhà khoa học"
                  allowClear
                  style={{ width: '100%' }}>
                  {dataForm?.data.data.nhaKhoaHocFormResponse.map((item) => (
                    <Option key={String(item.id)} value={String(item.id)}>
                      {item.fullname}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.chucVu && <p className="text-red-500 text-sm mt-2">{errorsAdd.chucVu.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Thêm
          </button>
        </form>
      </Modal>
      <Tooltip title="Thêm quá trình" open>
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
