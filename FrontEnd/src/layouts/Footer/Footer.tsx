export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 py-20">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Thông tin liên hệ</h3>
          <p className="flex items-start gap-2 text-sm">
            <i className="fas fa-map-marker-alt text-red-500"></i>
            Ban Khoa học, Công nghệ và Quan hệ Quốc tế - Đại học Nha Trang. 02 Nguyễn Đình Chiểu, phường Vĩnh Thọ, Nha
            Trang, Khánh Hòa
          </p>
          <p className="flex items-center gap-2 text-sm">
            <i className="fas fa-phone-alt text-red-500"></i>
            0234 384 5799
          </p>
          <p className="flex items-center gap-2 text-sm">
            <i className="fas fa-user-cog text-red-500"></i>
            Hỗ trợ kỹ thuật: Trần Tiến Phúc
          </p>
          <p className="flex items-center gap-2 text-sm">
            <i className="fas fa-mobile-alt text-red-500"></i>
            0914197152
          </p>
          <p className="flex items-center gap-2 text-sm">
            <i className="fas fa-envelope text-red-500"></i>
            despacitovv@gmal.com
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <img
            src="https://vnur.vn/wp-content/uploads/2024/01/logo-dai-hoc-nha-trang-inkythuatso-1-02-14-45-38.jpg"
            alt="Đại học Nha Trang"
            className="h-28 object-contain rounded-full"
          />
          <h2 className="text-xl font-bold">ĐẠI HỌC NHA TRANG</h2>
          <p className="text-sm tracking-wider">NHA TRANG UNIVERSITY</p>
        </div>
      </div>
      <div className="mt-10 text-sm text-gray-400 bg-[#333333] py-5">
        <div className="max-w-7xl mx-auto text-xs text-center">Bản quyền thuộc Đại học Nha Trang © 2025.</div>
      </div>
    </footer>
  )
}
