import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Scientist from './pages/Scientist'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import DetailScientist from './pages/DetailScientist/DetailScientist'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Admin'
import MainLayoutAdmin from './layouts/MainLayoutAdmin'
import ChuyenNganhList from './pages/Admin/ChuyenNganh/ChuyenNganhList'
import Forbidden from './pages/Forbbiden'
import { UserContext } from './contexts/user.context'
import DonViQuanLyList from './pages/Admin/DonViQuanLy/DonViQuanLyList'
import ChucDanhList from './pages/Admin/ChucDanh/ChucDanhList'
import HocViList from './pages/Admin/HocVi/HocViList'
import NgachList from './pages/Admin/Ngach/NgachList'
import ListScientist from './pages/Admin/Scientist/ListScientist'
import QuaTrinhCongTacList from './pages/Admin/QuaTrinhCongTac/QuaTrinhCongTacList'
import QuaTrinhDaoTaoList from './pages/Admin/QuaTrinhDaTao/QuaTrinhDaoTaoList'
import NhaKhoaHocDetail from './pages/Admin/NhaKhoaHocDetail/NhaKhoaHocDetail'
import BaiBaoList from './pages/Admin/BaiBao/BaiBaoList'
import DanhSachBaiBao from './pages/BaiBao/DanhSachBaiBao'
import ChiTiietBaiBao from './pages/Admin/DetailBaiBao/ChiTietBaiBao'

export default function useRouteElement() {
  const { isAuthenticated } = useContext(AppContext)
  const { user } = useContext(UserContext)
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }
  function RejectRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
  }
  function RejectRouteAdmin() {
    if (isAuthenticated) {
      if (user?.role == '[USER]') {
        return <Navigate to="/forbbiden" />
      }
      return <Outlet />
    } else {
      return <Navigate to="/login" />
    }
  }
  const routeElement = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/scientists',
          element: (
            <MainLayout>
              <Scientist />
            </MainLayout>
          )
        },
        {
          path: '/scientists/detail/:id',
          element: (
            <MainLayout>
              <DetailScientist />
            </MainLayout>
          )
        },
        {
          path: '/articles',
          element: (
            <MainLayout>
              <DanhSachBaiBao />
            </MainLayout>
          )
        },
        {
          path: '/article/detail/:id',
          element: (
            <MainLayout>
              <ChiTiietBaiBao />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectRoute />,
      children: [
        {
          path: '/login',
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          )
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectRouteAdmin />,
      children: [
        {
          path: '/dashboard',
          element: (
            <MainLayoutAdmin>
              <Dashboard />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/chuyennganh/list',
          element: (
            <MainLayoutAdmin>
              <ChuyenNganhList />
            </MainLayoutAdmin>
          )
        },

        {
          path: '/donviquanly/list',
          element: (
            <MainLayoutAdmin>
              <DonViQuanLyList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/hocvi/list',
          element: (
            <MainLayoutAdmin>
              <HocViList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/ngach/list',
          element: (
            <MainLayoutAdmin>
              <NgachList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/nhakhoahoc/list',
          element: (
            <MainLayoutAdmin>
              <ListScientist />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/nhakhoahoc/detail/:id',
          element: (
            <MainLayoutAdmin>
              <NhaKhoaHocDetail />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/chucdanh/list',
          element: (
            <MainLayoutAdmin>
              <ChucDanhList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/quatrinhcongtac/list',
          element: (
            <MainLayoutAdmin>
              <QuaTrinhCongTacList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/quatrinhdaotao/list',
          element: (
            <MainLayoutAdmin>
              <QuaTrinhDaoTaoList />
            </MainLayoutAdmin>
          )
        },
        {
          path: '/baibao/list',
          element: (
            <MainLayoutAdmin>
              <BaiBaoList />
            </MainLayoutAdmin>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    },
    {
      path: '/forbbiden',
      element: <Forbidden />
    }
  ])
  return routeElement
}
