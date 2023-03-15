import { useMemo } from 'react';
import { isTruthy } from '@/utils/isTruthy';
import { ReactSVG } from 'react-svg';
import { SearchCurrentTime } from '@/pages/search/SearchCurrentTime';

export const SearchKeywordsImageBox = () => {
  const data = null;

  const keywordImages = useMemo(() => {
    if (isTruthy(data)) {
      return [];
    }
    return [1, 2, 3, 4, 5];
  }, []);

  return (
    <div className='flex h-full w-full flex-col overflow-hidden rounded-[20px] border-[1px] border-grey-300 shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
      <header className=''>
        <SearchCurrentTime />
        <div className='pt-[25px] pl-6'>
          <h1 className='text-2XL/Bold'>키워드를 검색해주세요.</h1>
          {/* <h1 className='text-2XL/Bold'>불러오는 중...</h1> */}

          <p className='pt-2 text-S/Medium text-grey-700'>
            Shopee에 등록된 상품 이미지를 미리 보여드릴게요.
          </p>
        </div>
      </header>

      <section className='h-full pt-2'>
        {/* 최초 출력되는 페이지 & 데이터기 있을 경우 보여주는 페이지 */}
        {keywordImages.map((item, idx) => {
          return (
            <div key={`keywordImg_${item}`} className='flex items-center px-6 pt-4'>
              <div className='flex h-[192px] w-[192px] items-center justify-center border-[1px] bg-grey-100 '>
                <img src='/assets/images/ShopeeIcon.png/' />
              </div>
              <div className='ml-[26px] flex h-[192px] w-[192px] items-center justify-center border-[1px] bg-grey-100'>
                <img src='/assets/images/ShopeeIcon.png/' />
              </div>
            </div>
          );
        })}

        {/* 
        데이터 불러오는 중 (검색중)
        <div className='flex h-full scale-[0.3] items-center'>
          <div id='loader' />
        </div> 
        */}

        {/* <div className='flex h-full flex-col  pb-[120px]'>
          <div className='flex h-full flex-col items-center justify-center'>
            <img src='/assets/images/ErrorPage.png' />
            <div className='pt-9 text-center'>
              <p className='text-L/Medium text-grey-800'>
                키워드에 대한 이미지가 존재하지 않아요.
              </p>
              <p className='text-M/Medium text-grey-700 pt-[3px]'>다른 키워드를 검색해주세요.</p>
            </div>
          </div>
        </div> */}

        {/* 
        이미지를 가져오는데 오래 걸렸을 경우
        <div className='flex h-full flex-col  pb-[120px]'>
          <div className='flex h-full flex-col items-center justify-center'>
            <ReactSVG
              src='/assets/icons/outlined/ExclamationCircle.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
              }}
            />
            <div className='flex flex-col items-center pt-[11px] text-center'>
              <p className='text-L/Medium text-grey-800'>
                데이터를 아직 불러오지 못했어요.
              </p>
              <p className='pt-[3px] text-M/Medium text-grey-700'>
                새로고침을 눌러 다시 시도해주세요.
              </p>
              <button className='button-filled-normal-medium-grey-true-false-true mt-[31px]'>
                <div className='flex items-center px-0.5 py-0.5 text-M/Bold text-grey-800'>
                  <ReactSVG
                    src='/assets/icons/outlined/Reload.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-4 h-4 fill-grey-800');
                    }}
                  ></ReactSVG>
                  <span className='pl-1'>새로고침</span>
                </div>
              </button>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

// [0_35px_60px_-15px_rgba(0,0,0,0.3)]
// [0_8px_16px_-15px_rgba(0,0,0,0.3)]
