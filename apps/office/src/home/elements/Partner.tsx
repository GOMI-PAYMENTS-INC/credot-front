import { PARTENER_DATA } from '@/home/HomeConstant';

interface IPartner {
  imagePath: string;
}
export const Partner = ({ imagePath }: IPartner) => {
  return (
    <section className='bg-grey-50 lg:max-w-[960px]'>
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

        <div className='flex  w-full gap-6  lg:flex-wrap lg:justify-center'>
          {PARTENER_DATA.map((partener, index) => {
            return (
              <div
                key={index}
                className='flex h-auto w-[424px] flex-col rounded-[16px] border-grey-300 bg-white p-6 '
              >
                <div>
                  <div className='xs:h-[100px] flex h-[130px]'>
                    <div className='mr-2.5 h-[65px] w-[65px] self-center lg:mr-[7px] lg:h-[43px] lg:w-[43px]'>
                      <img
                        src={`${imagePath}/Partner/${partener.imgName}`}
                        alt='{partener.name}'
                      />
                    </div>
                    <div>
                      <div className='xs:text-M/Medium pb-2  text-L/Medium text-grey-900  lg:mb-[3px]'>
                        {partener.name}
                      </div>
                      <ul className='xs:text-S/Regular ml-6  list-disc text-M/Regular text-grey-800 '>
                        {partener.brand}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='mt-6'>
                  <div className='xs:text-S/Bold mb-4 text-XL/Bold text-grey-900 '>
                    {partener.subject}
                  </div>
                  <div className='xs:text-S/Medium text-M/Medium text-grey-800'>
                    {partener.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
