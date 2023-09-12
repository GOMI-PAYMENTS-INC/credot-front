import {
  ForwardedRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  type Dispatch,
} from 'react';

import {
  queryKeywordByClick,
  updateSearchPayload,
  storeHotKeyords,
  switchHotKeyword,
} from '@/search/container';

import { convertCountry } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import type { UseFormSetValue } from 'react-hook-form';
import { _clientHotKeywordSearched } from '@/amplitude/amplitude.service';

import { replaceOverLength } from '@/utils/replaceOverLength';
import { CACHING_KEY } from '@/types/enum.code';
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
  hotKeywordRef?: ForwardedRef<HTMLDivElement>;
}
export const HotKeyword = (props: IHotKeyword) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { country, _dispatch, setValue, searchSortBy, _state, hotKeywordRef } = props;
  const [hotKeywords, setHotKeywords] = useState<THotKeywords[]>([]);

  useEffect(() => {
    const KEY = CACHING_KEY.HOT_KEYWORDS;

    if (sessionStorage.getItem(KEY) === null) {
      storeHotKeyords(setHotKeywords);
    } else {
      switchHotKeyword(country, setHotKeywords);
    }
  }, [country]);

  const isMobileOrEmptyKeyword = _state?.keyword || innerWidth < 432;

  return (
    <section id='hot_keyword' ref={hotKeywordRef} className={`flex-grow xs:mx-5 `}>
      <div
        id='hotKeywordContentLayout'
        className={`rounded-[20px] border-[1px] border-grey-300 bg-white  ${
          isMobileOrEmptyKeyword ? 'p-5' : 'p-[44px]'
        }`}
      >
        <div
          id='hotKeywordFrame'
          className={`xs:w-[290px] ${_state?.keyword ? 'w-[334px] ' : 'w-[410px]'}`}
        >
          <p className='text-XL/Bold text-orange-400'>HOT 키워드</p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee
            <span className='text-grey-900'>
              {` ${convertCountry(country as CountryType)}`}
            </span>
            에서 가장 핫한 키워드
          </p>
          <ul
            id='scrollbar'
            className={`mt-5 ${
              isMobileOrEmptyKeyword ? 'h-[230px]' : 'h-[454px]'
            } overflow-y-scroll`}
          >
            {hotKeywords.map((item, index) => {
              const fontHeight = isMobileOrEmptyKeyword
                ? 'text-M/Regular'
                : 'text-L/Medium';
              const fontHighlight = isMobileOrEmptyKeyword
                ? 'text-M/Bold'
                : 'text-L/Bold';
              const isHover =
                hoverIndex === index
                  ? `text-orange-400 ${fontHighlight}`
                  : 'text-grey-900';
              const textGap = isMobileOrEmptyKeyword ? 'mb-2.5' : 'mb-5';

              return (
                <li
                  key={item.keyword}
                  className={`flex ${
                    index === hotKeywords.length - 1 ? '' : `${textGap} xs:mb-[15px]`
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
                        item.keyword,
                        _dispatch as Dispatch<TSearchActionType>,
                        setValue,
                      );
                    } else {
                      updateSearchPayload({
                        _state: _state!,
                        _dispatch: _dispatch as Dispatch<SetStateAction<TSearchProps>>,
                        key: 'keyword',
                        params: item.keyword,
                      });
                    }
                    _clientHotKeywordSearched(country, searchSortBy, item.keyword);
                    if (window.innerWidth < 431) {
                      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className={`${fontHeight} w-5 text-orange-400`}>{`${
                    index + 1
                  }.`}</span>
                  <div className={`ml-3 flex w-full justify-between ${fontHeight}`}>
                    <p className={isHover}>
                      {replaceOverLength(item.keyword, isMobileOrEmptyKeyword ? 10 : 17)}
                    </p>

                    <p className='pr-2.5 text-grey-700'>
                      {replaceOverLength(
                        item.translation,
                        isMobileOrEmptyKeyword ? 14 : 20,
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
