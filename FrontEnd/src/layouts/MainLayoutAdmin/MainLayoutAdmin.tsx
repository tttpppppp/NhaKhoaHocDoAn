import React, { useState, useMemo, useEffect, useContext } from 'react'
import { Dropdown, Layout, Menu, Space, Tag } from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ReadOutlined,
  BankOutlined,
  IdcardOutlined,
  ProfileOutlined,
  BookOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import { UserContext } from '../../contexts/user.context'
import { AppContext } from '../../contexts/app.context'
import { logoutAccount } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}
export default function MainLayoutAdmin({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { user, setUser } = useContext(UserContext)
  const { setIsAuthenticated } = useContext(AppContext)
  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const menuItems = useMemo(
    () => [
      {
        key: '/dashboard',
        icon: <HomeOutlined />,
        label: 'Dashboard'
      },
      {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Nhà khoa học',
        children: [{ key: '/nhakhoahoc/list', label: 'Danh sách' }]
      },
      {
        key: 'sub2',
        icon: <BankOutlined />,
        label: 'Đơn vị quản lý',
        children: [{ key: '/donviquanly/list', label: 'Danh sách' }]
      },
      {
        key: 'sub3',
        icon: <ReadOutlined />,
        label: 'Chuyên ngành',
        children: [{ key: '/chuyennganh/list', label: 'Danh sách' }]
      },
      {
        key: 'sub4',
        icon: <IdcardOutlined />,
        label: 'Chức danh',
        children: [{ key: '/chucdanh/list', label: 'Danh sách' }]
      },
      {
        key: 'sub5',
        icon: <AppstoreOutlined />,
        label: 'Ngạch',
        children: [{ key: '/ngach/list', label: 'Danh sách' }]
      },
      {
        key: 'sub6',
        icon: <ProfileOutlined />,
        label: 'Học vị',
        children: [{ key: '/hocvi/list', label: 'Danh sách' }]
      },
      {
        key: 'sub7',
        icon: <ClockCircleOutlined />,
        label: 'Quá trình công tác',
        children: [{ key: '/quatrinhcongtac/list', label: 'Danh sách' }]
      },
      {
        key: 'sub8',
        icon: <BookOutlined />,
        label: 'Quá trình đào tạo',
        children: [{ key: '/quatrinhdaotao/list', label: 'Danh sách' }]
      },
      {
        key: 'sub9',
        icon: <BookOutlined />,
        label: 'Bài Báo',
        children: [{ key: '/baibao/list', label: 'Danh sách' }]
      }
    ],
    []
  )

  useEffect(() => {
    for (const item of menuItems) {
      if (item.children?.some((child) => child.key === location.pathname)) {
        setOpenKeys([item.key])
        return
      }
    }
    setOpenKeys([])
  }, [location.pathname, menuItems])
  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      toast.success('Đăng xuất thành công')
      navigate('/login')
    },
    onError: (error) => {
      toast.error('Đăng xuất thất bại')
      console.error(error)
    }
  })
  const logout = () => {
    logoutMutation.mutate()
  }
  const items = (
    <Menu>
      <Menu.Item key="0">
        <a>Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={logout}>Đăng xuất</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={256}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100
        }}>
        <div style={{ color: 'white', padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>
          <span className="text-primary uppercase text-xs">Manage Scientists</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: 256 }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 70
          }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Dashboard Overview</span>

          <Dropdown overlay={items} trigger={['hover']}>
            <a onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Space direction="vertical" style={{ textAlign: 'right', lineHeight: 1.2 }}>
                <Tag color={user?.role === '[ADMIN]' ? 'red' : 'blue'} style={{ textTransform: 'uppercase' }}>
                  {user?.role || 'Người dùng'}
                </Tag>

                <p className="mb-4 font-semibold">Xin chào, {user?.email || 'Người dùng'}</p>
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content style={{ margin: 16 }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Scientst ©{new Date().getFullYear()} Created by Trần Tiến Phúc</Footer>
      </Layout>
    </Layout>
  )
}
