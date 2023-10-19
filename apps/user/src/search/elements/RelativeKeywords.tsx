import type { Dispatch, SetStateAction } from 'react';

import UseTooltip from '@/components/UseTooltip';
import { updateSearchPayload } from '@/search/container';
import { formatNumber } from '@/utils/formatNumber';
import { isFalsy } from '@/utils/isFalsy';

interface IRelativeKeyowrds {
  tooltip: JSX.Element;
  response: TSearchResponse | undefined;
  _state: TSearchProps;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
}

export const RelativeKeywords = ({
  tooltip,
  response,
  _state,
  _dispatch,
}: IRelativeKeyowrds) => {
  const relativeKeywords = response?.relations;

  return (
    <div className='flex h-[336px] grow basis-1/2 flex-col rounded-2xl border border-grey-300 bg-white px-6 py-5 xs:mt-[30px] xs:px-3 xs:py-2.5'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <h3 className='text-L/Medium'>연관 키워드</h3>
          <UseTooltip content={tooltip} />
        </div>
        <div className='text-L/Medium'>검색량</div>
      </div>

      <div id='scrollbar' className='mt-5 h-[270px] overflow-x-auto xs:mt-2.5'>
        {Array.isArray(relativeKeywords) && isFalsy(relativeKeywords) === false ? (
          <ul className='overflow-y-hidden text-center'>
            {relativeKeywords!.map((keyword) => {
              return (
                <li
                  key={`${keyword.id}`}
                  className='flex h-[54px] cursor-pointer items-center justify-between rounded-md bg-white p-2 odd:bg-grey-200 hover:bg-orange-100'
                  onClick={() => {
                    updateSearchPayload({
                      _state,
                      _dispatch,
                      key: 'keyword',
                      params: keyword.text,
                    });
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
              );
            })}
          </ul>
        ) : (
          <div className='flex h-full items-center justify-center rounded-md bg-grey-200 text-L/Medium text-grey-700'>
            연관 키워드가 없어요
          </div>
        )}
      </div>
    </div>
  );
};
