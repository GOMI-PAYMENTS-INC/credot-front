import { CTA_LOCATION, CTA_TYPE, PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { openAppWithTag } from '@/utils/openBrowser';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { USER_TARGET_DATA } from '@/home/constants';
import { GlobalEnv } from '@/api/config';

interface IEfficient {
  imagePath: string;
}
export const Efficient = ({ imagePath }: IEfficient) => {
  return (
    <>
      <section className='h-[646px] bg-[#FFFBF8] sm:h-[910px]'>
        <div className='container py-[80px]'>
          <div className='mb-20 md:mb-[61.3px] '>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                고미인사이트와 함께
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>
                  <span className='text-orange-400'>경쟁이 수월한 키워드</span>발굴 부터,
                </p>
                <p className='mt-2'>
                  <span className='text-orange-400'>매출 상승</span>을 위한 상품 등록까지!
                </p>
              </div>
            </div>
          </div>
          <div className='relative flex justify-center'>
            <img
              className='absolute bottom-[-100px] right-[144px] h-[286px] w-[286px] lg:hidden'
              src='/assets/images/RightCircle.png'
            />
            <img
              className='absolute bottom-[-288px] h-[265px] w-[740px] lg:w-[730px] sm:hidden'
              src='/assets/images/Efficient.png'
            />
            <img
              className='hidden h-[545px] w-[366px] sm:flex'
              src='/assets/images/XSEfficient.png'
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container pt-[100px] pb-[126px] lg:pb-[100px] md:mx-auto  md:pb-[40px] sm:py-[60px]'>
          <div className='mb-20 sm:mb-[56px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-orange-500 md:text-L/Bold'>
                전략적으로 상품을 소싱하고 판매하고 싶은
              </div>
              <div className='mt-6 break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold xs:mt-2'>
                <p>Shopee 셀러 누구나!</p>
              </div>
            </div>
          </div>
          <div>
            <ul className='flex md:flex-wrap '>
              {USER_TARGET_DATA.map((userTarget, index) => (
                <li
                  key={index}
                  className='w-[calc(100%/4)] p-2.5 md:mb-[50px] md:w-[calc(100%/2)] sm:mb-5 sm:w-full sm:last:mb-0'
                >
                  <div className='mb-6 lg:mb-4 '>
                    <img
                      src={`${imagePath}/Section8/${userTarget.imgName}`}
                      alt=''
                      className='w-full '
                    />
                  </div>
                  <div className='mb-4 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                    {userTarget.name}
                  </div>
                  <div className='text-L/Medium text-grey-700 lg:text-M/Medium'>
                    {userTarget.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-main bg-cover bg-center py-[130px] lg:py-[105px] sm:bg-[20%] sm:py-[70px] xs:bg-[40%]'>
        <div className='container'>
          <div className='mx-auto max-w-[1096px]'>
            <div className='flex items-center justify-between sm:flex-col sm:flex-wrap sm:text-center'>
              <div className='break-keep text-4XL/Bold text-white lg:text-3XL/Bold sm:w-full'>
                데이터가 말해주는 <br />
                최고의 Shopee 판매 전략!
              </div>
              <div className='text-right sm:mt-12  sm:flex sm:w-full sm:flex-col sm:items-center'>
                <button
                  id='movedToSolution'
                  className='w-full max-w-[312px] rounded bg-white py-4 px-4 text-L/Bold text-grey-800 lg:max-w-[306px] md:max-w-[286px] sm:max-w-[306px]'
                  onClick={(event) => {
                    openAppWithTag({
                      url: GlobalEnv.serviceUrl,
                      path: PAGE_CATEGORY.MAIN,
                      type: CTA_TYPE.BUTTON,
                      location: CTA_LOCATION.MIDDLE_OF_CONTENT,
                      event: event,
                    });
                  }}
                >
                  고미인사이트 바로 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
