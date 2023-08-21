import { KeyboardEvent, useEffect, useState } from 'react';
import { Default as Layout } from '@/common/layouts';
import { SearchResult, NoneKeyword } from '@/search/newSearch/elements';
import { Selector } from '@/report/keyword/elements/Selector';
import {
  convertSortByIconPath,
  convertCountryIconPath,
  convertSortedType,
} from '@/utils/convertEnum';
import { convertSearchPlaceholder, updateSearchPayload } from '@/search/container';
import { convertCountry } from '@/utils/convertEnum';
import UseTooltip from '@/components/UseTooltip';

import { ReactSVG } from 'react-svg';
import { getQueryResult } from '@/search/newSearch/api';
import { useForm } from 'react-hook-form';
import { CountryType, SORTING_TYPE, COUNTRY } from '@/search/newSearch/constants';
import { SearchTooltips } from '@/search/elements/Tooltip';

import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

export const NSearchKeywords = () => {
  const { Search } = SearchTooltips();

  const [searchState, setSearchState] = useState<TSearchProps>({
    country: CountryType.SG,
    sortBy: SORTING_TYPE[0].value,
    keyword: '',
    images: null,
  });

  const { register, getValues, setValue } = useForm<{ keyword: string }>({
    mode: 'onChange',
    defaultValues: { keyword: '' },
  });

  const { response } = getQueryResult(searchState, setSearchState);

  useEffect(() => {
    const cachingData = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);
    if (isFalsy(searchState.keyword) && cachingData) {
      return setSearchState(cachingData);
    }

    if (searchState.keyword) {
      setValue('keyword', searchState.keyword || cachingData.keyword);
    }
  }, [searchState.keyword]);
  const searchCss = searchState.keyword ? 'flex-col items-start' : 'items-center';
  const searchInputCss = searchState.keyword ? 'mb-5' : '';
  return (
    <Layout>
      <div className='flex h-full w-full flex-col items-center bg-grey-50'>
        <div className='absolute right-0 bottom-0 block '>
          <img src='/assets/images/NBackground.png' />
        </div>
        <section
          className={`w-[1075px] overflow-hidden pt-[128px] ${
            searchState.keyword ? 'mx-[192px] flex gap-[58px]' : 'mx-[180px] h-full'
          }`}
        >
          <div
            id='searchBox'
            className={`flex flex-col rounded-[20px] border-[1px] bg-white py-4 px-[30px] ${
              searchState.keyword ? 'w-[507px]' : ''
            }`}
          >
            <div className={`flex w-full  justify-between ${searchCss}`}>
              <div className={`${searchInputCss} flex items-center gap-4`}>
                <Selector
                  minWidth={133}
                  value={convertCountry(searchState.country)}
                  isUseIcon={true}
                  iconPath={convertCountryIconPath(searchState.country)}
                  options={COUNTRY}
                  onClickOption={(value) => {
                    return updateSearchPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'country',
                      params: value as TSearchCountry,
                    });
                  }}
                />
                <Selector
                  minWidth={133}
                  value={convertSortedType(searchState.sortBy)}
                  isUseIcon={true}
                  iconPath={convertSortByIconPath(searchState.sortBy)}
                  options={SORTING_TYPE}
                  onClickOption={(value) => {
                    return updateSearchPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'sortBy',
                      params: value as TSortBy,
                    });
                  }}
                />

                <UseTooltip content={Search} />
              </div>

              <div id='keywordSearchInput' className='w-[476px]'>
                <div className='form-control'>
                  <div className='input-group'>
                    <div className='w-full rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                      <input
                        type='text'
                        placeholder={convertSearchPlaceholder(CountryType.MY)}
                        {...register('keyword')}
                        onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                          if (event.key === 'Enter') {
                            const keyword = getValues('keyword');
                            return updateSearchPayload({
                              _state: searchState,
                              _dispatch: setSearchState,
                              key: 'keyword',
                              params: keyword,
                            });
                          }
                        }}
                        className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                      />
                    </div>
                    <button
                      onClick={() => {
                        const keyword = getValues('keyword');
                        return updateSearchPayload({
                          _state: searchState,
                          _dispatch: setSearchState,
                          key: 'keyword',
                          params: keyword,
                        });
                      }}
                      className='btn-square btn border-none bg-gradient-to-r from-orange-500 to-[#FF7500]'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/Search.svg'
                        beforeInjection={(svg) =>
                          svg.setAttribute('class', 'h-6 w-6 fill-white')
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id='result'
            className={`${searchState.keyword ? 'self-start' : 'mt-[30px]'} flex w-full`}
          >
            {searchState.keyword ? (
              <SearchResult />
            ) : (
              <NoneKeyword _state={searchState} _dispatch={setSearchState} />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};
