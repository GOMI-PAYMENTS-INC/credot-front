import { useState, type Dispatch, type RefObject } from 'react';
import { HOT_KEYWORD, TRANSLATED_KEYWORD } from '@/search/elements/constants';
import { queryKeywordByClick, scrollToTop } from '@/search/container';
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
}
export const HotKeyword = (props: IHotKeyword) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { country, _dispatch, setValue, searchSortBy } = props;

  return (
    <section className={`flex-grow xs:mx-5`}>
      <div
        id='hotKeywordContentLayout'
        className='rounded-[20px] border-[1px] border-grey-300 bg-white p-5'
      >
        <div id='hotKeywordFrame' className='w-[334px] xs:w-[290px]'>
          <p className='text-L/Bold text-orange-400'>HOT 키워드</p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee
            <span className='text-grey-900'>
              {` ${convertCountry(country as CountryType)}`}
            </span>
            에서 가장 핫한 키워드
          </p>
          <ul className='mt-5'>
            {HOT_KEYWORD[country].map((keyword, index) => {
              const isHover =
                hoverIndex === index ? 'text-M/Bold text-orange-400' : 'text-grey-900';
              return (
                <li
                  key={keyword.text}
                  className={`flex ${
                    index === 6 ? '' : 'mb-[10px] xs:mb-[15px]'
                  } cursor-pointer`}
                  onMouseOver={() => {
                    setHoverIndex(index);
                  }}
                  onMouseOut={() => {
                    setHoverIndex(null);
                  }}
                  onClick={() => {
                    queryKeywordByClick(country, keyword.text, _dispatch, setValue);
                    _clientHotKeywordSearched(country, searchSortBy, keyword.text);
                    if (window.innerWidth < 431) {
                      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className='text-M/Medium text-orange-400'>{`${index + 1}.`}</span>
                  <div className='ml-3 flex w-full justify-between text-M/Regular'>
                    <p className={isHover}>{replaceOverLength(keyword.text, 13)}</p>

                    <p className='text-grey-700'>
                      {replaceOverLength(TRANSLATED_KEYWORD[country][index], 14)}
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
