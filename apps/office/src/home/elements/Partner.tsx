import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { PARTENER_DATA } from '@/home/Constant';

interface IPartner {
  imagePath: string;
}
export const Partner = ({ imagePath }: IPartner) => {
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

        <div className='flex w-full gap-6 sm:flex-col'>
          {PARTENER_DATA.map((partener, index) => (
            <div
              key={index}
              className=' h-auto w-[424px] rounded-[16.5097px]   border-grey-300 bg-white p-6 md:w-full md:p-[18.54px]'
            >
              <div className='mb-6 h-[130px] md:mb-[18.54px]'>
                <div className='flex h-full'>
                  <div className='mr-2.5 h-[65px] w-[65px] self-center md:mr-[7.73px] md:h-[43.25px] md:w-[43.25px]'>
                    <img
                      src={`${imagePath}/Partner/${partener.imgName}`}
                      alt='{partener.name}'
                    />
                  </div>
                  <div>
                    <div className='mb-2 text-L/Medium  text-grey-900 md:mb-[3.09px]  md:text-S/Medium'>
                      {partener.name}
                    </div>
                    <ul className='ml-5 list-disc  text-M/Regular text-grey-800 md:text-S/Regular'>
                      {partener.brand}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='pt-4'>
                <div className='mb-4 text-XL/Bold text-grey-900 md:mb-[12.36px] md:text-S/Bold'>
                  {partener.subject}
                </div>
                <div className='text-L/Medium text-grey-800 md:text-XS/Medium'>
                  {partener.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
