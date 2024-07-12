import { ConstrainedContainer } from '@/components/container/constrained-container';

export function Footer() {
  return (
    <footer>
      <ConstrainedContainer
        className='bg-[rgb(23_23_23/var(--tw-bg-opacity))] bg-opacity-100 py-12'
        contentClass='grid grid-cols-1 md:grid-cols-2 lg:flex divide-y md:divide-none flex-row flex-wrap text-gray-400 text-sm gap-y-5 gap-x-5 justify-between'
      >
        <div className='flex flex-col gap-y-2'>
          <p className='font-semibold uppercase text-gray-200'>
            Mua vé xem phim
          </p>
          <p>Lịch chiếu phim</p>
          <p>Rạp chiếu phim</p>
          <p>Phim chiếu rạp</p>
          <p>Review phim</p>
          <p>Top phim</p>
          <p>Blog phim</p>
        </div>
        <div className='flex flex-col gap-y-2 pt-4'>
          <p className='font-semibold uppercase text-gray-200'>
            Dịch vụ nổi bật
          </p>
          <p>Vé xem phim</p>
          <p>Bảo hiểm ô tô</p>
          <p>Vé máy bay</p>
          <p>Ví nhân ái</p>
          <p>Vay nhanh</p>
        </div>

        <div className='flex flex-row flex-wrap gap-y-6 pt-4 lg:max-w-[350px]'>
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold uppercase text-gray-200'>
              Chăm sóc khách hàng
            </p>
            <p>
              Địa chỉ: Lầu 6, Toà nhà Phú Mỹ Hưng, số 8 Hoàng Văn Thái, khu phố
              1, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh
            </p>
            <p>Hotline : 1900 5454 41 (Phí 1.000đ/phút)</p>
            <p>Email : hotro@smartcine.vn</p>
            <p>
              Tổng đài gọi ra : 028.7306.5555 - 028.9999.5555 - 028.5555.5555,
              các đầu số di động Brandname SmartCine
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold uppercase text-gray-200'>
              HỢP TÁC DOANH NGHIỆP
            </p>
            <p>Hotline : 1900 636 652 (Phí 1.000đ/phút)</p>
            <p>Email : merchant.care@momo.vn</p>
            <p>Website : business.momo.vn</p>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-4'>
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold uppercase text-gray-200'>
              Kết nối với chúng tôi
            </p>
            <div className='flex flex-row'>
              {['facebook', 'linkedin', 'youtube'].map((a) => (
                <div key={a} className='p-4'>
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold uppercase text-gray-200'>
              Kết nối với chúng tôi
            </p>
            <div className='flex flex-row'>
              {['facebook', 'linkedin', 'youtube'].map((a) => (
                <div key={a} className='p-4'>
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold uppercase text-gray-200'>
              Kết nối với chúng tôi
            </p>
            <div className='flex flex-row'>
              {['facebook', 'linkedin', 'youtube'].map((a) => (
                <div key={a} className='p-4'>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ConstrainedContainer>
    </footer>
  );
}
