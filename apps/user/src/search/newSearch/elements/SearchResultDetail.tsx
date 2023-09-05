import UseTooltip from '@/components/UseTooltip';
import { formatNumber } from '@/utils/formatNumber';
import { RelativeKeywords } from '@/search/newSearch/elements/RelativeKeywords';
import type { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
interface ISearchDetailResult {
  images: TProductImageType | null;
  response: TSearchResponse | undefined;
  tooltips: { monthly: JSX.Element; relativeKeywords: JSX.Element };
  _state: TSearchProps;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
  isLoading: boolean;
}
export const SearchResultDetail = ({
  images,
  response,
  tooltips: { monthly, relativeKeywords },
  _state,
  isLoading,
  _dispatch,
}: ISearchDetailResult) => {
  const productImgs = images?.imageUrl.filter((_, idx) => idx < 4);
  const isGottenData = response === undefined || isLoading || isFalsy(images);
  if (isGottenData) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='scale-[0.3]'>
          <div id='loader' />
        </div>
      </div>
    );
  }

  return (
    <div className='my-10 flex w-[420px] flex-col gap-5 opacity-90'>
      <header id='imgs'>
        <div className='flex h-[90px] w-[420px] gap-5'>
          {isFalsy(productImgs) ? (
            <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl border border-grey-300 bg-white'>
              {/* <img src='/assets/images/ErrorPage.png' className='w-[100px]' /> */}
              <div className='text-center'>
                <p className='text-L/Medium text-grey-800'>
                  키워드에 대한 이미지가 존재하지 않아요.
                </p>
                <p className='pt-[3px] text-M/Medium text-grey-700'>
                  다른 키워드를 검색해주세요.
                </p>
              </div>
            </div>
          ) : (
            productImgs?.map((img, index) => {
              return (
                <img
                  className='h-[90px] w-[90px] rounded-[10px] border-[1px] border-grey-300'
                  key={`product_img_${index}`}
                  src={img}
                />
              );
            })
          )}
        </div>
      </header>

      <main id='monthly'>
        <div className='grow basis-full rounded-2xl border border-grey-300 bg-white px-6 py-[14px]'>
          <div className='flex items-center'>
            <h3 className='text-L/Medium'>월간 검색량</h3>
            <UseTooltip content={monthly} />
          </div>
          <div className='mt-5'>
            <span className='text-3XL/Bold text-grey-900'>
              {formatNumber(response.main.count)}
            </span>
          </div>
        </div>
      </main>

      <footer id='relativeKeyword'>
        <RelativeKeywords
          _state={_state}
          _dispatch={_dispatch}
          tooltip={relativeKeywords}
          response={response}
        />
      </footer>
    </div>
  );
};
