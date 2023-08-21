import { useState, type Dispatch } from 'react';

import { queryKeywordByClick } from '@/search/container';
import { HOT_KEYWORD, TRANSLATED_KEYWORD } from '@/search/elements/hotKeywords';

import { convertCountry } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import type { UseFormSetValue } from 'react-hook-form';
import { _clientHotKeywordSearched } from '@/amplitude/amplitude.service';
import { replaceOverLength } from '@/utils/replaceOverLength';
interface IHotKeyword {
  country: TSearchCountry;
  _dispatch: Dispatch<TSearchActionType>;
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>;
  searchSortBy: TSortBy;
  hackleKey?: string;
}
export const HotKeyword = (props: IHotKeyword) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { country, _dispatch, setValue, searchSortBy, hackleKey } = props;

  return (
    <section className={`flex-grow xs:mx-5 `}>
      <div
        id='hotKeywordContentLayout'
        className={`rounded-[20px] border-[1px] border-grey-300 bg-white p-5 ${
          hackleKey ? `p-[44px]` : ''
        }`}
      >
        <div
          id='hotKeywordFrame'
          className={`${hackleKey ? 'w-[410px]' : 'w-[334px] xs:w-[290px]'}`}
        >
          <p className={`${hackleKey ? 'text-XL/Bold' : 'text-L/Bold'} text-orange-400`}>
            HOT 키워드
          </p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee
            <span className='text-grey-900'>
              {` ${convertCountry(country as CountryType)}`}
            </span>
            에서 가장 핫한 키워드
          </p>
          <ul
            id='scrollbar'
            className={`mt-5 ${hackleKey ? 'h-[454px]' : 'h-[230px]'} overflow-y-scroll`}
          >
            {HOT_KEYWORD[country].map((keyword, index) => {
              const fontHeight = hackleKey ? 'text-L/Medium' : 'text-M/Regular';
              const fontHighlight = hackleKey ? 'text-L/Bold' : 'text-M/Bold';
              const isHover =
                hoverIndex === index
                  ? `text-orange-400 ${fontHighlight}`
                  : 'text-grey-900';
              const textGap = hackleKey ? 'mb-5' : 'mb-[10px]';
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
                    queryKeywordByClick(country, keyword, _dispatch, setValue);
                    _clientHotKeywordSearched(country, searchSortBy, keyword);
                    if (window.innerWidth < 431) {
                      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className={`${fontHeight} text-orange-400`}>{`${
                    index + 1
                  }.`}</span>
                  <div className={`ml-3 flex w-full justify-between ${fontHeight}`}>
                    <p className={isHover}>
                      {replaceOverLength(keyword, hackleKey ? 23 : 13)}
                    </p>

                    <p className='pr-2.5 text-grey-700'>
                      {replaceOverLength(
                        TRANSLATED_KEYWORD[country][index],
                        hackleKey ? 23 : 14,
                      )}
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
