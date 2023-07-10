import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { openFAQ } from '@/common/container';

interface IFAQ {
  list: {
    subject: string;
    content: string;
  }[];
}

export const FAQ = ({ list }: IFAQ) => {
  const [openedFAQ, setOpenedFAQ] = useState<number[]>([]);

  return (
    <section className='bg-grey-50 py-[120px] lg:py-[80px]'>
      <div className='container'>
        <div className='mx-auto max-w-[1096px]'>
          <div>
            <div className='text-center'>
              <div className='mb-6 text-2XL/Bold text-orange-500 lg:mb-8'>
                자주 묻는 질문을 모았어요.
              </div>
              <div className='break-keep text-3XL/Bold text-grey-900'>
                <p>FAQ</p>
              </div>
            </div>
          </div>
          <div className='mt-12'>
            <div className='rounded-[20.107px] bg-white px-12 py-14  lg:py-6 lg:px-6'>
              {list.map((question, index) => {
                const isOpened = openedFAQ.includes(index + 1);
                return (
                  <dl
                    key={`FAQ_${index}`}
                    className='cursor-pointer border border-t-0 border-l-0 border-r-0 border-b-grey-300 py-8 first:pt-0 last:border-b-0 last:pb-0 lg:py-6'
                    onClick={() =>
                      openFAQ({ faqIndex: index + 1, openedFAQ, setOpenedFAQ })
                    }
                  >
                    <dt className='relative'>
                      <p className='pr-12 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                        {question.subject}
                      </p>
                      <ReactSVG
                        src='/assets/icons/Up.svg'
                        className={`absolute top-1 right-0 text-L/Medium text-grey-700 lg:text-L/Medium 
                      ${isOpened ? 'rotate-0' : 'rotate-180'}`}
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'w-6 h-6 fill-grey-900');
                        }}
                      />
                    </dt>
                    <dd
                      className={`mt-4 text-L/Medium text-grey-700 lg:text-M/Medium  ${
                        isOpened ? 'block' : 'hidden'
                      }`}
                    >
                      {question.content}
                    </dd>
                  </dl>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
