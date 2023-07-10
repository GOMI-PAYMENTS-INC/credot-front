import { ReactSVG } from 'react-svg';
import { KEYWORD_CONTENTS } from '@/price/constans';
import { useMemo } from 'react';

export const KeywordContents = () => {
  const KeywordContent = useMemo(
    () =>
      KEYWORD_CONTENTS.map((report, index) => {
        return (
          <div
            key={`reportContent_${index}`}
            id='contentLayout'
            className={`flex flex-col`}
          >
            <div
              id='contentCardFrame'
              className={`max-w-[258px] rounded-[46px] border border-grey-300`}
            >
              <div id='card' className='flex flex-col justify-start py-8 px-6'>
                <div id='contentCardHeader' className='w-[206px]'>
                  {<ReactSVG src={report.imgPath} />}
                </div>
                <div id='contentCardBody' className='my-6 w-[206px]'>
                  <p className='text-XL/Bold'>{report.title}</p>
                </div>
                <div
                  id='contentCardBottom'
                  className='flex w-[206px] flex-col justify-center gap-2'
                >
                  {report.contents.map((content) => (
                    <p className='text-XL/Medium text-grey-700'>{content}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }),

    [],
  );
  return (
    <section>
      <div className='flex flex-col items-center justify-center'>
        <div className='xs:w-[405px] md:w-[532px] lg:w-[806px]'>
          <div className='xs:justify-center mb-[59px] flex w-full justify-start gap-[18px] lg:flex-wrap'>
            {KeywordContent}
          </div>
          <div className='flex justify-center'>
            <div className='xs:max-w-[405px] xs:items-center flex max-w-[1320px] justify-center rounded-[50px]  bg-gradient-to-r from-orange-500 to-orange-300 px-[113px] sm:max-w-[530px] sm:px-0 md:max-w-[712px] md:px-[81px] lg:flex-col'>
              <div className='flex w-full flex-col items-start justify-center text-2XL/Bold text-grey-100 sm:text-2XL/Bold md:w-[550px] lg:my-[86px] lg:items-center lg:text-3XL/Bold'>
                <p>고미인사이트를 통해 시장을 미리 분석하고</p>
                <p className='mt-2'>데이터를 기반의 판매 전략을 수립하세요</p>

                <button className='button-filled-normal-large-primary-false-false-true mt-[47px] flex justify-end bg-grey-100 text-orange-400'>
                  구독 전, 키워드 리포트 미리보기
                  <ReactSVG
                    src='assets/icons/Union.svg'
                    className='absolute mt-6 cursor-auto'
                  />
                </button>
              </div>
              <ReactSVG
                className='ml-[23px] mt-5 md:self-center lg:ml-0 lg:mt-0'
                src='/assets/icons/ReportS.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'md:w-[488px] h-[200px] xs:w-[360px]');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
