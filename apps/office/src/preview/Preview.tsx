import { ReactSVG } from 'react-svg';
import { Report } from '@/preview/elements/Resport';
import { REPORT_INFO } from '@/preview/constants/reportData';
import { useMemo, useState } from 'react';
import { REPORT_CONTENTS, REPORT_CONTENT } from '@/preview/constants/reportData';
import { Dictionary } from '@/preview/elements/Dictionary';
const Preview = () => {
  const [activeToggle, setActiveToggle] = useState<REPORT_CONTENT>(REPORT_CONTENT.MARKET);
  const activeToggleCss =
    'bg-white font-bold text-orange-400 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]';

  const ReportSummary = useMemo(
    () =>
      REPORT_INFO.map((data, index) => {
        const [key, value] = Object.entries(data)[0];
        return (
          <div className='flex items-center' key={`keyword_info_${index}`}>
            <p className='text-S/Medium text-grey-600'>{key}</p>
            <p className='ml-1 text-S/Medium text-grey-800'>{value}</p>
            {REPORT_INFO.length !== index + 1 && <p className='mx-2 text-grey-700'>•</p>}
          </div>
        );
      }),
    [],
  );
  return (
    <main className='container'>
      <section>
        <div className='flex justify-center'>
          <div className='relative flex w-full justify-around overflow-hidden'>
            <div className='absolute ml-[500px] mt-[50px] h-[1000px] w-[1000px] rounded-[1000px] bg-orange-500 opacity-20 blur-[132px]' />
            <div className='z-10 mt-[92px] mb-[72px] flex flex-col justify-start text-XL/Bold'>
              <p className='text-4XL/Bold'>리포트 미리보기</p>
              <p className='mt-4'>
                고미인사이트의 키워드 리포트는 Shopee 키워드 검색결과 화면에서
              </p>
              <p>광고 상품을 제외한 상위 50개의 상품 데이터를 기반으로 제공되어요.</p>
              <button className='button-filled-xLarge-primary-false-false-false mt-[26px] w-fit text-L/Bold'>
                내가 원하는 키워드 분석하러 가기
              </button>
            </div>

            <ReactSVG
              className='z-10 self-end'
              src='/assets/icons/ReportL.svg'
              beforeInjection={(svg) => {
                // svg.setAttribute('class', 'md:w-[488px] h-[200px] xs:w-[360px]');
              }}
            />
          </div>
        </div>
      </section>

      <section className='sticky top-20 z-10 mt-[40px] rounded-lg bg-white py-[30px] shadow-[0_2px_6px_0_rgba(0,0,0,0.08)]'>
        <div className='flex flex-col items-center'>
          <p className='text-XL/Medium'>분석 키워드</p>
          <p className='mt-[7px] mb-4 text-3XL/Bold'>bộ mỹ phẩm du lịch bộ </p>
          <div className='flex'>{ReportSummary}</div>
          <ul className='mt-8 flex w-fit rounded-lg bg-grey-300 p-1 text-center text-L/Medium text-grey-700'>
            {REPORT_CONTENTS.map((content) => {
              return (
                <li
                  key={content.key}
                  className={` ${
                    activeToggle === content.key && activeToggleCss
                  } block cursor-pointer rounded-lg`}
                  onClick={() => setActiveToggle(content.key)}
                >
                  <p className='mx-3 my-3 flex w-[136px] items-center justify-center gap-1'>
                    {content.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Report toggle={activeToggle} />
    </main>
  );
};

export default Preview;
