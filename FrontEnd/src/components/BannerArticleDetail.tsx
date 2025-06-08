export default function BannerArticleDetail() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative mb-20"
      style={{ backgroundImage: 'url("https://csdlkhoahoc.hueuni.edu.vn/csdl/images/bg5.jpg")' }}>
      <div className="bg-black bg-opacity-40 w-full h-full absolute inset-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-10 px-4 py-10 text-white">
        <div className="space-y-6 col-span-12 md:col-span-6 flex items-center flex-col justify-center">
          <h2 className="text-2xl leading-snug">Thông tin bài báo khoa học</h2>
          <p className="mt-2 flex items-center">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-600">
              Trang chủ
            </a>
            <span className="w-1.5 h-1.5 rounded-full border border-white inline-block mx-2"></span>
            <span className="text-gray-300">
              {' '}
              <h2 className="text-xl  leading-snug">Thông tin bài báo khoa học</h2>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
