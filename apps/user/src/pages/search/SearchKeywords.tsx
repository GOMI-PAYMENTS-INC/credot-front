import React, { Fragment, useEffect, useMemo, useReducer } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { ModalComponent } from '@/components/modals/modal';
import {
  getKeyword,
  initializeState,
  queryKeyword,
  queryKeywordByClick,
  switchModal,
} from '@/containers/search';
import { initialState, reducer } from '@/containers/search/reducer';
import { getQueryResult } from '@/containers/search/search.api';
import { CountryType } from '@/generated/graphql';
import { SearchModal } from '@/pages/search/SearchModal';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';
import { formatNumber } from '@/utils/formatNumber';
import { isFalsy } from '@/utils/isFalsy';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { useSesstionStorage } from '@/utils/useSessionStorage';
import { SearchKeywordsImageBox } from '@/pages/search/SearchKeywordsImageBox';

const SearchKeywords = () => {
  const [_state, _dispatch] = useReducer(reducer, initialState);
  const [data, isLoading, isError] = getQueryResult(_state.keyword);

  useEffect(() => {
    const item = useSesstionStorage.getItem('keyword');
    if (isFalsy(item) === false) {
      initializeState(item, _dispatch);
    }
  }, []);

  const montlySearchVolum = useMemo(() => {
    if (isFalsy(_state.keyword) && isLoading === true) {
      return '???';
    }
    if (isFalsy(_state.keyword) === false && isLoading === true) {
      return (
        <div className='scale-[0.3]'>
          <div id='loader' />
        </div>
      );
    }
    if (data && data !== true) {
      const { count } = data.main;
      return formatNumber(count);
    }
  }, [data, isLoading, _state.keyword]);

  const relativeKeyword = useMemo(() => {
    if (isFalsy(_state.keyword) && isLoading === true) {
      return [1, 2, 3, 4, 5, 6];
    }
    if (isFalsy(_state.keyword) === false && isLoading === true) {
      return (
        <div className='scale-[0.3] pb-20'>
          <div id='loader' />
        </div>
      );
    }
    if (data && data !== true) {
      const { relations } = data;
      if (isFalsy(relations)) {
        return (
          <div className='flex h-[150px] items-center justify-center rounded-md bg-grey-200 text-L/Medium text-grey-700'>
            연관 키워드가 없어요
          </div>
        );
      }
      return relations;
    }
  }, [data, isLoading, _state.keyword]);

  const isMonthlyCountZero = typeof data !== 'boolean' && data?.main.count === 0;

  const reportCreatorButtonText = useMemo(() => {
    if (isMonthlyCountZero === true) {
      return '수요가 없는 키워드에요. 다른 키워드를 검색해주세요';
    }

    if (isFalsy(_state.keyword)) {
      return '리포트 생성하기';
    }

    return `'${replaceOverLength(_state.keyword, 20)}'로 리포트 생성하기`;
  }, [_state.keyword, isMonthlyCountZero]);

  return (
    <Fragment>
      <ModalComponent isOpen={_state.isModalOpen}>
        <SearchModal
          _state={_state}
          _dispatch={_dispatch}
          data={data}
          size={MODAL_SIZE_ENUM.LARGE}
        />
      </ModalComponent>
      <div className='container relative  grid h-full grid-cols-12 items-center'>
        <div className='absolute left-[-20%] top-0  z-[-1] block'>
          <img src='/assets/images/Background.png' />
        </div>
        <div className='col-span-6'>
          <div className='px-[50px]'>
            <div>
              <h1 className='break-keep text-3XL/Bold'>
                <span className='text-orange-600'>상위 노출</span>을 원하는
                <br />
                <span className='text-orange-600'>키워드</span>를 검색해주세요.
              </h1>
            </div>
            <div>
              <div className='mt-6 flex items-center'>
                <ReactSVG src='/assets/icons/country/Vietnam.svg' className='pr-[8px]' />
                <select
                  name='country'
                  id='country'
                  className='bg-transparent py-3 text-S/Medium'
                >
                  <option value={CountryType.Vn} defaultValue={CountryType.Vn}>
                    베트남
                  </option>
                </select>

                <select
                  name='filterOption'
                  id='filterOption'
                  className='ml-[20px] bg-transparent py-3 text-S/Medium'
                >
                  <option value='연관도순' defaultValue='연관도순'>
                    연관도순
                  </option>
                </select>
              </div>
              <div className='form-control mt-2'>
                <div className='input-group'>
                  <div className=' w-full !rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                    <input
                      type='text'
                      placeholder='키워드를 입력해주세요.'
                      value={_state.text}
                      onChange={(event) => getKeyword(event, _dispatch)}
                      onKeyDown={(event) => queryKeyword(_state.text, _dispatch, event)}
                      className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                    />
                  </div>
                  <button
                    onClick={(event) => queryKeyword(_state.text, _dispatch, event)}
                    className='btn-square btn border-none bg-gradient-to-r from-orange-500 to-[#FF7500]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {isFalsy(montlySearchVolum) ? (
              <div className='mt-12 flex h-[428px] items-center justify-center rounded-2xl border-[1px] border-grey-300 bg-white'>
                <div className='flex flex-col items-center text-center'>
                  <div className='h-[157px] w-[193px]'>
                    <img src='/assets/images/ErrorPage.png' />
                  </div>
                  <div className='pt-7'>
                    <h3 className='text-XL/Bold'>키워드 정보를 불러오지 못했어요</h3>
                    <p className='pt-3 text-S/Regular'>
                      키워드 검색량 정보를 불러오는 과정에서 저희측 오류가 발생했어요.
                      <br />
                      오류가 해결되는데로 별도 알림 문자를 발송드릴예정이며,
                      <br />
                      서비스 이용에 불편을 드려 대단히 죄송합니다.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Fragment>
                <div className='mt-12 rounded-2xl border border-grey-300 bg-white px-6 py-5 '>
                  <div className=''>
                    <h3 className='text-L/Medium'>
                      월간 검색량
                      <ReactSVG
                        id='anchor-montly-search-volum'
                        src='assets/icons/filled/Help.svg'
                        className='ml-[7px] inline-block'
                      />
                      <Tooltip
                        anchorId='anchor-montly-search-volum'
                        html='키워드의 최근 30일간 검색량을 나타내요. <br/> 키워드에 대한 수요를 정량적으로 알 수 있어요.'
                        place='right'
                      />
                    </h3>
                  </div>
                  <div className='mt-5'>
                    <span
                      className={`text-4XL/Bold text-grey-${
                        _state.isSearched ? 900 : 300
                      }`}
                    >
                      <p className={`text-4XL/Bold text-grey-300`}></p>
                      {montlySearchVolum}
                    </span>
                  </div>
                </div>
                <div className='mt-6 rounded-2xl border border-grey-300 bg-white px-6 pt-5'>
                  <div className=''>
                    <h3 className='text-L/Medium'>
                      이런 키워드들은 어때요?
                      <ReactSVG
                        id='anchor-keyword-tip'
                        src='assets/icons/filled/Help.svg'
                        className='ml-[7px] inline-block'
                      />
                      <Tooltip
                        anchorId='anchor-keyword-tip'
                        html='키워드와 함께 가장 많이 검색되는 연관성이 높은 키워드들이에요.'
                        place='right'
                      />
                    </h3>
                  </div>
                  <div className='mt-6 h-[170px] overflow-x-auto'>
                    <ul className='overflow-y-hidden text-center'>
                      {Array.isArray(relativeKeyword)
                        ? relativeKeyword.map((keyword) => {
                            if (typeof keyword === 'number') {
                              return (
                                <li
                                  key={`${keyword}_dummy`}
                                  className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-grey-300 bg-grey-100 pb-0 odd:mr-[4%]'
                                />
                              );
                            }
                            return (
                              <Fragment key={`${keyword.id}`}>
                                <li
                                  id={`anchor-sub-montly-keyword-volumn-${keyword.id}`}
                                  className='float-left mb-3  cursor-pointer  rounded-[50px]  border border-grey-300 px-[5%] leading-9 odd:mr-[4%] hover:bg-grey-200 hover:text-orange-500'
                                  onClick={() =>
                                    queryKeywordByClick(keyword.text, _dispatch)
                                  }
                                >
                                  {keyword.text}
                                </li>
                                <Tooltip
                                  anchorId={`anchor-sub-montly-keyword-volumn-${keyword.id}`}
                                  content={`월간 검색량: ${
                                    keyword.count && formatNumber(keyword.count)
                                  }`}
                                  place='bottom'
                                />
                              </Fragment>
                            );
                          })
                        : relativeKeyword}
                    </ul>
                  </div>
                </div>

                <div className='mt-10'>
                  <button
                    className={`w-full rounded-md bg-orange-500 py-4 ${
                      (_state.keyword === '' || isMonthlyCountZero) && 'opacity-30'
                    }`}
                    disabled={_state.keyword === '' || isMonthlyCountZero}
                    onClick={() => {
                      const payload = { _dispatch, status: true, data: data, _state };
                      switchModal(payload);
                    }}
                  >
                    <span className='text-L/Bold text-white'>
                      {reportCreatorButtonText}
                    </span>
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <div className='x-[50px] col-span-6 h-[900px] w-[458px] self-center'>
          {_state.isSearched && _state.keyword ? (
            <iframe
              src={`https://shopee.vn/search?keyword=${_state.keyword}`}
              className=' h-[900px] w-[458px] rounded-2xl pt-[8px]'
              allow='accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture'
              sandbox='allow-same-origin allow-scripts'
            />
          ) : (
            <SearchKeywordsImageBox />
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default SearchKeywords;
