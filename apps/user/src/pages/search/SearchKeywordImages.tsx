import { Fragment, useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { isFalsy } from '@/utils/isFalsy';
import { STATUS_CODE } from '@/types/enum.code';
import { Tooltip } from 'react-tooltip';

interface ISearchKeywordsImageBox {
  images: TGetProductImageResponseType | null;
  keyword: string;
}

export const SearchKeywordImages = (props: ISearchKeywordsImageBox) => {
  const { images, keyword } = props;
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
  const imageData = images?.data[0].imageUrl;

  const list = imageData === undefined ? [1, 2, 3] : imageData;
  //TODO: return에 조건문이 많음 분기할 것
  return (
    <div className='flex h-[236px] grow basis-full flex-col self-center bg-white'>
      <div className='flex h-full w-full flex-col overflow-hidden rounded-[20px] border-[1px] border-grey-300'>
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
        ) : list.length === 0 ? (
          <div className='flex h-full flex-col'>
            <div className='flex h-full flex-col items-center justify-center'>
              <img src='/assets/images/ErrorPage.png' className='w-[100px]' />
              <div className='pt-4 text-center'>
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
              <div className='pt-[25px] pl-6'>
                <h3 className='text-L/Medium'>
                  관련 이미지
                  <ReactSVG
                    id='anchor-keyword-tip'
                    src='assets/icons/filled/Help.svg'
                    className='ml-[7px] inline-block'
                  />
                  <Tooltip
                    anchorId='anchor-keyword-tip'
                    html='쇼피에서 키워드 검색 시 노출되는 상품들의 이미지에요.'
                    place='right'
                  />
                </h3>
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
                    const style = `float-left flex items-center ${
                      idx > 2 && 'pt-4'
                    } pl-6 ${idx % 1 === 1 && 'pr-6'}`;
                    return typeof item === 'number' ? (
                      <li key={`keywordImg_${idx}`} className={style}>
                        <div className='flex h-[126px] w-[126px] items-center justify-center rounded border-[1px] bg-grey-100 shadow-[0px_8px_16px_rgba(0,0,0,0.02)]'>
                          <img
                            src='/assets/images/ShopeeIcon.png'
                            className='w-[46.33px]'
                          />
                        </div>
                      </li>
                    ) : (
                      <li key={`keywordImg_${item}_${idx}`} className={style}>
                        <div className='flex h-[126px] w-[126px] items-center justify-center rounded border-[1px] bg-grey-100 shadow-[0px_8px_16px_rgba(0,0,0,0.02)]'>
                          <img className='flex' src={item} />
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
    </div>
  );
};
