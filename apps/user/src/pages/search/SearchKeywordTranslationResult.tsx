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
  const { translatorState, _searchDispatch, updateSearchKeyword } = props;

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

  return (
    <div className='relative flex w-full flex-col justify-center pt-[14px]'>
      {dictionaries.map((result, idx) => {
        return (
          <Fragment key={`${result.text}_${idx}`}>
            <div
              className={`mx-6 mb-4 flex h-[70px] w-[312px] overflow-hidden rounded-[7px] bg-white hover:border-[1px] hover:bg-grey-200`}
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
          </Fragment>
        );
      })}
    </div>
  );
};
