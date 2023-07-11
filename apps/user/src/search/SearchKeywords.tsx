import { Fragment, KeyboardEvent, useEffect, useMemo, useReducer, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { Default } from '@/common/layouts/Default';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { SearchModal, SearchKeywordTranslator } from '@/search/elements';
import {
  CACHING_KEY,
  COUNTRY_TYPE,
  MODAL_SIZE_ENUM,
  SORT_BY_TYPE,
} from '@/types/enum.code';

import {
  initializeState,
  queryKeyword,
  queryKeywordByClick,
  switchModal,
} from '@/search/container';
import { SEARCH_ACTION } from '@/search/reducer';
import { searchInitialState, searchReducer } from '@/search/reducer';
import { getQueryResult } from '@/search/api';

import { isFalsy } from '@/utils/isFalsy';
import { formatNumber } from '@/utils/formatNumber';
import { SearchKeywordImages } from '@/search/elements/SearchKeywordImages';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { isTruthy } from '@/utils/isTruthy';

import { useForm } from 'react-hook-form';
import {
  _amplitudeCountryChanged,
  _amplitudeRecKeywordSearched,
  _amplitudeSortByChanged,
} from '@/amplitude/amplitude.service';
import {
  convertCountry,
  convertCountryIconPath,
  convertSortByIconPath,
  convertSortedType,
} from '@/utils/convertEnum';
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
    sortBy: TSortBy;
    keyword: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      country: searchInitialState.country,
      sortBy: searchInitialState.sortBy,
    },
  });

  const countryWatcher = watch('country');
  const sortByWatcher = watch('sortBy');
  const keywordWatcher = watch('keyword');

  const { response, isLoading } = getQueryResult(
    _state.country,
    _state.sortBy,
    _state.keyword,
    _dispatch,
  );

  useEffect(() => {
    const preKeyword: TSearchState = useSessionStorage.getItem(
      CACHING_KEY.STORED_KEYWORD,
    );

    if (isFalsy(preKeyword) === false) initializeState(preKeyword, _dispatch, setValue);
  }, []);

  useEffect(() => {
    if (requestReport === false) return;
    void switchModal({
      _dispatch,
      _state,
      data: response,
      _setTrigger: setRequestReport,
    });
  }, [requestReport]);

  const monthlySearchVolume = useMemo(() => {
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
        <div className='flex h-full items-center justify-center'>
          <div className='scale-[0.3]'>
            <div id='loader' />
          </div>
        </div>
      );
    }
    if (response) {
      const { relations } = response;
      if (isFalsy(relations)) {
        return (
          <div className='flex h-full items-center justify-center rounded-md bg-grey-200 text-L/Medium text-grey-700'>
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

  const monthlySearchColor =
    monthlySearchVolume === '???'
      ? 'text-3XL/Bold text-grey-300'
      : 'text-3XL/Bold text-grey-900';

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

  const sortByOptions = () => {
    let result: TDropDownOption[] = [];
    const keys = Object.keys(SORT_BY_TYPE);
    keys.map((sortBy) => {
      const sortByEnum = SORT_BY_TYPE[sortBy as keyof typeof SORT_BY_TYPE];

      result.push({
        value: sortByEnum,
        text: convertSortedType(sortByEnum),
        iconPath: convertSortByIconPath(sortByEnum),
      });
    });
    return result;
  };

  const onClickCountryOption = (countryCode: any) => {
    const CountryTypeEnum: CountryType = countryCode;

    setValue('country', CountryTypeEnum);

    if (isFalsy(keywordWatcher) === false) {
      queryKeyword(CountryTypeEnum, sortByWatcher, getValues('keyword'), _dispatch);
    }

    _amplitudeCountryChanged(countryWatcher, CountryTypeEnum);
  };
  const onClickSortOption = (sortBy: any) => {
    setValue('sortBy', sortBy);

    _dispatch({
      type: SEARCH_ACTION.CHANGE_SORT_BY,
      payload: sortBy,
    });

    const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);
    if (isFalsy(preKeyword) === false) {
      preKeyword.sortBy = sortBy;
      useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, preKeyword);
    }

    const SortTypeEnum: TSortBy = sortBy;
    _amplitudeSortByChanged(sortByWatcher, SortTypeEnum);
  };

  const convertSearchPlaceholder = (country: CountryType) => {
    switch (country) {
      case CountryType.Sg:
        return 'shampoo';
      case CountryType.My:
        return 'phone charger';
      case CountryType.Tw:
        return '馬克杯收納';
      case CountryType.Vn:
        return 'gấu bông';
      case CountryType.Th:
        return 'มะม่วงอบแห้ง';
      default:
        console.error('enum 코드를 확인해주세요.');
        return '';
    }
  };

  const KeywordSearchToolTip = useMemo(() => {
    return (
      <div className='flex flex-col p-3 text-S/Regular'>
        <p className='text-S/Bold'>국가</p>
        <p>키워드를 분석할 Shopee 국가 </p>
        <br />
        <p className='text-S/Bold'>수집기준</p>
        <p>데이터를 수집할 키워드 검색결과의 상품 정렬 기준</p>
        <ul className='ml-5 list-disc'>
          <li>연관도순: 키워드 검색 시 기본값으로 노출되는 상품순</li>
          <li>판매량순: 키워드 검색 후 판매량순으로 정렬 시 노출되는 상품순</li>
        </ul>
      </div>
    );
  }, []);

  return (
    <Default>
      <ModalComponent isOpen={_state.isModalOpen}>
        <SearchModal
          _state={_state}
          _dispatch={_dispatch}
          data={response}
          size={MODAL_SIZE_ENUM.LARGE}
          _setTrigger={setRequestReport}
        />
      </ModalComponent>
      <div className='relative m-auto h-full w-full max-w-[978px] items-center pt-[84px]'>
        <div className='absolute left-1/2 top-0 z-[-1] block translate-x-[-50%]'>
          <img src='/assets/images/Background.png' />
        </div>

        <div className=''>
          <div>
            <h1 className='break-keep text-center text-3XL/Bold'>
              <span className='text-orange-500'>키워드 검색 </span> 후
              <br />
              <span className='text-orange-500'>리포트를 생성</span>해 주세요.
            </h1>
          </div>
          <div className='m-auto w-full max-w-[580px] px-[50px]'>
            <div className='mt-6 flex items-center justify-center'>
              <DropDown
                name='country'
                minWidth={120}
                value={convertCountry(countryWatcher)}
                iconPath={convertCountryIconPath(countryWatcher)}
                isUseIcon={true}
                options={countryOptions()}
                status={DROPDOWN_STATUS.FILLED}
                variants={DROPDOWN_VARIANTS.CLEAR}
                onClickOption={onClickCountryOption}
              ></DropDown>
              <DropDown
                name='filterOption'
                minWidth={120}
                value={convertSortedType(sortByWatcher)}
                isUseIcon={true}
                iconPath={convertSortByIconPath(sortByWatcher)}
                options={sortByOptions()}
                status={DROPDOWN_STATUS.FILLED}
                variants={DROPDOWN_VARIANTS.CLEAR}
                onClickOption={onClickSortOption}
              ></DropDown>
              <div className='tooltip-container'>
                <a data-tooltip-id='anchor-keyword-search-volum'>
                  <ReactSVG
                    src='assets/icons/outlined/QuestionCircle.svg'
                    className='ml-[7px] inline-block'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                    }}
                  />
                </a>
                <Tooltip
                  render={() => KeywordSearchToolTip}
                  id='anchor-keyword-search-volum'
                  place='right'
                  variant='light'
                />
              </div>
            </div>

            <div>
              <div className='form-control mt-2'>
                <div className='input-group'>
                  <div className=' w-full !rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                    <input
                      type='text'
                      placeholder={convertSearchPlaceholder(countryWatcher)}
                      {...register('keyword')}
                      onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                          queryKeyword(
                            countryWatcher,
                            sortByWatcher,
                            getValues('keyword'),
                            _dispatch,
                          );
                        }
                      }}
                      className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                    />
                  </div>
                  <button
                    onClick={() =>
                      queryKeyword(
                        countryWatcher,
                        sortByWatcher,
                        getValues('keyword'),
                        _dispatch,
                      )
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
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          <button
            className={`w-full max-w-[480px] rounded-md bg-orange-500 py-4 ${
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
              <span className='text-L/Bold text-white'>{reportCreatorButtonText}</span>
            )}
          </button>
        </div>
        <div className='mt-12'>
          {isFalsy(monthlySearchVolume) ? (
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
              <div className='mb-6 border border-grey-300 bg-white text-S/Regular text-grey-800 '>
                <p className='p-3'>
                  아래는 키워드에 대한 간략한 정보에요. 보다 상세한 분석을 위해 상단의
                  <span className='ml-1 text-orange-500'>
                    리포트 생성하기 버튼을 눌러주세요.
                  </span>
                </p>
              </div>
              <div className='flex gap-x-[18px] pb-[100px]'>
                <div className='flex grow basis-1/2 flex-wrap gap-y-6'>
                  <div className='grow basis-full rounded-2xl border border-grey-300 bg-white px-6 py-5'>
                    <div className=''>
                      <h3 className='text-L/Medium'>
                        월간 검색량
                        <a
                          data-tooltip-id='anchor-montly-search-volum'
                          data-tooltip-html='키워드의 최근 30일간 검색량을 나타내요. <br/> 키워드에 대한 수요를 정량적으로 알 수 있어요.'
                        >
                          <ReactSVG
                            src='assets/icons/outlined/QuestionCircle.svg'
                            className='ml-[7px] inline-block'
                            beforeInjection={(svg) => {
                              svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                            }}
                          />
                        </a>
                        <Tooltip
                          id='anchor-montly-search-volum'
                          place='right'
                          variant='light'
                        />
                      </h3>
                    </div>
                    <div className='mt-5'>
                      <span className={monthlySearchColor}>{monthlySearchVolume}</span>
                    </div>
                  </div>
                  <SearchKeywordImages
                    images={_state.productImages ? _state.productImages : null}
                    keyword={_state.keyword}
                  />
                </div>
                <div className='flex grow basis-1/2 flex-col rounded-2xl border border-grey-300 bg-white px-6 py-5'>
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='text-L/Medium'>
                        연간 키워드
                        <a
                          data-tooltip-id='relation-keyword-tip'
                          data-tooltip-html='키워드와 함께 가장 많이 검색되는 연관성이 높은 키워드들이에요.'
                        >
                          <ReactSVG
                            src='assets/icons/outlined/QuestionCircle.svg'
                            className='ml-[7px] inline-block'
                            beforeInjection={(svg) => {
                              svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                            }}
                          />
                        </a>
                        <Tooltip
                          id='relation-keyword-tip'
                          place='right'
                          variant='light'
                        />
                      </h3>
                    </div>
                    <div className='text-L/Medium'>검색량</div>
                  </div>

                  <div
                    id='scrollbar'
                    className='mt-5 h-full max-h-[324px] overflow-x-auto'
                  >
                    {Array.isArray(relativeKeyword) ? (
                      <ul className='overflow-y-hidden text-center'>
                        {relativeKeyword.map((keyword) => {
                          if (typeof keyword === 'number') {
                            return (
                              <li
                                key={`${keyword}_dummy`}
                                className='flex h-[54px] items-center justify-between rounded-md bg-white p-2 odd:bg-grey-200 '
                              >
                                <div className='flex h-full w-full max-w-[227px] items-center gap-x-1'>
                                  <div className='h-full w-full max-w-[155px] rounded-[50px] border border-grey-300 bg-grey-300 '></div>
                                  <div className='h-[26px] w-full max-w-[68px] rounded-[7px] bg-grey-400'></div>
                                </div>

                                <div className='h-[26px] w-full max-w-[68px] rounded-[7px] bg-grey-400'></div>
                              </li>
                            );
                          }
                          return (
                            <Fragment key={`${keyword.id}`}>
                              <li
                                className='flex h-[54px] cursor-pointer items-center justify-between rounded-md bg-white p-2 odd:bg-grey-200 hover:bg-orange-100'
                                onClick={() => {
                                  queryKeywordByClick(
                                    _state.country,
                                    keyword.text,
                                    _dispatch,
                                    setValue,
                                  );

                                  _amplitudeRecKeywordSearched(
                                    _state.country,
                                    sortByWatcher,
                                    keyword.text,
                                  );
                                }}
                              >
                                <div className='flex h-full w-full items-center gap-x-1'>
                                  <div className='flex h-full items-center justify-center rounded-[50px] border border-grey-300 bg-white px-[19px] py-[6px] text-L/Medium'>
                                    {keyword.text}
                                  </div>
                                  <div className='text-M/Medium text-orange-400'>
                                    {/*케이스*/}
                                  </div>
                                </div>

                                <div className='text-L/Medium text-grey-700'>
                                  {keyword.count && formatNumber(keyword.count)}
                                </div>
                              </li>
                            </Fragment>
                          );
                        })}
                      </ul>
                    ) : (
                      relativeKeyword
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <SearchKeywordTranslator
        _searchDispatch={_dispatch}
        searchCountry={getValues('country')}
        searchSortBy={getValues('sortBy')}
        updateSearchKeyword={setValue}
      />
    </Default>
  );
};
export default SearchKeywords;
