import { HOT_KEYWORD, TRANSLATED_KEYWORD } from '@/search/elements/constants';
import { queryKeywordByClick } from '@/search/container';
import { convertCountry } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import type { Dispatch } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import { _clientHotKeywordSearched } from '@/amplitude/amplitude.service';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { useState } from 'react';
interface IHotKeyword {
  country: TSearchCountry;
  _dispatch: Dispatch<TSearchActionType>;
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>;
  visible: 'hidden' | 'flex';
  searchSortBy: TSortBy;
}
export const HotKeyword = (props: IHotKeyword) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { country, _dispatch, setValue, searchSortBy, visible } = props;

  return (
    <section className={visible}>
      <div
        id='hotKeywordContentLayout'
        className='rounded-[20px] border-[1px] border-grey-300 bg-white p-5'
      >
        <div id='hotKeywordFrame' className='w-[334px]'>
          <p className='text-L/Bold text-orange-400'>HOT 키워드</p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee
            <span className='text-grey-900'>
              {` ${convertCountry(country as CountryType)}`}
            </span>
            에서 가장 핫한 키워드들이에요.
          </p>
          <ul className='mt-5'>
            {HOT_KEYWORD[country].map((keyword, index) => {
              const isHover =
                hoverIndex === index ? 'text-M/Bold text-orange-400' : 'text-grey-900';
              return (
                <li
                  key={keyword.text}
                  className={`flex ${index === 6 ? '' : 'mb-[10px]'} cursor-pointer`}
                  onMouseOver={() => {
                    setHoverIndex(index);
                  }}
                  onMouseOut={() => {
                    setHoverIndex(null);
                  }}
                  onClick={() => {
                    queryKeywordByClick(country, keyword.text, _dispatch, setValue);
                    _clientHotKeywordSearched(country, searchSortBy, keyword.text);
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
