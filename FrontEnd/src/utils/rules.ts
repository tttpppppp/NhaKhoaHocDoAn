import type { RegisterOptions } from 'react-hook-form'

export interface FormData {
  email: string
  fullname: string
  mobile: string
  password: string
  confirm_password: string
}
export interface FormChuyenNganh {
  id: number
  tenChuyenNganh: string
  mota: string
  status: boolean
}

type Rules = {
  [K in keyof FormData]?: RegisterOptions<FormData, K>
}

export const rules: Rules = {
  email: {
    required: 'Tài khoản không được để trống',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không hợp lệ' }
  },
  fullname: {
    required: 'Họ tên không được để trống',
    minLength: { value: 2, message: 'Họ tên tối thiểu 2 ký tự' }
  },
  mobile: {
    required: 'Số điện thoại không được để trống',
    pattern: { value: /^(0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' },
    minLength: { value: 10, message: 'Số điện thoại tối thiểu 10 ký tự' }
  },
  password: {
    required: 'Password không được để trống',
    pattern: { value: /[@!#$%^&*(),.?":{}|<>]/, message: 'Mật khẩu phải chứa ký tự đặc biệt' },
    minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
  }
}

// export const confirmPasswordRule = (getValues: () => any) => ({
//   required: 'Vui lòng nhập lại mật khẩu',
//   validate: (value: string) => value === getValues().password || 'Mật khẩu nhập lại không khớp'
// })
