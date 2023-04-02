import { useEffect, Dispatch, useState, Fragment, RefObject } from 'react';

import {
  getTranslatorStatus,
  searchKeyword,
} from '@/containers/search/translator.container';
import { UseFormSetValue } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { queryKeywordByClick } from '@/containers/search';
import { scrollController } from '@/utils/scrollController';
import { SEARCH_KEYWORD_STATUS } from '@/containers/search/emun';
import {
  NoneDataError,
  NoneDataLoading,
  Landing,
} from '@/pages/search/BeforeGettingDataStatus';

interface ISearchKeywordTranslationResult {
  translatorState: TTranslationKeywordType;
  setTranslatorState: Dispatch<TRecommanderActionType>;
  _searchDispatch: Dispatch<TSearchActionType>;
  scrollRef: RefObject<HTMLTableSectionElement>;
  updateSearchKeyword: UseFormSetValue<{
    keyword: string;
  }>;
}

export const SearchKeywordTranslationResult = (
  props: ISearchKeywordTranslationResult,
) => {
  const {
    translatorState,
    setTranslatorState,
    _searchDispatch,
    scrollRef,
    updateSearchKeyword,
  } = props;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      searchKeyword(translatorState.keyword, setTranslatorState, setIsFetching);
      scrollController(scrollRef, 900, 0, 'smooth');
    }
  }, [isFetching]);

  const DATA_STATUS = getTranslatorStatus(translatorState);

  switch (DATA_STATUS) {
    case SEARCH_KEYWORD_STATUS.LANDING:
      return <Landing />;
    case SEARCH_KEYWORD_STATUS.NONE_DATA_ERROR:
      return <NoneDataError />;
    case SEARCH_KEYWORD_STATUS.NONE_DATA_LOADING:
      return <NoneDataLoading />;
  }

  const { dictionaries } = translatorState.data!;

  const buttonStyle =
    dictionaries.length > 9
      ? {
          buttonStyle: 'button-outlined-normal-medium-primary-false-false-false-disabled',
          buttonText: '더 추천받을 키워드가 없어요',
          disable: true,
        }
      : {
          buttonStyle: 'button-outlined-normal-medium-primary-false-false-false',
          buttonText: '키워드 더 추천받기',
          disable: false,
        };

  return (
    <div className='relative flex w-full flex-col justify-center pt-[14px]'>
      {dictionaries.map((result, idx) => {
        const lastIndex =
          dictionaries.length === idx + 1
            ? {
                style: translatorState.isError ? 'mb-[34px]' : 'mb-[96px]',
                isLastIndex: true,
              }
            : { style: 'mb-4', isLastIndex: false };

        return (
          <Fragment key={`${result.text}_${idx}`}>
            <div
              className={`mx-6 flex h-[70px] w-[312px] overflow-hidden rounded-[7px] bg-white hover:border-[1px] hover:bg-grey-200 ${lastIndex.style}`}
            >
              <button
                className='flex h-full w-full items-center'
                onClick={() =>
                  queryKeywordByClick(result.text, _searchDispatch, updateSearchKeyword)
                }
              >
                <ReactSVG
                  className='px-4'
                  src={`assets/icons/outlined/number/number-${idx + 1}.svg`}
                />

                <div className='flex max-w-[200px] flex-col'>
                  <p className='py-2 text-M/Regular text-grey-900 '>
                    {replaceOverLength(result.text, 22)}
                  </p>
                  <div className='mb-2 w-fit rounded-[2px] border-[1.5px] border-grey-400 bg-white'>
                    <p className='px-1 py-1 text-XS/Regular'>
                      {replaceOverLength(result.translate, 22)}
                    </p>
                  </div>
                </div>
                <ReactSVG
                  src='/assets/icons/filled/LeftArrow.svg'
                  className='mr-4 flex flex-grow rotate-180'
                  wrapper='div'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'fill-grey-600');
                  }}
                />
              </button>
            </div>

            {lastIndex.isLastIndex && translatorState.isError && (
              <div className='mb-[78px] flex h-full flex-col items-center justify-center'>
                <ReactSVG
                  src='/assets/icons/outlined/ExclamationCircle.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
                  }}
                />
                <div className='flex flex-col items-center pt-[18.5px] text-center'>
                  <p className='text-L/Medium text-grey-800'>
                    서버로부터 데이터를 불러오지 못했어요.
                    <br />
                    잠시 후 다시 시도 해주세요.
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
      {isFetching ? (
        <div className='mb-[142px] flex h-10  w-10 scale-[0.3] flex-col self-center'>
          <div id='loader-white' />
        </div>
      ) : (
        <button
          disabled={buttonStyle.disable}
          onClick={() => {
            setIsFetching(true);
          }}
          className={`${buttonStyle.buttonStyle} fixed bottom-[114px] flex items-center justify-center self-center`}
        >
          <p className='mx-2.5 my-2.5'>{buttonStyle.buttonText}</p>
        </button>
      )}
    </div>
  );
};
