import { ReactSVG } from 'react-svg';
import { RecommendationChart } from '@/preview/elements/keyword/RecommendationChart';
import { MRecommendationChart } from '@/preview/elements/keyword/MRecommendationChart';
import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
import { MAIN_DATA } from '@/preview/constants/constant';
import {
  convertEvaluateStatus,
  convertScoreToText,
} from '@/preview/elements/keyword/Convertor';
import {
  convertExchangeRate,
  formatNumber,
  getConversionRate,
} from '@/preview/container';

export const AnalysisKeyword = () => {
  const [cpcPrice, avgPrice, searchCount, competitionProductCount, cpcRate] = [
    MAIN_DATA.cpcPrice,
    MAIN_DATA.avgPrice,
    MAIN_DATA.searchCount,
    MAIN_DATA.competitionProductCount,
    MAIN_DATA.cpcRate,
  ]
    .map((number, idx) => {
      if (idx > 1) return number;
      return convertExchangeRate(MAIN_DATA.currencyUnit, number, MAIN_DATA.basePrice);
    })
    .map((number) => formatNumber(number));
  const conversionRate = MAIN_DATA.totalSalesCount / MAIN_DATA.searchCount;
  const [search, competition, cpc, conversion] = (
    MAIN_DATA.evaluateStatus + getConversionRate(conversionRate)
  )
    .split('')
    .map((score) => convertScoreToText(score));

  const { top, bottom } = convertEvaluateStatus(MAIN_DATA.evaluateStatus);
  return (
    <section>
      <DetailReportSectionHeader id={REPORT_CONTENT.KEYWORD} />
      <div className='pt-6'>
        <div className='flex divide-grey-300 border-t-[2px] border-grey-300 xs:flex xs:flex-col'>
          <div className='basis-[390px] xs:basis-0 xs:border-b-[1px]'>
            <div className='keywordInfo-span-subtitle border-b-[1px]'>
              <span>종합 평가</span>
            </div>
            <div className='flex h-[163px] items-center text-center  xs:my-4 xs:mx-2 xs:h-[66px]'>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                <div className='flex h-[98px] flex-1 flex-col items-center justify-center xs:h-[66px] '>
                  {search}
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>검색량</p>
                  </div>
                </div>
                <div className='flex h-[98px] flex-1 flex-col items-center justify-center xs:h-[66px] '>
                  {conversion}
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>구매 전환</p>
                  </div>
                </div>
                <div className='flex h-[98px] flex-1 flex-col items-center justify-center border-dashed xs:h-[66px]'>
                  <div className=''>
                    {competition}
                    <div className='pt-2'>
                      <p className='text-XS/Regular text-grey-800'>노출 경쟁</p>
                    </div>
                  </div>
                </div>
                <div className='flex h-[98px] flex-1 flex-col items-center justify-center xs:h-[66px]'>
                  {cpc}
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>CPC 경쟁</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-5 mb-[30px] hidden xs:block'>
            <div className='bordered flex  border-[1px]  border-grey-300 '>
              <div className='flex pl-3 pr-3 pb-3 pt-3'>
                <ReactSVG
                  className='pt-[5px] pl-px'
                  src='/assets/icons/ExclamationCircle.14px.svg'
                />
                <div className='pl-[11px]'>
                  <h1 className='text-M/Bold text-grey-900'>요약</h1>
                  <div className='pt-1'>
                    <div className='break-all text-S/Regular text-grey-800'>{top}</div>
                    <div className='break-all text-S/Regular text-grey-800'>{bottom}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='keywordInfo-span-subtitle border-b-[1px] xs:border-b-[1px] xs:border-t-[2px]'>
              <span>상세 데이터</span>
            </div>

            <div className='flex divide-x-[1px] divide-dotted xs:flex-col xs:items-center xs:divide-x-0'>
              <div
                id='keyword_analysis_first'
                className='flex flex-col  xs:border-b-[1px]'
              >
                <div className='flex h-[96px] items-center justify-center'>
                  <div className='mx-6 flex h-[72px] w-[148px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>{`1 : ${formatNumber(
                        conversionRate,
                      )}`}</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>구매 전환</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-S/Regular text-grey-900'>{searchCount}</span>
                      <span className='pl-1 text-XS/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>검색량</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px]'>
                    <div className='flex items-center '>
                      <span className='text-S/Regular text-grey-900'>
                        {MAIN_DATA.totalSalesCount}
                      </span>
                      <span className='pl-1 text-XS/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>판매량 합계</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col  xs:border-b-[1px]'>
                <div className='mx-6 flex h-[96px] items-center justify-center'>
                  <div className='flex h-[72px] w-[148px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px] flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>{`1 : ${MAIN_DATA.competitionRate}`}</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>노출 경쟁률</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>{searchCount}</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>검색량</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px]'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>
                        {competitionProductCount}
                      </span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>경쟁상품 수</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='mx-6 flex h-[96px] items-center justify-center'>
                  <div className='flex h-[72px] w-[148px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>{cpcRate}%</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>CPC 비율</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>{cpcPrice}</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>원</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>CPC</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px]'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>{avgPrice}</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>원</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>평균 판매가</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6 xs:hidden'>
        <div className='bordered flex h-[92px] border-[1px]  border-grey-300 '>
          <div className='flex pl-3 pr-3 pb-3 pt-3'>
            <ReactSVG
              className='pt-[5px] pl-px'
              src='/assets/icons/ExclamationCircle.14px.svg'
            />
            <div className='pl-[11px]'>
              <h1 className='text-M/Bold text-grey-900'>요약</h1>
              <div className='pt-1'>
                <div className='break-all text-S/Regular text-grey-800'>{top}</div>
                <div className='break-all text-S/Regular text-grey-800'>{bottom}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationChart />
      <MRecommendationChart />
    </section>
  );
};
