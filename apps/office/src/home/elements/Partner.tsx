import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { PARTENER_DATA } from '@/home/constant';

interface IPartner {
  imagePath: string;
}
export const Partner = ({ imagePath }: IPartner) => {
  const RepeatPartnerSlide = () =>
    PARTENER_DATA.map((partener, index) => (
      <SwiperSlide
        key={index}
        className='shadow-partner-card !md:w-[286px] !h-auto !w-[424px]  rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
      >
        <div className='mb-6 md:mb-[18.54px]'>
          <div className='flex'>
            <div className='mr-2.5 h-[65px] w-[65px] md:mr-[7.73px] md:h-[43.25px] md:w-[43.25px]'>
              <img
                src={`${imagePath}/Section6/${partener.imgName}`}
                alt='{partener.name}'
              />
            </div>
            <div>
              <div className='mb-2 text-L/Medium  text-grey-900 md:mb-[3.09px]  md:text-S/Medium'>
                {partener.name}
              </div>
              <div className='text-M/Regular text-grey-800  md:text-S/Regular'>
                {partener.brand}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='mb-4 text-XL/Bold text-grey-900 md:mb-[12.36px] md:text-S/Bold'>
            {partener.subject}
          </div>
          <div className='text-L/Medium text-grey-800 md:text-XS/Medium'>
            {partener.content}
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <section className='overflow-hidden bg-grey-50'>
      <div className='container pt-[100px] pb-[122px] sm:pb-[60px] md:mx-auto md:pt-[77px] md:pb-[100px] lg:pb-[80px] '>
        <div className='mb-20 md:mb-[61.3px] '>
          <div className='text-center'>
            <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
              고미인사이트가 함께합니다
            </div>
            <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
              <p>서비스 오픈 1개월만에</p>
              <p className='mt-2'>
                무려 <span className='text-orange-400'>248개사</span>가 이용했어요.
              </p>
            </div>
          </div>
        </div>

        <div className='sm:hidden'>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            centeredSlides={true}
            slidesPerView={'auto'}
            loopedSlides={PARTENER_DATA.length}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect='slide'
            grabCursor={true}
            speed={5000}
            a11y={{ enabled: false }}
            className='banner !overflow-visible'
          >
            {RepeatPartnerSlide()}
          </Swiper>
        </div>
        <div className='hidden sm:block'>
          <ul>
            {PARTENER_DATA.map((partener, index) => (
              <li
                key={index}
                className='shadow-partner-card mb-6 rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
              >
                <div className='mb-6 md:mb-[18.54px]'>
                  <div className='flex'>
                    <div className='mr-2.5 h-[65px] w-[65px] md:mr-[7.73px] md:h-[43.25px] md:w-[43.25px]'>
                      <img
                        src={`${imagePath}/Section6/${partener.imgName}`}
                        alt='{partener.name}'
                      />
                    </div>
                    <div>
                      <div className='mb-2 text-L/Medium  text-grey-900 md:mb-[3.09px]  md:text-S/Medium'>
                        {partener.name}
                      </div>
                      <div className='text-M/Regular text-grey-800  md:text-S/Regular'>
                        {partener.brand}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='mb-4 text-XL/Bold text-grey-900  md:mb-[12.36px] md:mb-[12.36px] md:text-S/Bold'>
                    {partener.subject}
                  </div>
                  <div className='text-L/Medium text-grey-800 md:text-XS/Medium'>
                    {partener.content}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
