import { useForm } from 'react-hook-form'
import { FormData, rules } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import { Helmet } from 'react-helmet-async'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function Login() {
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body),
    onSuccess: (data) => {
      if (data?.data?.status !== 200) {
        setLoginError(data?.data?.message || 'Đăng nhập thất bại')
        return
      }
      setIsAuthenticated(true)
      navigate('/')
      toast.success('Đăng nhập thành công')
    },
    onError: (error) => {
      toast.error('Đăng nhập thất bại')
      console.error(error)
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data)
  })

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="flex items-center justify-center bg-gray-50 py-20">
        <div className="bg-white p-8 rounded-xl shadow-md w-[420px] border border-[#e0e6ed]">
          <h2 className="text-2xl font-bold text-center text-gray-800">Đăng nhập tài khoản</h2>
          <p className="text-center text-sm text-gray-500 mt-1">Xin mời bạn nhập thông tin.</p>

          {/* Google button */}
          <button className="flex items-center justify-center w-full mt-6 px-4 py-2 border border-gray-200 rounded-md hover:shadow transition shadow-lg">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            <span className="text-sm">Đăng nhập bằng Google</span>
          </button>

          {/* Login Form */}
          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Tài khoản
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <i className="fas fa-user" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('email', rules.email)}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <i className="fas fa-lock" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  aria-label="Mật khẩu"
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('password', rules.password)}
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập.
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow-sm shadow-blue-500 transition duration-200 transform hover:-translate-y-0.5 hover:shadow-none ${
                loginMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
              {loginMutation.isPending ? (
                <div className="flex justify-center items-center">
                  <Spin indicator={<LoadingOutlined spin />} />
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
