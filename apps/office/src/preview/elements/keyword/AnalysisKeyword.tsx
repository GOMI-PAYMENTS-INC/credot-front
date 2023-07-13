import { ReactSVG } from 'react-svg';
import { RecommendationChart } from '@/preview/elements/keyword/RecommendationChart';
import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';

export const AnalysisKeyword = () => {
  return (
    <section>
      <DetailReportSectionHeader id={REPORT_CONTENT.KEYWORD} />
      <div className='w-full'>
        <div className='flex divide-grey-300 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='basis-[390px]'>
            <div className='keywordInfo-span-subtitle'>
              <span>종합 평가</span>
            </div>
            <div className='flex h-[163px] items-center  text-center'>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center '>
                  <p className='text-2XL/Bold text-[#1A9CFF]'>매우좋음</p>
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>검색량</p>
                  </div>
                </div>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center border-dashed'>
                  <div className=''>
                    <p className='text-2XL/Bold text-[#15BD66]'>좋음</p>
                    <div className='pt-2'>
                      <p className='text-XS/Regular text-grey-800'>노출 경쟁</p>
                    </div>
                  </div>
                </div>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center'>
                  <p className='text-2XL/Bold text-grey-700'>보통</p>
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>CPC 경쟁</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='keywordInfo-span-subtitle'>
              <span>상세 데이터</span>
            </div>
            <div className='flex divide-x-[1px] divide-dotted'>
              <div className='flex flex-col'>
                <div className='flex h-[96px] w-[295px] items-center justify-center'>
                  <div className='flex h-[72px] w-[252px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>{`1 : 1.5`}</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>노출 경쟁률</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>73,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>검색량</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px] '>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>31,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>경쟁상품 수</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex h-[96px] w-[295px] items-center justify-center'>
                  <div className='flex h-[72px] w-[252px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>10%</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>CPC 비율</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>1,321</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>원</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>CPC</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px] '>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>131,824</span>
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
      <div className='pt-6'>
        <div className='bordered flex h-[92px] border-[1px]  border-grey-300 '>
          <div className='flex pl-3 pr-3 pb-3 pt-3'>
            <ReactSVG
              className='pt-[5px] pl-px'
              src='/assets/icons/ExclamationCircle.14px.svg'
            />

            <div className='pl-[11px]'>
              <h1 className='text-M/Bold text-grey-900'>요약</h1>
              <div className='pt-1'>
                <div className='break-all text-S/Regular text-grey-800'>
                  <p>
                    검색량만큼 경쟁상품도 많은 키워드에요.
                    <span className='text-S/Bold'>
                      신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
                    </span>
                  </p>
                </div>
                <div className='break-all text-S/Regular text-grey-800'>
                  <p>
                    CPC광고는 입찰가가 높은 편이라, 이익보다는
                    <span className='text-S/Bold'>
                      초기 시장 진입을 위한 공격적인 마케팅에 적합
                    </span>
                    해요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationChart />
    </section>
  );
};
