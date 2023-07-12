import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { openBrowser } from '@/utils/openBrowser';
import { RecommendationChart } from '@/preview/elements/keyword/RecommendationChart';

export const AnalysisKeyword = () => {
  const evaluationTooltipContent = useMemo(() => {
    const divStyle = 'h-5 w-[58px] rounded border-[1.5px] text-center';
    const pStyle = 'text-XS/Medium';

    return (
      <>
        <p className='text-XS/Regular text-grey-900'>
          리포트를 생성하신 키워드를{' '}
          <span className='text-XS/Bold'>검색량, 노출 경쟁률, 입찰 경쟁률</span> 관점에서
          총 5개 등급으로 평가해요.
        </p>
        <div className='inline-flex space-x-3 pt-3'>
          <div className={`border-[#ABDCFF] ${divStyle}`}>
            <p className={`text-[#0279D4] ${pStyle}`}>매우좋음</p>
          </div>
          <div className={`border-[#C9F5DF] ${divStyle}`}>
            <p className={`text-[#187A41] ${pStyle}`}>좋음</p>
          </div>
          <div className={`border-[#D9D9D9] ${divStyle}`}>
            <p className={`text-[#262626] ${pStyle}`}>보통</p>
          </div>
          <div className={`border-[#F8CB32] ${divStyle}`}>
            <p className={`text-[#AC6600] ${pStyle}`}>나쁨</p>
          </div>
          <div className={`border-red-300 ${divStyle}`}>
            <p className={`text-[#C9162B] ${pStyle}`}>나쁨</p>
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <button
            className='cursor-pointer pt-[14px] text-XS/Bold text-[#FF5100]'
            onClick={() => {
              openBrowser(
                'https://gomicorp.notion.site/4c1f1b468dbf47798c860d73df8ca605#04587a656fcc4a41a193a72298b0cffe',
              );
            }}
          >
            자세히 알아보기
          </button>
        </div>
      </>
    );
  }, []);

  const detailTooltipContent = useMemo(
    () => (
      <section>
        <div className='flex space-x-3'>
          <div className='flex flex-col'>
            <p className='pt-2 text-XS/Bold'>노출 경쟁률</p>
            <span>
              검색량 대비 경쟁상품 수를 의미해요. 키워드에 대한
              <br /> 수요와 공급 비율을 알 수 있어요.
            </span>

            <p className='pt-2 text-XS/Bold'>검색량</p>
            <span>최근 30일간 검색된 수를 의미해요.</span>
            <p className='pt-2 text-XS/Bold'>경쟁상품 수</p>
            <span>키워드 검색 시 노출되는 경쟁 상품 수를 의미해요.</span>
          </div>

          <div className='flex flex-col'>
            <p className='pt-2 text-XS/Bold'>CPC 비율</p>
            <span>
              키워드 검색결과 내 상품들이 판매되는 평균 판매가
              <br /> 대비 CPC 금액의 비율을 의미해요. CPC 입찰 경쟁
              <br />이 얼마나 심한지 알 수 있어요.
            </span>
            <p className='pt-2 text-XS/Bold'>CPC</p>
            <span>키워드 광고 집행을 위한 최소한의 입찰 비용이에요</span>
            <p className='pt-2 text-XS/Bold'>키워드 경쟁률</p>
            <span>키워드 검색 시 노출되는 상품들의 평균 판매가에요.</span>
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <button
            className='cursor-pointer pt-[14px] text-XS/Bold text-[#FF5100]'
            onClick={() => {
              openBrowser(
                'https://gomicorp.notion.site/4c1f1b468dbf47798c860d73df8ca605#04587a656fcc4a41a193a72298b0cffe',
              );
            }}
          >
            자세히 알아보기
          </button>
        </div>
      </section>
    ),
    [],
  );

  return (
    <section>
      <div className='w-full'>
        <div className='flex divide-grey-300 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='basis-[390px]'>
            <div className='keywordInfo-span-subtitle'>
              <span>종합 평가</span>
              <div className='tooltip-container'>
                <a data-tooltip-id='anchor-market-evaluation'>
                  <ReactSVG
                    src='/assets/icons/QuestionCircle.svg'
                    className='inline-block self-center pl-[7px]'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'fill-grey-500 w-[14px] h-[14px]');
                    }}
                  />
                </a>
                <Tooltip
                  id='anchor-market-evaluation'
                  place='right'
                  variant='light'
                  clickable={true}
                  render={() => evaluationTooltipContent}
                ></Tooltip>
              </div>
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
              <div className='tooltip-container'>
                <a data-tooltip-id='anchor-market-detail'>
                  <ReactSVG
                    src='/assets/icons/QuestionCircle.svg'
                    className='inline-block self-center pl-[7px]'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'fill-grey-500 w-[14px] h-[14px]');
                    }}
                  />
                </a>
                <Tooltip
                  id='anchor-market-detail'
                  place='bottom'
                  variant='light'
                  clickable={true}
                  render={() => detailTooltipContent}
                ></Tooltip>
              </div>
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
              src='/assets/icons/QuestionCircle.svg'
              className='inline-block self-center pl-[7px]'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-grey-500 w-[14px] h-[14px]');
              }}
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

      {/* <RecommendationChart
        relations={relations}
        _dispatch={_dispatch}
        toggleEvent={_state.toggleEvent}
        country={analysisInfo!.country}
        basePrice={analysisInfo!.basePrice}
        currencyUnit={analysisInfo!.currencyUnit}
        amplitudeData={amplitudeData}
      /> */}
    </section>
  );
};
