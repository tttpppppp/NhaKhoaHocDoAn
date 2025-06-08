import { Link, useLocation, useNavigate } from 'react-router-dom'
import { menu } from '../../constants'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { logoutAccount } from '../../apis/auth.api'
import { UserContext } from '../../contexts/user.context'
import { useTranslation } from 'react-i18next'
import { locales } from '../../i18n/i18n'
import { Dropdown, Space, Menu } from 'antd'

export default function Header() {
  const { i18n, t } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      toast.success('Đăng xuất thành công')
      navigate('/')
    },
    onError: (error) => {
      toast.error('Đăng xuất thất bại')
      console.error(error)
    }
  })
  const logout = () => {
    logoutMutation.mutate()
  }
  const pathname = useLocation().pathname
  const getBasePath = (url: string) => url.split('?')[0]

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
  const itemsLang = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => changeLanguage('vi')}>Tiếng việt</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={() => changeLanguage('en')}>Tiếng anh</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  )

  return (
    <div>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-5 px-4">
          <div className="flex items-center gap-4">
            <Link to={'/'} className="flex items-center gap-2">
              <img
                src="https://ntu.edu.vn/Portals/6/ntu.edu.vn.png?ver=ckjn5juE3seliaBQFD_5vA%3d%3d"
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div>
              <p className="text-2xl font-bold text-[#202C45] uppercase">
                CSDL {t('Science')} {t('Science2')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-[#202C45] border-b-2 border-[#F2184F]">
        <div className="max-w-7xl mx-auto p-4">
          <ul className="flex flex-wrap justify-center md:justify-start items-center text-white gap-4 py-3 text-sm">
            {menu.map((item, index) => (
              <li key={index} className="hover:text-[#F2184F] transition">
                <Link
                  to={item.path}
                  className={`${
                    pathname === '/' && item.path === '/'
                      ? 'bg-[#F2184F] px-4 py-2 rounded-md text-white'
                      : pathname.includes(getBasePath(item.path)) && item.path !== '/'
                        ? 'bg-[#F2184F] px-4 py-2 rounded-md text-white'
                        : ''
                  }`}>
                  {item.name}
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <li className="ml-auto relative">
                <Dropdown overlay={items} trigger={['hover']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Xin chào, <span className="font-semibold cursor-pointer">{user?.email || 'Người dùng'}</span>
                    </Space>
                  </a>
                </Dropdown>
              </li>
            ) : (
              <div className="ml-auto flex items-center gap-5 cursor-pointer">
                <li className="relative">
                  <Dropdown overlay={itemsLang} overlayStyle={{ width: '130px' }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <i className="fa-solid fa-earth-americas text-xs"></i>
                        {currentLanguage}
                      </Space>
                    </a>
                  </Dropdown>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="bg-[#F2184F] text-white px-5 py-2 rounded-full text-sm hover:bg-pink-700 transition">
                    Đăng nhập
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}
