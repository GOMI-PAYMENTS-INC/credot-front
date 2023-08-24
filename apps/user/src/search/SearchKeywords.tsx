import { Fragment, KeyboardEvent, useEffect, useMemo, useReducer, useState } from 'react';
import { Default } from '@/common/layouts/Default';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { SearchModal, SearchKeywordTranslator, HotKeyword } from '@/search/elements';
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
  convertSearchPlaceholder,
} from '@/search/container';
import { mobileScrollToTop } from '@/utils/scrollController';
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
import UseTooltip from '@/components/UseTooltip';
import { SearchTooltips } from '@/search/elements/Tooltip';
import { switchModal, searchRequestHandler } from '@/search/elements/container';

const SearchKeywords = () => {
  const [_state, _dispatch] = useReducer(searchReducer, searchInitialState);
  const [requestReport, setRequestReport] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { Search, Monthly, RelativeKeyword } = SearchTooltips();

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
    mobileScrollToTop(window.innerWidth);
    if (isFalsy(preKeyword) === false) initializeState(preKeyword, _dispatch, setValue);
  }, []);

  useEffect(() => {
    if (requestReport === false) return;

    searchRequestHandler({
      _state,
      _dispatch,
      parameter: {
        count: response?.main.count,
        reportInvokeId: response?.reportInvokeId,
      },
      _setTrigger: setRequestReport,
    });

    switchModal({
      _dispatch,
      _setTrigger: setRequestReport,
    });
  }, [requestReport]);

  const isFetching = isFalsy(_state.keyword) === false && isLoading === true;
  const monthlySearchVolume = useMemo(() => {
    if (isFalsy(_state.keyword) && isLoading === true) {
      return '???';
    }
    if (isFetching) {
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
    if (isFetching) {
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
      <div className='relative m-auto h-full w-full max-w-[978px] items-center pt-[84px] xs:pt-[65px]'>
        <div className='absolute left-1/2 top-0 z-[-1] block translate-x-[-50%] xs:hidden'>
          <img src='/assets/images/Background.png' />
        </div>

        <div
          className='xs: flex justify-between xs:flex-col xs:justify-center xs:bg-grey-50 xs:px-5'
          style={_state.keyword ? {} : { marginTop: '25px' }}
        >
          <div className='w-[525px] xs:w-full'>
            <div>
              <div className={`xs:${_state.keyword ? 'hidden' : 'mt-5'}`}>
                <h1 className='break-keep text-center text-3XL/Bold xs:text-XL/Bold'>
                  <span className='text-orange-500'>키워드 검색 </span> 후
                  <br />
                  <span className='text-orange-500'>리포트를 생성</span>해 주세요.
                </h1>
              </div>

              <div
                id='dropDownAndSearch'
                className='relative m-auto w-full max-w-[580px] xs:flex xs:h-[144px] xs:max-w-[430px] xs:items-start xs:justify-around xs:overflow-visible'
              >
                <div className='sticky top-[118px] mt-6 xs:block xs:px-8 xs:pb-5 xs:shadow-[0_2px_6px_0_rgba(0,0,0,0.08)]'>
                  <div className='flex items-center justify-center gap-4'>
                    <DropDown
                      setIsOpenDropdown={setIsOpenDropdown}
                      borderLine={true}
                      name='country'
                      minWidth={152}
                      value={convertCountry(countryWatcher)}
                      iconPath={convertCountryIconPath(countryWatcher)}
                      isUseIcon={true}
                      options={countryOptions()}
                      status={DROPDOWN_STATUS.FILLED}
                      variants={DROPDOWN_VARIANTS.CLEAR}
                      onClickOption={onClickCountryOption}
                    />
                    <DropDown
                      setIsOpenDropdown={setIsOpenDropdown}
                      borderLine={true}
                      name='filterOption'
                      minWidth={152}
                      value={convertSortedType(sortByWatcher)}
                      isUseIcon={true}
                      iconPath={convertSortByIconPath(sortByWatcher)}
                      options={sortByOptions()}
                      status={DROPDOWN_STATUS.FILLED}
                      variants={DROPDOWN_VARIANTS.CLEAR}
                      onClickOption={onClickSortOption}
                    />
                    <UseTooltip content={Search} />
                  </div>
                  <div id='keywordSearchInput'>
                    <div className='form-control mt-4'>
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
            </div>

            <div
              id='reportRequestButton'
              className={`mt-7 flex xs:fixed xs:bottom-0 xs:left-0 xs:mb-[35px] xs:w-full xs:px-5`}
            >
              <button
                className={`w-full rounded-md bg-orange-500 py-4 ${
                  (_state.keyword === '' || isMonthlyCountZero) &&
                  'opacity-30 xs:hidden xs:bg-orange-200'
                } ${isOpenDropdown && 'z-[-1]'}`}
                disabled={_state.keyword === '' || isMonthlyCountZero || isFetching}
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
          </div>
          <div className='xs:hidden'>
            <HotKeyword
              country={getValues('country') as TSearchCountry}
              searchSortBy={getValues('sortBy')}
              _dispatch={_dispatch}
              setValue={setValue}
            />
          </div>
        </div>

        <div className={`mt-12 xs:${isFalsy(_state.keyword) && 'hidden'}`}>
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
              <div className='mb-6 border border-grey-300 bg-white text-S/Regular text-grey-800 xs:hidden'>
                <p className='p-3'>
                  아래는 키워드에 대한 간략한 정보에요. 보다 상세한 분석을 위해 상단의
                  <span className='ml-1 text-orange-500'>
                    리포트 생성하기 버튼을 눌러주세요.
                  </span>
                </p>
              </div>
              <div
                className={`flex gap-x-[18px] pb-[100px] xs:mx-5 xs:flex xs:flex-col xs:gap-x-0 xs:pb-0`}
              >
                <div className='flex grow basis-1/2 flex-wrap gap-y-6'>
                  <div className='grow basis-full rounded-2xl border border-grey-300 bg-white px-6 py-5'>
                    <div className='flex items-center'>
                      <h3 className='text-L/Medium'>월간 검색량</h3>
                      <UseTooltip content={Monthly} />
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

                <div className='flex grow basis-1/2 flex-col rounded-2xl border border-grey-300 bg-white px-6 py-5 xs:mt-[30px] xs:px-3 xs:py-2.5'>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <h3 className='text-L/Medium'>연관 키워드</h3>
                      <UseTooltip content={RelativeKeyword} />
                    </div>
                    <div className='text-L/Medium'>검색량</div>
                  </div>

                  <div
                    id='scrollbar'
                    className='mt-5 h-full max-h-[324px] overflow-x-auto xs:mt-2.5'
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
                                  {/* <div className='h-[26px] w-full max-w-[68px] rounded-[7px] bg-grey-400'></div> */}
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
                                  mobileScrollToTop(window.innerWidth);

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
        <div className='mt-[60px] hidden pb-[100px] xs:mt-[30px] xs:flex'>
          <HotKeyword
            country={getValues('country') as TSearchCountry}
            searchSortBy={getValues('sortBy')}
            _dispatch={_dispatch}
            setValue={setValue}
          />
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
