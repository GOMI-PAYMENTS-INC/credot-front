import { PARTENER_DATA } from '@/home/constants';

interface IPartner {
  imagePath: string;
}
export const Partner = ({ imagePath }: IPartner) => {
  return (
    <section className='bg-grey-50 lg:max-w-[960px]'>
      <div className='container pt-[100px] pb-[122px] lg:pb-[80px] md:mx-auto md:pt-[77px] md:pb-[100px] sm:pb-[60px] '>
        <div className='mb-20 md:mb-[61.3px] '>
          <div className='text-center'>
            <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
              <p className='mb-6 text-2XL/Bold'>누적 리포트 발행 13,841건!</p>
              <p>서비스 오픈 4개월 만에</p>
              <p className='mt-2'>
                무려 <span className='text-orange-400'>1,200개사</span>가 이용했어요.
              </p>
            </div>
          </div>
        </div>

        <div className='flex w-full gap-[22px] lg:flex-wrap lg:justify-center'>
          {PARTENER_DATA.map((partener, index) => {
            return (
              <div
                key={index}
                className='flex h-[533px] w-[311px] flex-col gap-[30px] rounded-[16px] border-[1px] border-grey-300 bg-white px-[22px] py-[30px] xs:h-full xs:w-[390px] xs:gap-0'
              >
                <header className='flex flex-col'>
                  <div className='border-b-[1px] pb-2.5 text-XL/Bold text-grey-900 xs:text-2XL/Bold '>
                    {partener.subject}
                  </div>

                  <div className='mt-2.5 h-[150px] w-[267px] text-M/Regular leading-[30px] text-grey-800 xs:h-fit xs:w-full xs:text-L/Medium'>
                    {partener.content}
                  </div>
                </header>

                <main className='xs:mt-[30px]'>
                  <div className='flex h-[64px] xs:h-[115px]'>
                    <div className='flex w-full items-center self-center'>
                      <img
                        src={`${imagePath}/Partner/${partener.imgName}`}
                        alt='{partener.name}'
                      />
                      <div className='ml-3 text-L/Medium text-grey-900 lg:mb-[3px]  xs:text-L/Medium '>
                        {partener.name}
                      </div>
                    </div>
                  </div>
                </main>

                <footer>
                  <ul className='w-full space-y-2 text-M/Regular text-grey-800 xs:text-L/Regular'>
                    {partener.brand}
                  </ul>
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
