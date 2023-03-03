import { Dispatch } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { TITLE, GRADE_ITEMS } from '@/types/enum.code';
import { SalePriceChart } from '@/pages/report/SalePriceChart';
import { openBrowser } from '@/containers/report';

import { formatNumber } from '@/utils/formatNumber';
import { convertExachangeRate, roundNumber } from '@/containers/report';
import { SalePriceTable } from '@/pages/report/SalePriceTable';

import {
  selectSalePriceCompetitionType,
  convertGrade,
} from '@/containers/report/report.container';
import { TReportAction } from '@/containers/report/report.reducer';
interface ISalePrice {
  salePriceInfo: TSalePriceData;
  _dispatch: Dispatch<TReportAction>;
  list: TSalePriceItems[];
  focus: GRADE_TYPE;
}

export const SalePrice = (props: ISalePrice) => {
  const { _dispatch, salePriceInfo, list, focus } = props;
  const { gradeItems, priceAnalysisInfo } = salePriceInfo!;
  const { min, max, avg, basePrice } = priceAnalysisInfo;
  const [minPrice, maxPrice, avgPrice] = [min, max, avg].map((price) =>
    formatNumber(roundNumber(convertExachangeRate(price, basePrice))),
  );
  const [lowLength, mediumLength, highLength] = gradeItems.map((item) => item.length);

  return (
    <section className='col-span-full'>
      <h1 id={TITLE.SALE_PRICE} className='detailReport-h1-header'>
        판매 가격
      </h1>
      <div className='pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='col-span-2 '>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5 '>
                <p className='text-S/Medium text-grey-900'>판매가 정보</p>
              </div>
              <ReactSVG
                id='anchor-market-evaluation'
                src='/assets/icons/outlined/QuestionCircle.svg'
                className='pl-[5px]'
              />
              <Tooltip
                anchorId='anchor-market-evaluation'
                place='right'
                style={{ background: 'none', opacity: 1 }}
                clickable={true}
                delayHide={1300}
              ></Tooltip>
            </div>
            <div className='flex flex-col space-x-5'>
              <div className='flex flex-col py-9 pl-5'>
                <p className=' text-S/Medium text-grey-800'>최저가</p>
                <div className='flex items-center pt-[11px]'>
                  <p className='text-2XL/Bold text-orange-500'>{minPrice}</p>
                  <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                </div>
              </div>
            </div>
            <div className='mx-5 flex flex-col border-t-[1px] border-b-[1px] border-dashed py-9'>
              <p className='text-S/Medium text-grey-800'>평균 판매가</p>
              <div className='flex items-center pt-[11px]'>
                <p className='text-2XL/Bold text-grey-900'>{avgPrice}</p>
                <span className='pl-1 text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
            <div className='mx-5 flex flex-col py-9'>
              <p className='text-S/Medium text-grey-800'>최고가</p>
              <div className='flex items-center pt-[11px]'>
                <p className='text-2XL/Regular text-grey-900'>{maxPrice}</p>
                <span className='pl-1 text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
          </div>
          <div className='col-span-8 col-start-3 h-full border-l-[1px] border-grey-300'>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5 '>
                <p className='text-S/Medium text-grey-900'>판매가 분포 차트</p>
              </div>
              <ReactSVG
                id='anchor-market-evaluation'
                src='/assets/icons/outlined/QuestionCircle.svg'
                className='pl-[5px]'
              />
              <Tooltip
                anchorId='anchor-market-evaluation'
                place='right'
                style={{ background: 'none', opacity: 1 }}
                clickable={true}
                delayHide={1300}
              ></Tooltip>
            </div>
            <div className='flex h-full  items-center justify-center'>
              <div className='w-full max-w-[680px]'>
                <SalePriceChart priceChartProps={props.salePriceInfo!} />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[30px] flex w-fit rounded-[8px] bg-grey-200 text-S/Medium'>
          <div className='flex space-x-2 px-1 py-1'>
            {Object.values(GRADE_ITEMS).map((item, idx) => {
              const countItem =
                item === GRADE_ITEMS.HIGH
                  ? highLength
                  : item === GRADE_ITEMS.MEDIUM
                  ? mediumLength
                  : lowLength;

              const highlight =
                item === focus
                  ? {
                      divStyle: 'bg-white',
                      spanStyle: 'text-orange-500',
                      textStyle: 'text-S/Bold',
                    }
                  : {
                      divStyle: 'bg-grey-200',
                      spanStyle: 'text-grey-700',
                      textStyle: '',
                    };
              return (
                <div
                  className={`cursor-pointer rounded ${highlight.divStyle}`}
                  key={`${item}_${idx}`}
                  onClick={() => selectSalePriceCompetitionType(item, _dispatch)}
                >
                  <p className={`px-2 py-2 ${highlight.textStyle}`}>
                    {`가격경쟁력 ${convertGrade(item)} 상품`}
                    <span className={highlight.spanStyle}>{` ${countItem}`}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <SalePriceTable salePriceItemList={list} basePrice={basePrice} />
      </div>
    </section>
  );
};
