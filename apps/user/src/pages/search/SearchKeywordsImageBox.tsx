import { useMemo } from 'react';
import { isTruthy } from '@/utils/isTruthy';
import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';

export const SearchKeywordsImageBox = () => {
  const data = null;

  const keywordImages = useMemo(() => {
    if (isTruthy(data)) {
      return [];
    }
    return [1, 2, 3, 4, 5];
  }, []);
  const now = convertTime('', 'hh:mm');

  return (
    <div className='h-full w-full overflow-hidden rounded-[20px] border-[1px] border-grey-300 shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
      <header className=''>
        <div className='mt-[19px] flex h-4 items-center justify-between pl-5'>
          <div className='flex items-center'>
            <img src='/assets/images/StatusGomiIcon.png' />
            <p className='pl-[6px] text-L/Medium'>{now}</p>
          </div>
          <ReactSVG src='/assets/icons/filled/StatusStatusIcons.svg' />
        </div>
        <div className='pt-[25px] pl-6'>
          <h1 className='text-2XL/Bold'>키워드를 검색해주세요.</h1>
          <p className='pt-2 text-S/Medium text-grey-700'>
            Shopee에 등록된 상품 이미지를 미리 보여드릴게요.
          </p>
        </div>
      </header>
      <section className='pt-2'>
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
      </section>
    </div>
  );
};

// [0_35px_60px_-15px_rgba(0,0,0,0.3)]
// [0_8px_16px_-15px_rgba(0,0,0,0.3)]
