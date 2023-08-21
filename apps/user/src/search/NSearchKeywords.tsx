import { KeyboardEvent, useState } from 'react';
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
import { Default as Layout } from '@/common/layouts';
import { Keyword, NoneKeyword } from '@/search/newSearch/elements';
import { getQueryResult } from '@/search/newSearch/api';

import { useForm } from 'react-hook-form';
import { CountryType, SORTING_TYPE, COUNTRY } from '@/search/newSearch/constants';

import { SearchTooltips } from '@/search/elements/Tooltip';

export const NSearchKeywords = () => {
  const { Search } = SearchTooltips();

  const [payload, setPayload] = useState<TSearchPayload>({
    country: CountryType.SG,
    sortBy: SORTING_TYPE[0].value,
    keyword: '',
    images: null,
  });

  const { register, getValues } = useForm<{ keyword: string }>({
    mode: 'onChange',
    defaultValues: { keyword: '' },
  });

  const { response } = getQueryResult(payload, setPayload);
  console.log(response, 'reponse');

  return (
    <Layout>
      <div className='flex h-full w-full flex-col items-center bg-grey-50'>
        <div className='absolute right-0 bottom-0 block '>
          <img src='/assets/images/NBackground.png' />
        </div>
        <section className='mx-[192px] h-full max-w-[1060px] overflow-hidden pt-[128px]'>
          <div
            id='searchBox'
            className='flex flex-col rounded-[20px] border-[1px] bg-white py-4 px-[30px]'
          >
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Selector
                  minWidth={133}
                  value={convertCountry(payload.country)}
                  isUseIcon={true}
                  iconPath={convertCountryIconPath(payload.country)}
                  options={COUNTRY}
                  onClickOption={(value) => {
                    return updateSearchPayload({
                      _state: payload,
                      _dispatch: setPayload,
                      key: 'country',
                      params: value as TSearchCountry,
                    });
                  }}
                />
                <Selector
                  minWidth={133}
                  value={convertSortedType(payload.sortBy)}
                  isUseIcon={true}
                  iconPath={convertSortByIconPath(payload.sortBy)}
                  options={SORTING_TYPE}
                  onClickOption={(value) => {
                    return updateSearchPayload({
                      _state: payload,
                      _dispatch: setPayload,
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
                              _state: payload,
                              _dispatch: setPayload,
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
                          _state: payload,
                          _dispatch: setPayload,
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

          <div id='result' className='mt-[30px] flex w-full'>
            <NoneKeyword />
          </div>
        </section>
      </div>
    </Layout>
  );
};
