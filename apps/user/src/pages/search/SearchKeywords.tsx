import { Fragment, KeyboardEvent, useEffect, useMemo, useReducer, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { Defalut as Layout } from '@/components/layouts/Defalut';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { SearchModal } from '@/pages/search/SearchModal';
import { COUNTRY_TYPE, MODAL_SIZE_ENUM } from '@/types/enum.code';
import { SearchKeywordTranslator } from '@/pages/search/SearchKeywordTranslator';

import {
  initializeState,
  queryKeyword,
  queryKeywordByClick,
  RECOMMENDER_ACTION,
  SEARCH_ACTION,
  switchModal,
} from '@/containers/search';
import { searchInitialState, searchReducer } from '@/containers/search/search.reducer';
import { getQueryResult } from '@/containers/search/search.api';

import { isFalsy } from '@/utils/isFalsy';
import { formatNumber } from '@/utils/formatNumber';
import { SearchKeywordImages } from '@/pages/search/SearchKeywordImages';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { isTruthy } from '@/utils/isTruthy';

import { useForm } from 'react-hook-form';
import {
  _amplitudeCountryChanged,
  _amplitudeRecKeywordSearched,
} from '@/amplitude/amplitude.service';
import { convertCountry, convertCountryIconPath } from '@/utils/convertEnum';
import DropDown, {
  DROPDOWN_STATUS,
  DROPDOWN_VARIANTS,
  TDropDownOption,
} from '@/components/dropDown';
import { CountryType } from '@/generated/graphql';

const SearchKeywords = () => {
  const [_state, _dispatch] = useReducer(searchReducer, searchInitialState);

  const [requestReport, setRequestReport] = useState(false);

  const { register, getValues, setValue, watch } = useForm<{
    country: CountryType;
    keyword: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      country: CountryType.Sg,
    },
  });

  const countryWatcher = watch('country');
  const keywordWatcher = watch('keyword');

  const { response, isLoading } = getQueryResult(
    _state.country,
    _state.keyword,
    _dispatch,
  );

  useEffect(() => {
    const preKeyword: TSearchState = useSessionStorage.getItem('keyword');
    if (isFalsy(preKeyword) === false) initializeState(preKeyword, _dispatch, setValue);
  }, []);

  useEffect(() => {
    if (requestReport === false) return;
    switchModal({ _dispatch, _state, data: response, _setTrigger: setRequestReport });
  }, [requestReport]);

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
    if (response) {
      const { count } = response.main;
      return formatNumber(count);
    }
  }, [response, isLoading, _state.keyword]);

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
    if (response) {
      const { relations } = response;
      if (isFalsy(relations)) {
        return (
          <div className='flex h-[150px] items-center justify-center rounded-md bg-grey-200 text-L/Medium text-grey-700'>
            연관 키워드가 없어요
          </div>
        );
      }
      return relations;
    }
  }, [response, isLoading, _state.keyword]);

  const isMonthlyCountZero = typeof response !== 'boolean' && response?.main.count === 0;

  const reportCreatorButtonText = useMemo(() => {
    if (isMonthlyCountZero === true) {
      return '수요가 없는 키워드에요. 다른 키워드를 검색해주세요';
    }

    if (isFalsy(_state.keyword)) {
      return '리포트 생성하기';
    }

    return `'${replaceOverLength(_state.keyword, 20)}'로 리포트 생성하기`;
  }, [_state.keyword, isMonthlyCountZero]);

  const montlySearchColor =
    montlySearchVolum === '???'
      ? 'text-4XL/Bold text-grey-300'
      : 'text-4XL/Bold text-grey-900';

  const countryOptions = () => {
    let result: TDropDownOption[] = [];
    const keys = Object.keys(COUNTRY_TYPE);
    keys.map((countryCode) => {
      const countryEnum = CountryType[countryCode as keyof typeof CountryType];

      result.push({
        value: countryEnum,
        iconPath: convertCountryIconPath(countryEnum),
        text: convertCountry(countryEnum),
      });
    });
    return result;
  };

  const sortOptions = () => {
    let result: TDropDownOption[] = [
      {
        value: '연관도순',
        text: '연관도순',
      },
    ];
    return result;
  };

  const onClickOption = (countryCode: any) => {
    const CountryTypeEnum: CountryType = countryCode;

    setValue('country', CountryTypeEnum);

    if (isFalsy(keywordWatcher) === false) {
      queryKeyword(CountryTypeEnum, getValues('keyword'), _dispatch);
    }

    _amplitudeCountryChanged(countryWatcher, CountryTypeEnum);
  };

  return (
    <Layout>
      <ModalComponent isOpen={_state.isModalOpen}>
        <SearchModal
          _state={_state}
          _dispatch={_dispatch}
          data={response}
          size={MODAL_SIZE_ENUM.LARGE}
          _setTrigger={setRequestReport}
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
                <span className='text-orange-600'>키워드 검색 </span>후
                <br />
                <span className='text-orange-600'>리포트를 생성</span>해주세요.
              </h1>
            </div>
            <div>
              <div className='mt-6 flex items-center'>
                <DropDown
                  name='country'
                  minWidth={120}
                  value={convertCountry(countryWatcher)}
                  iconPath={convertCountryIconPath(countryWatcher)}
                  // value={convertCountry(_state.country)}
                  // iconPath={convertCountryIconPath(_state.country)}
                  isUseIcon={true}
                  options={countryOptions()}
                  status={DROPDOWN_STATUS.FILLED}
                  variants={DROPDOWN_VARIANTS.CLEAR}
                  onClickOption={onClickOption}
                ></DropDown>
                <DropDown
                  name='filterOption'
                  minWidth={120}
                  value='연관도순'
                  isUseIcon={false}
                  options={sortOptions()}
                  status={DROPDOWN_STATUS.FILLED}
                  variants={DROPDOWN_VARIANTS.CLEAR}
                ></DropDown>
              </div>
              <div className='form-control mt-2'>
                <div className='input-group'>
                  <div className=' w-full !rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                    <input
                      type='text'
                      placeholder='gấu bông'
                      {...register('keyword')}
                      onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                          queryKeyword(countryWatcher, getValues('keyword'), _dispatch);
                        }
                      }}
                      className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                    />
                  </div>
                  <button
                    onClick={() =>
                      queryKeyword(countryWatcher, getValues('keyword'), _dispatch)
                    }
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
                    <span className={montlySearchColor}>
                      <p className={`text-4XL/Bold text-grey-300`}></p>
                      {montlySearchVolum}
                    </span>
                  </div>
                </div>
                <div className='mt-6 rounded-2xl border border-grey-300 bg-white px-6 pt-5'>
                  <div>
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
                  <div id='scrollbar' className='mt-6 h-[170px] overflow-x-auto'>
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
                                  onClick={() => {
                                    queryKeywordByClick(
                                      _state.country,
                                      keyword.text,
                                      _dispatch,
                                      setValue,
                                    );

                                    _amplitudeRecKeywordSearched(
                                      _state.country,
                                      keyword.text,
                                    );
                                  }}
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
                    onClick={() => setRequestReport(true)}
                  >
                    {requestReport || (isTruthy(_state.keyword) && isLoading) ? (
                      <div className=' scale-[0.2]'>
                        <div id='loader-white' />
                      </div>
                    ) : (
                      <span className='text-L/Bold text-white'>
                        {reportCreatorButtonText}
                      </span>
                    )}
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>

        <SearchKeywordImages
          images={_state.productImages ? _state.productImages : null}
          keyword={_state.keyword}
        />
      </div>

      <SearchKeywordTranslator
        _searchDispatch={_dispatch}
        searchCountry={countryWatcher}
        updateSearchKeyword={setValue}
      />
    </Layout>
  );
};
export default SearchKeywords;
