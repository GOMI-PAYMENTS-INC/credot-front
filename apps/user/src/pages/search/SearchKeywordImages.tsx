import { Fragment, useMemo } from 'react';
import { isTruthy } from '@/utils/isTruthy';
import { ReactSVG } from 'react-svg';

import { SearchCurrentTime } from '@/pages/search/SearchCurrentTime';
import { isFalsy } from '@/utils/isFalsy';
import { STATUS_CODE } from '@/types/enum.code';

interface ISearchKeywordsImageBox {
  isLoading: boolean;
  isError: boolean;
  images: TGetProductImageResponseType | null;
  keyword: string;
}

export const SearchKeywordImages = (props: ISearchKeywordsImageBox) => {
  const { images, isLoading, keyword, isError } = props;
  const test: [] = [];
  const imageBoxTitle = useMemo(() => {
    // 로딩중
    if (isFalsy(keyword) === false && images === null) {
      return {
        title: '불러오는 중...',
        subTitle: 'Shopee에 등록된 상품 이미지를 미리 보여드릴게요.',
      };
    }
    if (isFalsy(images) === true) {
      return {
        title: '키워드를 검색해주세요.',
        subTitle: 'Shopee에 등록된 상품 이미지를 미리 보여드릴게요.',
      };
    }
    //  검색결과가 있을 경우
    if (images) {
      return {
        title: '이런 상품들이 검색되고 있어요!',
        subTitle: 'Shopee에 등록된 상품 이미지를 미리 보여드릴게요.',
      };
    }
    return { title: '', subTitle: '' };
  }, [props]);

  const { title, subTitle } = imageBoxTitle;
  const list = isFalsy(images) ? [1, 2, 3, 4, 5, 6, 7, 8] : images!.data;
  //TODO: return에 조건문이 많음 분기할 것
  return (
    <div className='flex h-full w-full flex-col overflow-hidden rounded-[20px] border-[1px] border-grey-300 shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
      {images?.code === STATUS_CODE.ERROR ? (
        <div className='flex h-full flex-col'>
          <div className='flex h-full flex-col items-center justify-center'>
            <ReactSVG
              src='/assets/icons/outlined/ExclamationCircle.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
              }}
            />
            <div className='flex flex-col items-center pt-[11px] text-center'>
              <p className='text-L/Medium text-grey-800'>
                저희 측 오류로 이미지를 불러오지 못했어요.
              </p>
              <p className='pt-[3px] text-M/Medium text-grey-700'>
                오류가 반복 발생하는 경우 고객센터로 연락주세요.
              </p>
              <button className='button-filled-normal-medium-grey-true-false-true mt-[31px]'>
                <div className='flex items-center px-0.5 py-0.5 text-M/Bold text-grey-800'>
                  <ReactSVG
                    src='/assets/icons/outlined/Reload.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-4 h-4 fill-grey-800');
                    }}
                  ></ReactSVG>
                  <span className='pl-1'>재시도</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : images?.data.length === 0 ? (
        <div className='flex h-full flex-col  pb-[120px]'>
          <div className='flex h-full flex-col items-center justify-center'>
            <img src='/assets/images/ErrorPage.png' />
            <div className='pt-9 text-center'>
              <p className='text-L/Medium text-grey-800'>
                키워드에 대한 이미지가 존재하지 않아요.
              </p>
              <p className='pt-[3px] text-M/Medium text-grey-700'>
                다른 키워드를 검색해주세요.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <header className='pb-4'>
            <SearchCurrentTime />
            <div className='pt-[25px] pl-6'>
              <h1 className='text-2XL/Bold'>{title}</h1>
              <p className='pt-2 text-S/Medium text-grey-700'>{subTitle}</p>
            </div>
          </header>

          <section
            className={`flex h-full w-full ${
              images !== null && images!.data && 'overflow-y-auto'
            } pt-2`}
            id='scrollbar'
          >
            {isFalsy(keyword) === false && images === null ? (
              <div className='flex w-full scale-[0.3] flex-col items-center justify-center self-center'>
                <div id='loader' />
              </div>
            ) : (
              <ul>
                {list.map((item, idx) => {
                  const style = `float-left flex items-center ${idx > 1 && 'pt-4'} pl-6 ${
                    idx % 1 === 1 && 'pr-6'
                  }`;
                  return typeof item === 'number' ? (
                    <li key={`keywordImg_${idx}`} className={style}>
                      <div className='flex h-[192px] w-[192px] items-center justify-center border-[1px] bg-grey-100 '>
                        <img src='/assets/images/ShopeeIcon.png' />
                      </div>
                    </li>
                  ) : (
                    <li key={`keywordImg_${item.keywrod}_${idx}`} className={style}>
                      <div className='flex h-[192px] w-[192px] items-center justify-center border-[1px] bg-grey-100 '>
                        <img className='flex' src={item.imageUrl} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </Fragment>
      )}
    </div>
  );
};
