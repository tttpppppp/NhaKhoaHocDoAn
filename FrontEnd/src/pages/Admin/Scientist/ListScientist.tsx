import {
  Avatar,
  Button,
  DatePicker,
  FloatButton,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Tag,
  Tooltip
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NhaKhoaHocFormDetailResponse, NhaKhoaHocHomeResponse } from '../../../types/scientist.type'
import scientistApi from '../../../apis/scientist.api'
import { Image } from 'antd'
import { Option } from 'antd/es/mentions'
import TextArea from 'antd/es/input/TextArea'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
export default function ListScientist() {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [isModalOpenAdd, setIsModalOpenadd] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  const [selectedNhaKhoaHocId, setSelectedNhaKhoaHocId] = useState<string | null>(null)
  const [selectedNhaKhaoHoc, setSelectedNhaKhoaHoc] = useState<NhaKhoaHocFormDetailResponse | null>(null)

  const { data: dataformDetail } = useQuery({
    queryKey: ['scientistsDetailForm', selectedNhaKhoaHocId],
    queryFn: () => {
      return scientistApi.getDetailScientistForm(selectedNhaKhoaHocId as string)
    },
    enabled: !!selectedNhaKhoaHocId
  })
  useEffect(() => {
    if (dataformDetail) {
      setSelectedNhaKhoaHoc(dataformDetail.data.data)
    }
  }, [dataformDetail])

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false)
  }
  const showModalEdit = (record: NhaKhoaHocHomeResponse) => {
    setSelectedNhaKhoaHocId(record.id.toString())
    setIsModalOpenEdit(true)
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
    handleSubmit: handleSubmitAdd,
    control: controllAdd,
    formState: { errors: errorsAdd }
  } = useForm<NhaKhoaHocHomeResponse>()

  const {
    handleSubmit: handleSubmitEdit,
    control: controllEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit }
  } = useForm<NhaKhoaHocFormDetailResponse>()

  useEffect(() => {
    if (selectedNhaKhaoHoc) {
      resetEdit({
        fullname: selectedNhaKhaoHoc.fullname,
        email: selectedNhaKhaoHoc.email,
        dienThoai: selectedNhaKhaoHoc.dienThoai,
        address: selectedNhaKhaoHoc.address,
        trinhDoNgoaiNgu: selectedNhaKhaoHoc.trinhDoNgoaiNgu,
        chucdanhId: selectedNhaKhaoHoc.chucdanhId ? String(selectedNhaKhaoHoc.chucdanhId) : '',
        chuyenNganhid: selectedNhaKhaoHoc.chuyenNganhid ? String(selectedNhaKhaoHoc.chuyenNganhid) : '',
        donViId: selectedNhaKhaoHoc.donViId ? String(selectedNhaKhaoHoc.donViId) : '',
        ngachid: selectedNhaKhaoHoc.ngachid ? String(selectedNhaKhaoHoc.ngachid) : '',
        hocviId: selectedNhaKhaoHoc.hocviId ? String(selectedNhaKhaoHoc.hocviId) : '',
        image: selectedNhaKhaoHoc.image || '',
        status: selectedNhaKhaoHoc.status == 1 ? 'true' : 'false',
        chuyenMonGiangDay: selectedNhaKhaoHoc.chuyenMonGiangDay,
        gioiTinh: selectedNhaKhaoHoc.gioiTinh || '',
        linhVucIds: selectedNhaKhaoHoc.linhVucIds.map((item) => String(item)),
        ngaySinh: selectedNhaKhaoHoc.ngaySinh ? moment(selectedNhaKhaoHoc.ngaySinh) : null
      })
    }
  }, [selectedNhaKhaoHoc, resetEdit])

  const createNhaKhoaHoc = useMutation({
    mutationFn: (body: NhaKhoaHocHomeResponse) => scientistApi.addNhaKhoaHoc(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['nhakhoahoc'] })
    },
    onError: (error) => {
      console.log(error)

      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại'
      })
    }
  })
  const updateNhaKhoaHoc = useMutation({
    mutationFn: (body: NhaKhoaHocFormDetailResponse) => scientistApi.updateNhaKhoaHoc(body),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['nhakhoahoc'] })
    },
    onError: (error) => {
      console.log(error)

      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại'
      })
    }
  })
  const deleteNhakHoaHoc = useMutation({
    mutationFn: (id: number) => scientistApi.deleteNhaKhoaHoc(id),
    onSuccess: (data) => {
      messageApi.open({
        type: 'success',
        content: `${data.data.message}`
      })
      queryClient.invalidateQueries({ queryKey: ['nhakhoahoc'] })
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại'
      })
    }
  })
  const onAddSubmit = handleSubmitAdd((data) => {
    createNhaKhoaHoc.mutate(data)
    console.log(data)
  })

  const onSubmitEdit = handleSubmitEdit((data) => {
    const dataOb = { ...data, id: selectedNhaKhoaHocId }
    console.log(dataOb)

    updateNhaKhoaHoc.mutate(dataOb as NhaKhoaHocFormDetailResponse)
  })
  const handleDelete = (id: number) => {
    deleteNhakHoaHoc.mutate(id)
  }

  const columns: ColumnsType<NhaKhoaHocHomeResponse> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',

      render: (image: string) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {image ? (
            <Image.PreviewGroup
              items={[
                image,
                'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
                'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
              ]}>
              <Image width={100} src={image} />
            </Image.PreviewGroup>
          ) : (
            <Avatar size={64} icon={<UserOutlined />} />
          )}
        </div>
      )
    },

    {
      title: 'Tên nhà khoa học',
      dataIndex: 'fullname',
      key: 'fullname',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Tìm kiếm tên nhà khoa học"
            value={selectedKeys[0]}
            onChange={(e) => {
              const value = e.target.value
              setSelectedKeys(value ? [value] : [])
              confirm({ closeDropdown: false })
            }}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) => record.fullname.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'chuyenNganh',
      key: 'chuyenNganh'
    },
    {
      title: 'Chức danh',
      dataIndex: 'chucdanh',
      key: 'dienthoai'
    },
    {
      title: 'Ngành đào tạo',
      dataIndex: 'nganhDaoTao',
      key: 'diachi'
    },
    {
      title: 'Đơn vị quản lý',
      dataIndex: 'tenDonVi',
      key: 'tenDonVi'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: NhaKhoaHocHomeResponse) => (
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
      render: (_, record: NhaKhoaHocHomeResponse) => (
        <Space size="middle">
          <Link to={`/nhakhoahoc/detail/${record.id}`}>
            <Button color="blue" variant="solid">
              <EyeOutlined />
            </Button>
          </Link>
          <Button color="yellow" variant="solid" onClick={() => showModalEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Xóa chức danh"
            description="Bạn có muốn xóa nhà khoa học này?"
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
    queryKey: ['nhakhoahoc'],
    queryFn: () => {
      return scientistApi.getallScientistsAdmin()
    }
  })
  const { data: dataForm } = useQuery({
    queryKey: ['dataform'],
    queryFn: () => {
      return scientistApi.getDataFormAdmin()
    }
  })

  return (
    <div>
      <Helmet>
        <title>Danh sách nhà khoa học</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-xl font-bold mb-4 text-center uppercase">Danh sách nhà khoa học</h2>
      <Table
        columns={columns}
        dataSource={data?.data.data.nhaKhoaHocHomeResponses}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          position: ['bottomLeft']
        }}
      />
      <Modal
        centered
        width={700}
        title="Thêm nhà khoa học"
        open={isModalOpenAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}>
        <form onSubmit={onAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <Controller
              name="fullname"
              control={controllAdd}
              rules={{ required: 'Họ tên là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập họ tên" style={{ width: '100%' }} />}
            />
            {errorsAdd.fullname && <p className="text-red-500 text-sm mt-2">{errorsAdd.fullname.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={controllAdd}
              rules={{ required: 'Email là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập email" style={{ width: '100%' }} />}
            />
            {errorsAdd.email && <p className="text-red-500 text-sm mt-2">{errorsAdd.email.message}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Điện thoại</label>
            <Controller
              name="dienthoai"
              control={controllAdd}
              rules={{ required: 'Số điện thoại là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập số điện thoại" style={{ width: '100%' }} />}
            />
            {errorsAdd.dienthoai && <p className="text-red-500 text-sm mt-2">{errorsAdd.dienthoai.message}</p>}
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <Controller
              name="diachi"
              control={controllAdd}
              rules={{ required: 'Địa chỉ là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập địa chỉ" style={{ width: '100%' }} />}
            />
            {errorsAdd.diachi && <p className="text-red-500 text-sm mt-2">{errorsAdd.diachi.message}</p>}
          </div>

          {/* Trình độ ngoại ngữ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trình độ ngoại ngữ</label>
            <Controller
              name="trinhdongoaingu"
              control={controllAdd}
              rules={{ required: 'Trình độ ngoại ngữ là bắt buộc' }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập trình độ ngoại ngữ" style={{ width: '100%' }} />
              )}
            />
            {errorsAdd.trinhdongoaingu && (
              <p className="text-red-500 text-sm mt-2">{errorsAdd.trinhdongoaingu.message}</p>
            )}
          </div>

          {/* Các Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức danh</label>
            <Controller
              name="chucdanh"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn chức danh' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn chức danh" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chucDanhResponses.map((item) => (
                    <Option key={item.chucDanhId} value={String(item.chucDanhId)}>
                      {item.tenChucDanh}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.chucdanh && <p className="text-red-500 text-sm mt-2">{errorsAdd.chucdanh.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
            <Controller
              name="chuyenNganh"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn chuyên ngành' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn chuyên ngành" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chuyenNganhResponses.map((item) => (
                    <Option key={item.id} value={String(item.id)}>
                      {item.tenChuyenNganh}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.chuyenNganh && <p className="text-red-500 text-sm mt-2">{errorsAdd.chuyenNganh.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Đơn vị quản lý</label>
            <Controller
              name="tenDonVi"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn đơn vị' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn đơn vị" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.donViResponses.map((item) => (
                    <Option key={item.donViId} value={String(item.donViId)}>
                      {item.tenDonVi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.tenDonVi && <p className="text-red-500 text-sm mt-2">{errorsAdd.tenDonVi.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lĩnh vực nghiên cứu</label>
            <Controller
              name="linhVucNghienCuu"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn lĩnh vực nghiên cứu' }}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Chọn lĩnh vực nghiên cứu">
                  {dataForm?.data.data.linhVucNghienCuuResponses.map((item) => (
                    <Option key={item.id} value={String(item.id)}>
                      {item.tenLinhVuc}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.linhVucNghienCuu && (
              <p className="text-red-500 text-sm mt-2">{errorsAdd.linhVucNghienCuu.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ngạch</label>
            <Controller
              name="ngach"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn ngạch' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn ngạch" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.ngachRespionses.map((item) => (
                    <Option key={item.ngachId} value={String(item.ngachId)}>
                      {item.tenNgach}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.ngach && <p className="text-red-500 text-sm mt-2">{errorsAdd.ngach.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Học vị</label>
            <Controller
              name="hocvi"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn học vị' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn học vị" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.hocViResponses.map((item) => (
                    <Option key={item.hocViId} value={String(item.hocViId)}>
                      {item.tenHocVi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsAdd.hocvi && <p className="text-red-500 text-sm mt-2">{errorsAdd.hocvi.message}</p>}
          </div>

          {/* Ảnh đại diện */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (URL)</label>
            <Controller
              name="image"
              control={controllAdd}
              render={({ field }) => <Input {...field} placeholder="URL ảnh hoặc để trống" style={{ width: '100%' }} />}
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <Controller
              name="status"
              control={controllAdd}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn trạng thái" allowClear style={{ width: '100%' }}>
                  <Option value="true">Hoạt động</Option>
                  <Option value="false">Không hoạt động</Option>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <Controller
              name="ngaySinh"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn ngày sinh!' }}
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
          </div>

          {/* Chuyên môn giảng dạy */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Chuyên môn giảng dạy</label>
            <Controller
              name="chuyenmongiangday"
              control={controllAdd}
              rules={{ required: 'Vui lòng nhập chuyên môn giảng dạy' }}
              render={({ field }) => (
                <TextArea rows={3} {...field} placeholder="Nhập chuyên môn giảng dạy" style={{ width: '100%' }} />
              )}
            />
            {errorsAdd.chuyenmongiangday && (
              <p className="text-red-500 text-sm mt-2">{errorsAdd.chuyenmongiangday.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
            <Controller
              name="gioitinh"
              control={controllAdd}
              rules={{ required: 'Vui lòng chọn giới tính' }}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              )}
            />
            {errorsAdd.gioitinh && <p className="text-red-500 text-sm mt-2">{errorsAdd.gioitinh.message}</p>}
          </div>
          {/* Nút lưu */}
          <div className="md:col-span-2">
            <Button type="primary" htmlType="submit" block>
              Lưu thông tin
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        centered
        width={700}
        title="Chỉnh sửa nhà khoa học"
        open={isModalOpenEdit}
        onOk={handleCancelEdit}
        onCancel={handleCancelEdit}>
        <form onSubmit={onSubmitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <Controller
              name="fullname"
              control={controllEdit}
              rules={{ required: 'Họ tên là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập họ tên" style={{ width: '100%' }} />}
            />
            {errorsEdit.fullname && <p className="text-red-500 text-sm mt-2">{errorsEdit.fullname.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={controllEdit}
              rules={{ required: 'Email là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập email" style={{ width: '100%' }} />}
            />
            {errorsEdit.email && <p className="text-red-500 text-sm mt-2">{errorsEdit.email.message}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Điện thoại</label>
            <Controller
              name="dienThoai"
              control={controllEdit}
              rules={{ required: 'Số điện thoại là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập số điện thoại" style={{ width: '100%' }} />}
            />
            {errorsEdit.dienThoai && <p className="text-red-500 text-sm mt-2">{errorsEdit.dienThoai.message}</p>}
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <Controller
              name="address"
              control={controllEdit}
              rules={{ required: 'Địa chỉ là bắt buộc' }}
              render={({ field }) => <Input {...field} placeholder="Nhập địa chỉ" style={{ width: '100%' }} />}
            />
            {errorsEdit.address && <p className="text-red-500 text-sm mt-2">{errorsEdit.address.message}</p>}
          </div>

          {/* Trình độ ngoại ngữ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trình độ ngoại ngữ</label>
            <Controller
              name="trinhDoNgoaiNgu"
              control={controllEdit}
              rules={{ required: 'Trình độ ngoại ngữ là bắt buộc' }}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập trình độ ngoại ngữ" style={{ width: '100%' }} />
              )}
            />
            {errorsEdit.trinhDoNgoaiNgu && (
              <p className="text-red-500 text-sm mt-2">{errorsEdit.trinhDoNgoaiNgu.message}</p>
            )}
          </div>

          {/* Các Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức danh</label>
            <Controller
              name="chucdanhId"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn chức danh' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn chức danh" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chucDanhResponses.map((item) => (
                    <Option key={item.chucDanhId} value={String(item.chucDanhId)}>
                      {item.tenChucDanh}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.chucdanhId && <p className="text-red-500 text-sm mt-2">{errorsEdit.chucdanhId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
            <Controller
              name="chuyenNganhid"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn chuyên ngành' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn chuyên ngành" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.chuyenNganhResponses.map((item) => (
                    <Option key={item.id} value={String(item.id)}>
                      {item.tenChuyenNganh}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.chuyenNganhid && (
              <p className="text-red-500 text-sm mt-2">{errorsEdit.chuyenNganhid.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Đơn vị quản lý</label>
            <Controller
              name="donViId"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn đơn vị' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn đơn vị" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.donViResponses.map((item) => (
                    <Option key={item.donViId} value={String(item.donViId)}>
                      {item.tenDonVi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.donViId && <p className="text-red-500 text-sm mt-2">{errorsEdit.tenDonVi.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lĩnh vực nghiên cứu</label>
            <Controller
              name="linhVucIds"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn lĩnh vực nghiên cứu' }}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Chọn lĩnh vực nghiên cứu">
                  {dataForm?.data.data.linhVucNghienCuuResponses.map((item) => (
                    <Option key={item.id} value={String(item.id)}>
                      {item.tenLinhVuc}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.linhVucIds && <p className="text-red-500 text-sm mt-2">{errorsEdit.linhVucIds.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ngạch</label>
            <Controller
              name="ngachid"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn ngạch' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn ngạch" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.ngachRespionses.map((item) => (
                    <Option key={item.ngachId} value={String(item.ngachId)}>
                      {item.tenNgach}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.ngachid && <p className="text-red-500 text-sm mt-2">{errorsEdit.ngachid.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Học vị</label>
            <Controller
              name="hocviId"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn học vị' }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn học vị" allowClear style={{ width: '100%' }}>
                  {dataForm?.data.data.hocViResponses.map((item) => (
                    <Option key={item.hocViId} value={String(item.hocViId)}>
                      {item.tenHocVi}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errorsEdit.hocviId && <p className="text-red-500 text-sm mt-2">{errorsEdit.hocviId.message}</p>}
          </div>

          {/* Ảnh đại diện */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (URL)</label>
            <Controller
              name="image"
              control={controllEdit}
              render={({ field }) => <Input {...field} placeholder="URL ảnh hoặc để trống" style={{ width: '100%' }} />}
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <Controller
              name="status"
              control={controllEdit}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn trạng thái" allowClear style={{ width: '100%' }}>
                  <Option value="true">Hoạt động</Option>
                  <Option value="false">Không hoạt động</Option>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <Controller
              name="ngaySinh"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn ngày sinh!' }}
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
          </div>

          {/* Chuyên môn giảng dạy */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Chuyên môn giảng dạy</label>
            <Controller
              name="chuyenMonGiangDay"
              control={controllEdit}
              rules={{ required: 'Vui lòng nhập chuyên môn giảng dạy' }}
              render={({ field }) => (
                <TextArea rows={3} {...field} placeholder="Nhập chuyên môn giảng dạy" style={{ width: '100%' }} />
              )}
            />
            {errorsEdit.chuyenMonGiangDay && (
              <p className="text-red-500 text-sm mt-2">{errorsEdit.chuyenMonGiangDay.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
            <Controller
              name="gioiTinh"
              control={controllEdit}
              rules={{ required: 'Vui lòng chọn giới tính' }}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              )}
            />
            {errorsEdit.gioiTinh && <p className="text-red-500 text-sm mt-2">{errorsEdit.gioiTinh.message}</p>}
          </div>
          {/* Nút lưu */}
          <div className="md:col-span-2">
            <Button type="primary" htmlType="submit" block>
              Lưu thông tin
            </Button>
          </div>
        </form>
      </Modal>

      <Tooltip title="Thêm nhà khoa học" open>
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
