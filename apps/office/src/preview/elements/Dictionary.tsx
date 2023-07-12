import { DICTIONARY } from '@/preview/constants/dictionary';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { _setOpenContent } from '@/preview/container';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
interface IDictionary {
  toggle: REPORT_CONTENT;
}

export const Dictionary = ({ toggle }: IDictionary) => {
  const [openContent, setOpenContent] = useState<number[]>([]);
  useEffect(() => setOpenContent([]), [toggle]);
  return (
    <aside className='sticky top-[360px] '>
      <ul className='rounded-lg border-[1px] border-grey-300 bg-white'>
        {DICTIONARY[toggle].map((data, index) => {
          const borderBottom =
            DICTIONARY[toggle].length === index + 1
              ? ''
              : 'border-b-[1px] border-grey-300';
          const isOpen = openContent.includes(index);
          const caretState = isOpen ? 'rotate-180' : '';
          return (
            <li key={`dictionary_${index}`}>
              <div className={`flex flex-col ${borderBottom}`}>
                <div className='my-3 mx-4 flex w-[217px] flex-col'>
                  <div
                    className='flex cursor-pointer items-center justify-between'
                    onClick={() => {
                      _setOpenContent({
                        _dipatch: setOpenContent,
                        _state: openContent,
                        index,
                      });
                    }}
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
