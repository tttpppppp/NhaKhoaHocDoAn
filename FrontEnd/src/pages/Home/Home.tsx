import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="">
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <section
        className="bg-cover bg-center bg-no-repeat relative mb-20"
        style={{ backgroundImage: 'url("https://csdlkhoahoc.hueuni.edu.vn/csdl/images/bg5.jpg")' }}>
        <div className="bg-black bg-opacity-40 w-full h-full absolute inset-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-10 px-4 py-20 text-white">
          <div className="space-y-6 col-span-12 md:col-span-8">
            <h2 className="text-2xl uppercase leading-snug">{t('Database')} </h2>
            <div className="text-white text-5xl uppercase font-semibold">
              <span className="text-primary">{t('Science')}</span> {t('Science2')}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full">
                  <i className="fas fa-pen text-white"></i>
                </div>
                <div>
                  <h4 className="text-xlxl uppercase">Dữ liệu nhà khoa học</h4>
                  <p className="text-sm text-gray-300">3.039 Kết Quả</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full">
                  <i className="fas fa-lightbulb text-white"></i>
                </div>
                <div>
                  <h4 className="text-xl uppercase">Dữ liệu đề tài khoa học</h4>
                  <p className="text- text-gray-300">6.343 Kết Quả</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full">
                  <i className="fas fa-tablet-alt text-white"></i>
                </div>
                <div>
                  <h4 className="text-xl uppercase">Dữ liệu bài báo khoa học</h4>
                  <p className="text- text-gray-300">33.959 Kết Quả</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full">
                  <i className="fas fa-share-alt text-white"></i>
                </div>
                <div>
                  <h4 className="text-xl uppercase">Dữ liệu sách, giáo trình</h4>
                  <p className="text-sm text-gray-300">4.493 Kết Quả</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-white p-6 text-black rounded-sm shadow">
            <h3 className="text-2xl">
              Tìm Kiếm <span className="text-primary">Dữ Liệu</span>
            </h3>
            <input type="text" placeholder="Lê Hữu Bình" className="w-full border px-4 py-3 rounded text-sm my-3" />
            <select className="w-full border px-4 py-3 rounded text-sm mb-3">
              <option>Nhà khoa học</option>
              <option>Bài báo</option>
            </select>
            <select className="w-full border px-4 py-3 rounded text-sm mb-6">
              <option>--Chọn đơn vị--</option>
              <option>Khoa Công nghệ thông tin</option>
            </select>
            <button className="w-full bg-primary  text-white py-3 rounded font-medium hover:bg-pink-700 transition">
              Tìm Kiếm
            </button>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 max-w-screen-xl mx-auto">
        {/* Left Text Section */}
        <div className="md:col-span-6 text-justify space-y-4 text-[15px] leading-relaxed">
          <h2 className="text-2xl font-bold">
            GIỚI THIỆU TỔNG QUAN VỀ <span className="text-red-600 uppercase">Đại học Nha Trang</span>
          </h2>

          <p>
            <span className="text-red-600 font-bold text-3xl">65</span> năm hình thành và phát triển, Đại học Huế ngày
            nay là một trung tâm đào tạo và nghiên cứu khoa học lớn của miền Trung Việt Nam. Là một trong 14 trường Đại
            học trọng điểm của cả nước, Đại học Huế đã khẳng định được vị thế, uy tín của mình trong hệ thống giáo dục
            đại học Việt Nam. Nguồn nhân lực KHCN bao gồm một đội ngũ đông đảo các nhà giáo, nhà nghiên cứu có trình độ
            cao. Tính cho đến nay Đại học Huế có <strong className="text-gray-500 font-bold">4088</strong> công chức,
            viên chức và lao động, trong đó có <strong className="text-gray-500 font-bold">3050</strong> công chức, viên
            chức. Số lượng giảng viên là <strong className="text-[#3498db]">1831</strong>, trong đó có{' '}
            <strong className="text-[#3498db]">772</strong> giảng viên chính và giảng viên cao cấp. Đại học Huế có{' '}
            <strong className="text-[#3498db]">18 GS</strong>, <strong className="text-[#3498db]">199 PGS</strong>;{' '}
            <strong className="text-[#3498db]">732</strong> tiến sĩ khoa học, tiến sĩ và{' '}
            <strong className="text-[#3498db]">14</strong> chuyên khoa 2;{' '}
            <strong className="text-[#3498db]">1298</strong> thạc sĩ và chuyên khoa 1. Tỷ lệ giảng viên có trình độ sau
            đại học đạt <strong className="text-gray-500 font-bold">87.4%</strong>. Đây là một tài sản quý báu của Đại
            học Huế, của tỉnh Thừa Thiên Huế và cả nước.
          </p>

          <p>
            Hoạt động đào tạo và NCKH của các nhà giáo, nhà khoa học đã góp phần to lớn và có tính chất quyết định đến
            sự phát triển của Đại học Huế trong điều kiện hội nhập và mở rộng giao lưu hợp tác quốc tế. Cán bộ giảng
            viên Đại học Huế đã thực hiện hàng trăm nhiệm vụ NCKH các cấp, đăng tải hàng ngàn bài báo, công trình khoa
            học trên các Tạp chí trong và ngoài nước, biên soạn hàng trăm giáo trình, sách, tài liệu tham khảo phục vụ
            thiết thực cho công tác đào tạo và NCKH. Đây là nguồn dữ liệu quý, phục vụ cho việc tra cứu, tham khảo trong
            đào tạo, đặc biệt là đào tạo Sau đại học và NCKH.
          </p>

          <p className="text-red-600 font-bold uppercase">Cơ sở dữ liệu khoa học công nghệ</p>

          <p>
            Cơ sở dữ liệu khoa học công nghệ là nguồn thông tin giúp cho công tác quản lý trên các lĩnh vực Khoa học
            Công nghệ, đào tạo Sau đại học, xuất bản TCKH, tư vấn và dịch vụ khoa học,...
          </p>

          <p>
            Chúng tôi trân trọng giới thiệu{' '}
            <span className="text-red-600 font-bold">“CƠ SỞ DỮ LIỆU KHOA HỌC CÔNG NGHỆ”</span> với mong muốn rằng, cùng
            với các CSDL khác sẽ góp phần ảnh hưởng một cách tương đối đầy đủ nguồn nhân lực chất lượng cao của giáo dục
            đại học nước nhà.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="md:col-span-6 flex flex-col items-center">
          <img
            src="https://csdlkhoahoc.hueuni.edu.vn/csdl/images/vnmap.png"
            alt="Đại học Huế map and logos"
            className="w-full max-w-md"
          />
          <p className="text-center mt-4">
            TRƯỜNG THÀNH VIÊN, KHOA TRỰC THUỘC VÀ PHÂN HIỆU <br />
          </p>
          <h4 className="text-primary text-xl font-bold mt-2 uppercase">Đại học Nha Trang</h4>
        </div>
      </div>
    </div>
  )
}
