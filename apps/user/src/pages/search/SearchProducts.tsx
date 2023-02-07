import { useRef, Fragment, useReducer, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactSVG } from 'react-svg';
import { formatNumber } from '@/utils/formatNumber';
import { isFalsy } from '@/utils/isFalsy';
import {
  getKeyword,
  queryKeyword,
  queryKeywordByClick,
  GetQueryResult,
} from '@/containers/search';
import { ActionKind, initialState, reducer } from '@/containers/search/reducer';

import { Tooltip } from 'react-tooltip';
import { CountryType } from '@/generated/graphql';

const SearchProducts = () => {
  const IMG_PATH = '../../assets/images';
  const [_state, _dispatch] = useReducer(reducer, initialState);

  const [data, isLoading, isError] = GetQueryResult(_state.keyword);

  const navigate = useNavigate();

  //쇼피 쿼리 `https://shopee.vn/search?keyword=${query}`

  useEffect(() => {
    return () => {
      _dispatch({ type: ActionKind.InitializeState });
    };
  }, []);

  // TODO: iframeScreen & montlySearchVolum 합칠 수 있는 방법 생각하기
  // const iframeScreen = useMemo(() => {
  //   if (isFalsy(_state.isSearched) && _state.text) {
  //     _dispatch({ type: ActionKind.SwitchMode, payload: true });
  //   }
  // }, [data]);

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
      console.log('is this called?');
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

  return (
    <Fragment>
      <div className='absolute left-0 top-0 block lg:hidden'>
        <img src={`${IMG_PATH}/Background.png`} alt='' />
      </div>

      <div className='relative col-span-6 grid items-center'>
        <div className='max-w-[480px] pb-11  lg:pb-6'>
          <div className=' xs:col-span-full col-span-5  col-start-2 px-8 py-[22px] px-5 pb-5 pt-[54px] sm:col-span-8 sm:col-start-3 sm:px-0 md:col-span-6 md:col-start-4 md:px-0 md:py-[42px] lg:pt-[22px]'>
            <div className='mb-6'>
              <h1 className='break-keep text-3XL/Bold lg:text-2XL/Bold'>
                <span className='text-primary-red-orange'>Shopee</span>에서&nbsp;
                <span className='text-primary-red-orange'>상위 노출</span>을 원하는&nbsp;
                <span className='text-primary-red-orange'>키워드</span>를 입력해주세요.
              </h1>
            </div>
            <div className='mb-16 lg:mb-6'>
              <div className='mb-2 flex items-center'>
                <ReactSVG src='assets/icons/VietnamFlag.svg' className='pr-[8px]' />
                <select
                  name='country'
                  id='country'
                  className='bg-transparent py-3 text-S/Medium'
                >
                  <option value={CountryType.Vn} defaultValue={CountryType.Vn}>
                    Vietnam
                  </option>
                </select>
              </div>
              <div className='form-control'>
                <div className='input-group'>
                  <div className=' w-full !rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                    <input
                      type='text'
                      placeholder='키워드를 입력해주세요.'
                      value={_state.text}
                      onChange={(event) => getKeyword(event, _dispatch)}
                      onKeyDown={(event) => queryKeyword(_state.text, _dispatch, event)}
                      className='input-bordered input h-full  w-full w-full rounded-r-none border-0 bg-white lg:text-S/Medium'
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
            <div className='mb-6 rounded-2xl border border-grey-300 bg-white px-6 py-5 '>
              <div className='mb-5 lg:mb-4'>
                <h3 className='text-L/Medium lg:text-S/Regular'>
                  월간 검색량
                  <ReactSVG
                    id='anchor-montly-search-volum'
                    src='assets/icons/Help.svg'
                    className='ml-[7px] inline-block'
                  />
                  <Tooltip
                    anchorId='anchor-montly-search-volum'
                    html='키워드의 최근 30일간 검색량을 나타내요. <br/> 키워드에 대한 수요를 정량적으로 알 수 있어요.'
                    place='right'
                  />
                </h3>
              </div>
              <div>
                <span
                  className={`text-4XL/Bold text-grey-${
                    _state.isSearched ? 900 : 300
                  } lg:text-3XL/medium`}
                >
                  <p className={`text-4XL/Bold text-grey-300 lg:text-3XL/medium`}></p>
                  {montlySearchVolum}
                </span>
              </div>
            </div>
            <div className='mb-6  rounded-2xl border border-grey-300 bg-white px-6 py-5 lg:mb-4'>
              <div className='mb-5 lg:mb-4'>
                <h3 className='text-L/Medium lg:text-M/Regular'>
                  이런 키워드들은 어때요?
                  <ReactSVG
                    id='anchor-keyword-tip'
                    src='assets/icons/Help.svg'
                    className='ml-[7px] inline-block'
                  />
                  <Tooltip
                    anchorId='anchor-keyword-tip'
                    html='키워드와 함께 가장 많이 검색되는 연관성이 높은 키워드들이에요.'
                    place='right'
                  />
                </h3>
              </div>
              <div className='h-[150px] overflow-x-auto'>
                <ul className='overflow-y-hidden text-center'>
                  {Array.isArray(relativeKeyword)
                    ? relativeKeyword.map((keyword) => {
                        if (typeof keyword === 'number') {
                          return (
                            <li
                              key={`${keyword}_dummy`}
                              className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-grey-300 bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6'
                            />
                          );
                        }
                        return (
                          <Fragment key={`${keyword.id}`}>
                            <li
                              id={`anchor-sub-montly-keyword-volumn-${keyword.id}`}
                              className='float-left mb-3 h-[38px] cursor-pointer  rounded-[50px]  border border-grey-300 px-[10%] leading-9 odd:mr-[4%] hover:bg-grey-200 hover:text-orange-500 lg:mb-2 lg:h-6'
                              onClick={() => queryKeywordByClick(keyword.text, _dispatch)}
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

            <div>
              <button
                className={`w-full rounded-md bg-primary-red-orange py-4 ${
                  _state.keyword === '' && 'opacity-30'
                }`}
              >
                <span className='text-L/Bold text-white'>
                  {_state.keyword
                    ? `'${_state.keyword}'로 리포트 생성하기`
                    : '리포트 생성하기'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-6 w-full self-center md:hidden'>
        {_state.isSearched && _state.keyword ? (
          <iframe
            src={`https://shopee.vn/search?keyword=${_state.keyword}`}
            className='h-[960px] w-[445px]  rounded-2xl pt-[8px]'
            allow='accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture'
            sandbox='allow-same-origin allow-scripts'
          />
        ) : (
          <img src={`${IMG_PATH}/Img-Skeleton.png`} className='max-w-[460px]' />
        )}
      </div>
    </Fragment>
  );
};
export default SearchProducts;
