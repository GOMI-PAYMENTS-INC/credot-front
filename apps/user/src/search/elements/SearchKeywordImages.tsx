import { Fragment } from 'react';
import { ReactSVG } from 'react-svg';

import { isFalsy } from '@/utils/isFalsy';
import { STATUS_CODE } from '@/types/enum.code';
import { Tooltip } from 'react-tooltip';
import UseTooltip from '@/components/UseTooltip';
import { SearchTooltips } from '@/search/elements/Tooltip';
interface ISearchKeywordsImageBox {
  images: TGetProductImageResponse | null;
  keyword: string;
}

export const SearchKeywordImages = (props: ISearchKeywordsImageBox) => {
  const { images, keyword } = props;
  const { Images } = SearchTooltips();
  const imageData = images?.data[0].imageUrl;

  const list = imageData === undefined ? [1, 2, 3] : imageData;
  //TODO: return에 조건문이 많음 분기할 것
  return (
    <div className='flex h-[236px] grow basis-full flex-col self-center bg-white xs:w-full xs:max-w-[430px]'>
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
            <header className='flex items-center pb-5 pt-[25px] pl-6 xs:pb-[10px]'>
              <h3 className='text-L/Medium'>관련 이미지</h3>
              <UseTooltip place='bottom' content={Images} />
            </header>

            <section
              className={`h-full w-full ${
                images !== null && images!.data ? 'overflow-y-auto' : null
              } px-6 py-3 xs:overflow-y-hidden xs:pt-0`}
              id='scrollbar'
            >
              {isFalsy(keyword) === false && images === null ? (
                <div className='flex w-full scale-[0.3] flex-col items-center justify-center self-center xs:h-full'>
                  <div id='loader' />
                </div>
              ) : (
                <ul
                  className={`grid grid-cols-3 grid-rows-[repeat(auto-fill,_126px)] gap-4 gap-x-6 xs:flex xs:h-full xs:${
                    typeof list[0] === 'number' ? 'w-[500px]' : 'h-fit'
                  } xs:w-fit`}
                >
                  {list.map((item, idx) => {
                    const isImage = typeof item === 'number';

                    return (
                      <li
                        key={`img_${idx}`}
                        className='h-full overflow-hidden rounded border-[1px]'
                      >
                        <div className='flex h-full items-center justify-center bg-grey-100 shadow-[0px_8px_16px_rgba(0,0,0,0.02)] xs:w-[150px]'>
                          {isImage ? (
                            <img
                              src='/assets/images/ShopeeIcon.png'
                              className='w-[46.33px] xs:mx-[50px]'
                            />
                          ) : (
                            <img key={`img_${idx}`} className='flex' src={item} />
                          )}
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
