import { KeyboardEvent } from 'react';
import { Selector } from '@/report/keyword/elements/Selector';

import {
  convertSortByIconPath,
  convertCountryIconPath,
  convertSortedType,
} from '@/utils/convertEnum';
import {
  COUNTRY,
  CountryType,
  SORTING_TYPE,
  SORT_BY_TYPE,
} from '@/search/newSearch/constants';
import { convertSearchPlaceholder } from '@/search/container';
import type { UseFormRegister } from 'react-hook-form';
import { convertCountry } from '@/utils/convertEnum';
import UseTooltip from '@/components/UseTooltip';

import { ReactSVG } from 'react-svg';

interface ISearchObject {
  tooltip: JSX.Element;
  register: UseFormRegister<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>;
}

export const SearchObject = ({ tooltip, register }: ISearchObject) => {
  return (
    <div className='flex flex-col rounded-[20px] border-[1px] bg-white py-4 px-[30px]'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Selector
            minWidth={120}
            value={convertCountry(CountryType.VN)}
            isUseIcon={true}
            iconPath={convertCountryIconPath(CountryType.VN)}
            options={COUNTRY}
            onClickOption={(value) => {
              console.log(value);
            }}
          />
          <Selector
            minWidth={120}
            value={convertSortedType(SORT_BY_TYPE.R)}
            isUseIcon={true}
            iconPath={convertSortByIconPath(SORT_BY_TYPE.R)}
            options={SORTING_TYPE}
            onClickOption={(value) => {
              console.log(value);
            }}
          />

          <UseTooltip content={tooltip} />
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
                      // queryKeyword(
                      //   countryWatcher,
                      //   sortByWatcher,
                      //   getValues('keyword'),
                      //   _dispatch,
                      // );
                    }
                  }}
                  className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                />
              </div>
              <button
                onClick={() =>
                  // queryKeyword(
                  //   countryWatcher,
                  //   sortByWatcher,
                  //   getValues('keyword'),
                  //   _dispatch,
                  // )
                  {}
                }
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
  );
};
