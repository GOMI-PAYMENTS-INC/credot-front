import { SetStateAction, useMemo, useState, type Dispatch } from 'react';

import { queryKeywordByClick, updateSearchPayload } from '@/search/container';
import { HOT_KEYWORD, TRANSLATED_KEYWORD } from '@/search/elements/hotKeywords';

import { convertCountry } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import type { UseFormSetValue } from 'react-hook-form';
import { _clientHotKeywordSearched } from '@/amplitude/amplitude.service';
import { replaceOverLength } from '@/utils/replaceOverLength';

interface IHotKeyword {
  country: TSearchCountry;
  _dispatch: Dispatch<TSearchActionType> | Dispatch<SetStateAction<TSearchProps>>;
  _state?: TSearchProps;
  setValue?: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>;
  searchSortBy: TSortBy;
}
export const HotKeyword = (props: IHotKeyword) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { country, _dispatch, setValue, searchSortBy, _state } = props;

  return (
    <section className={`flex-grow xs:mx-5 `}>
      <div
        id='hotKeywordContentLayout'
        className={`rounded-[20px] border-[1px] border-grey-300 bg-white  p-[44px]`}
      >
        <div id='hotKeywordFrame' className={`w-[410px]`}>
          <p className='text-XL/Bold text-orange-400'>HOT 키워드</p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee
            <span className='text-grey-900'>
              {` ${convertCountry(country as CountryType)}`}
            </span>
            에서 가장 핫한 키워드
          </p>
          <ul id='scrollbar' className={`mt-5 h-[454px] overflow-y-scroll`}>
            {HOT_KEYWORD[country].map((keyword, index) => {
              const fontHeight = 'text-L/Medium';
              const fontHighlight = 'text-L/Bold';
              const isHover =
                hoverIndex === index
                  ? `text-orange-400 ${fontHighlight}`
                  : 'text-grey-900';
              const textGap = 'mb-5';
              console.log(isHover);
              return (
                <li
                  key={keyword}
                  className={`flex ${
                    index === HOT_KEYWORD.SG.length - 1 ? '' : `${textGap} xs:mb-[15px]`
                  }
            } cursor-pointer`}
                  onMouseOver={() => {
                    setHoverIndex(index);
                  }}
                  onMouseOut={() => {
                    setHoverIndex(null);
                  }}
                  onClick={() => {
                    if (setValue) {
                      queryKeywordByClick(
                        country,
                        keyword,
                        _dispatch as Dispatch<TSearchActionType>,
                        setValue,
                      );
                    } else {
                      updateSearchPayload({
                        _state: _state!,
                        _dispatch: _dispatch as Dispatch<SetStateAction<TSearchProps>>,
                        key: 'keyword',
                        params: keyword,
                      });
                    }
                    _clientHotKeywordSearched(country, searchSortBy, keyword);
                    if (window.innerWidth < 431) {
                      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className={`${fontHeight} w-5 text-orange-400`}>{`${
                    index + 1
                  }.`}</span>
                  <div className={`ml-3 flex w-full justify-between ${fontHeight}`}>
                    <p className={isHover}>{replaceOverLength(keyword, 17)}</p>

                    <p className='pr-2.5 text-grey-700'>
                      {replaceOverLength(TRANSLATED_KEYWORD[country][index], 20)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
