import { useForm } from 'react-hook-form'
import { FormData, rules } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Login() {
  const [loginError, setloginError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => registerAccount(body),
    onSuccess: (data) => {
      if (data.data.status !== 201) {
        setloginError(data.data.message)
        return
      }
      navigate('/')
      toast.success('Đăng kí thành công')
      console.log(data)
    },
    onError: (error) => {
      toast.error('Đăng kí thất bại')
      console.error(error)
    }
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    loginMutation.mutate(data)
  })
  return (
    <div className="flex items-center justify-center bg-gray-50 py-20">
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <div className="bg-white p-8 rounded-xl shadow-md w-[420px] border border-[#e0e6ed]">
        <h2 className="text-2xl font-bold text-center text-gray-800">Đăng kí tài khoản</h2>
        <p className="text-center text-sm text-gray-500 mt-1">Xin mời bạn nhập thông tin.</p>

        {/* Google button */}
        <button className="flex items-center justify-center w-full mt-6 px-4 py-2 border border-gray-200 rounded-md  hover:shadow transition shadow-lg">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
          <span className="text-sm">Đăng nhập bằng Google</span>
        </button>

        {/* Login Form */}
        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-envelope" />
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('email', rules.email)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fullname</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-id-card" />
              </span>
              <input
                type="text"
                placeholder="Fullname"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('fullname', rules.fullname)}
              />
            </div>
            {errors.fullname && <p className="text-red-500 text-sm mt-2">{errors.fullname.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-phone" />
              </span>
              <input
                type="text"
                placeholder="Mobile"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('mobile', rules.mobile)}
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-lock" />
              </span>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('password', rules.password)}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                <i className="fas fa-eye" />
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow-sm shadow-blue-500 transition duration-200 transform hover:-translate-y-0.5 hover:shadow-none">
            Đăng kí
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Đăng nhập ngay?{' '}
          <Link to={'/login'} className="text-blue-600 font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
