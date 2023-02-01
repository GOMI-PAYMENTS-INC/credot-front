import { useRef, Fragment, useReducer, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactSVG } from 'react-svg';

import { isFalsy } from '@/utils/isFalsy';
import { getKeyword, queryKeyword } from '@/containers/search';
import { ActionKind, initialState, reducer } from '@/containers/search/reducer';
import { CountryType } from '@/generated/graphql';

const SearchProducts = () => {
  const IMG_PATH = '../../assets/images';
  const [_state, _dispatch] = useReducer(reducer, initialState);

  const keywordRef = useRef({ text: '', contury: CountryType.Vn });
  const navigate = useNavigate();

  //쇼피 쿼리 `https://shopee.vn/search?keyword=${query}`

  useEffect(() => {
    return () => {
      _dispatch({ type: ActionKind.InitializeState });
    };
  }, []);

  const iframeScreen = useMemo(() => {
    if (isFalsy(_state.isSearched) && keywordRef.current.text) {
      _dispatch({ type: ActionKind.SwitchMode, payload: true });
    }

    if (isFalsy(_state.text) === false) {
      _dispatch({ type: ActionKind.SearchKeyword, payload: keywordRef.current.text });
    }
  }, [keywordRef.current.text]);

  iframeScreen;

  return (
    <Fragment>
      <div className='block lg:hidden'>
        <img src={`${IMG_PATH}/Background.png`} alt='' />
      </div>
      <div className='col-start-1 col-end-6 border border-gray-300'>
        <div className='grid-12 relative items-center  justify-items-center  pb-11 lg:pb-6'>
          <div className=' col-span-5 col-start-2  px-8 py-[22px] px-5 pb-5 pt-[54px] lg:pt-[22px] md:col-span-6 md:col-start-4 md:px-0 md:py-[42px] sm:col-span-8 sm:col-start-3 sm:px-0 xs:col-span-full'>
            <div className='mb-6'>
              <h1 className='break-keep text-3XL/Bold lg:text-2XL/Bold'>
                <span className='text-primary-red-orange'>Shopee</span>에서
                <span className='text-primary-red-orange'>상위 노출</span>을 원하는
                <span className='text-primary-red-orange'>키워드</span>를 입력하세요.
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
                      onChange={(event) => getKeyword(keywordRef, event)}
                      onKeyDown={(event) => queryKeyword(keywordRef, event, _dispatch)}
                      className='input-bordered input h-full  w-full w-full rounded-r-none border-0 bg-white lg:text-S/Medium'
                    />
                  </div>
                  <button className='btn-square btn border-none bg-gradient-to-r from-orange-500 to-[#FF7500]'>
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
            <div className='mb-6 rounded-2xl border border-gray-300 bg-white px-6 py-5 '>
              <div className='mb-5 lg:mb-4'>
                <h3 className='text-L/Medium lg:text-S/Regular'>
                  월간 검색량
                  <ReactSVG
                    src='assets/icons/Help.svg'
                    className='ml-[7px] inline-block'
                  />
                </h3>
              </div>
              <div>
                <span className='text-4XL/Bold text-gray-300 lg:text-3XL/medium'>
                  ???
                </span>
              </div>
            </div>
            <div className='mb-6  rounded-2xl border border-gray-300 bg-white px-6 py-5 lg:mb-4'>
              <div className='mb-5 lg:mb-4'>
                <h3 className='text-L/Medium lg:text-M/Regular'>
                  이런 키워드들은 어때요?
                  <ReactSVG
                    src='assets/icons/Help.svg'
                    className='ml-[7px] inline-block'
                  />
                </h3>
              </div>
              <div>
                <ul className='overflow-y-hidden'>
                  <li className='float-left mb-3 h-[38px] w-[36%] rounded-[50px] border border-gray-300 bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  <li className='float-left mb-3 h-[38px] w-[60%] rounded-[50px] border border-gray-300  bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  <li className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-gray-300  bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  <li className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-gray-300 bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  <li className='float-left mb-3 h-[38px] w-[28%] rounded-[50px] border border-gray-300  bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  <li className='float-left mb-3 h-[38px] w-[68%] rounded-[50px] border border-gray-300 bg-gray-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                </ul>
              </div>
            </div>

            <div>
              <button className='w-full rounded-md bg-primary-red-orange py-4'>
                <span className='text-L/Bold text-white'>리포트 생성하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-start-7 col-end-12 border border-gray-300'>
        {_state.isSearched && _state.text ? (
          <iframe
            src={`https://shopee.vn/search?keyword=${_state.text}`}
            className='h-full w-full'
            allow='accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture'
            sandbox='allow-same-origin allow-scripts'
          />
        ) : (
          <img
            src={`${IMG_PATH}/Img-Skeleton.png`}
            alt=''
            className='h-full  max-w-[460px]'
          />
        )}
      </div>
    </Fragment>
  );
};
export default SearchProducts;
