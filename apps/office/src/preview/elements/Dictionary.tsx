import { DICTIONARY } from '@/preview/constants/Dictionary';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { _setOpenContent } from '@/preview/container';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
interface IDictionary {
  current: REPORT_CONTENT;
}

export const Dictionary = ({ current }: IDictionary) => {
  const [openContent, setOpenContent] = useState<number | null>(null);
  useEffect(() => setOpenContent(null), [current]);
  return (
    <aside className='sticky top-[120px] '>
      <ul className='rounded-lg border-[1px] border-grey-300 bg-white'>
        {DICTIONARY[current].map((data, index) => {
          const borderBottom =
            DICTIONARY[current].length === index + 1
              ? ''
              : 'border-b-[1px] border-grey-300';
          const isOpen = openContent === index;
          const caretState = isOpen ? 'rotate-180' : '';
          return (
            <li key={`dictionary_${index}`}>
              <div className={`flex flex-col ${borderBottom}`}>
                <div className='my-3 mx-4 flex w-[217px] flex-col'>
                  <div
                    className='flex cursor-pointer items-center justify-between'
                    onClick={() => setOpenContent(index)}
                  >
                    <p className='text-M/Regular text-grey-900 '>{data.title}</p>
                    <ReactSVG
                      src='/assets/icons/CaretDown.svg'
                      className={`mr-2.5  ${caretState}`}
                    />
                  </div>
                  {isOpen && (
                    <div className='mt-2 bg-grey-200 p-2 text-S/Regular text-grey-900'>
                      {data.description}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
