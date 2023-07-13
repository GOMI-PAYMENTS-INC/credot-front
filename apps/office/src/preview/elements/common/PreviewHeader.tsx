import type { Dispatch, SetStateAction } from 'react';
import { REPORT_CONTENTS } from '@/preview/constants/reportData';

interface IPreviewHeader {
  scrollEvent: TScrollEvent;
  setScrollEvent: Dispatch<SetStateAction<TScrollEvent>>;
}

export const PreviewHeader = (props: IPreviewHeader) => {
  const { scrollEvent, setScrollEvent } = props;
  return (
    <section className='sticky top-20 z-40 mt-[50px] rounded-lg bg-white py-4 shadow-[0_2px_6px_2px_rgba(0,0,0,0.08)]'>
      <div className='flex items-center text-center'>
        <p className='border-r-4 border-grey-600 pl-[46px] pr-[30px] text-XL/Bold'>
          bộ mỹ phẩm du lịch bộ
        </p>
        <div className='flex gap-[18px] pl-[30px]'>
          {REPORT_CONTENTS.map((content, index) => {
            const { current } = scrollEvent;
            const titleCss =
              current === content.key
                ? 'text-orange-400 text-M/Bold'
                : 'text-grey-800 text-M/Medium';

            return (
              <a
                href={`#${content.key}`}
                onClick={() => setScrollEvent({ ...scrollEvent, current: content.key })}
                className={`flex items-center ${titleCss}`}
                key={`keyword_info_${index}`}
              >
                {content.text}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
