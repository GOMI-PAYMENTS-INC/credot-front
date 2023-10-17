import { Card } from '@/blog/elements';
import { SEO_INSIGHT } from '@/blog/constants';

export const SearchTrend = () => {
  return (
    <div id='content_frame' className='flex flex-col items-center justify-center'>
      <img src='/assets/images/Trend.png' className='pb-[50px]' />
      <section id='contents' className='max-w-[760px] space-y-[100px]'>
        <section id='content_header' className='space-y-[50px]'>
          <p className='text-3XL/Bold'>시장의 트랜드를 알려주는 '검색량 추이'</p>

          <div id='author' className='flex flex-col items-end gap-[14px] px-5 py-[14px]'>
            <div className='flex flex-col'>
              <p className='text-S/Regular text-grey-700'>2023.08.17</p>
            </div>

            <div className='flex gap-2.5'>
              <img className='h-[44px]  w-[44px]' src='/assets/images/Kai.png' />
              <div>
                <p className='text-M/Medium'>Kai</p>
                <p className='text-S/Regular text-grey-700'>CEO & Co-Founder</p>
              </div>
            </div>
          </div>
        </section>

        <section id='content_intro'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <div className='space-y-[50px]'>
              <p>
                시장은 키워드를 통해 얼마나 많은 거래액(매출)이 발생하는지를 의미합니다.
                시장은 계절에 따라 변하기도 하 며, 외부적인 요인으로 인해 급성장하거나
                급하락하는 경우도 발생합니다. 계절에 따라 변하는 시장의 대표적 인
                키워드로는 여름철 ‘모기장’이나 겨울철 ‘핫팩‘ 등이 있습니다.
              </p>
              <p>
                시장의 규모와 트랜드를 미리 파악하는 것이 중요한 이유는 우리가 업로드한
                상품이 알고 보니 시장이 존재하 지 않아 매출로 이어지지 않는다거나, 시즌
                상품을 적기에 업로드 할 수 있음에도 불구하고 굳이 비시즌 상품을
                업로드하느라 소중한 시간을 낭비할 수 있기 때문입니다. 혹은 시장이
                점진적으로 하향세를 보이는 상품을 판 매하는 실수를 범할 수도 있습니다.
              </p>
              <p>
                이번 포스팅에서는 시장의 트랜드를 나타내는 ‘검색량 추이’의 다양한 케이스를
                살펴보고 리포트를 함께 해석 해보는 시간을 갖도록 하겠습니다.
              </p>
            </div>
          </div>
        </section>

        <section id='content_pattern_of_trend'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>
              키워드에 따라 다양한 패턴을 나타내는 검색량 추이
            </p>
            <div className='space-y-[50px]'>
              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>CASE1. 시즌성이 있는 키워드</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    위 차트는 싱가포르에서 airpods 키워드의 최근 3년간의 검색량
                    추이입니다. 차트를 통해 키워드에 대한 수요 가 주로 하반기에 강세를
                    보인다는 것을 알 수 있습니다. 검색량 추이가 위와 같은 패턴을 보이는
                    상품을 판매 한다면, 상반기에 미리 재고를 준비하고 하반기에 판매에
                    집중하는 것이 재고 및 현금 운영에 효율적일 수 있습 니다.
                  </p>
                  <p>
                    물론, 수요가 많은 시즌에 상품을 업로드 한다고히여 무조건 판매로
                    이어지는 것은 절대 아닙니다. 신규 상품이 해당 키워드 시장에 진입하기
                    용이한지 여부를 확인하기 위해서는 리포트의 키워드 분석 항목을 함께
                    확인해보 셔야하며, 가격분석을 통해 내 상품이 가격 경쟁력을 확보할 수
                    있는지 여부도 확인해봐야 할 것입니다.
                  </p>
                  <p>
                    아울러 고객이 상품을 장바구니에 담는 수, 리뷰 수, 누적 판매량, 평점
                    등과 같은 주요 지표들 더욱 쌓이면서 소 비자와 검색 엔진의 신뢰를
                    얻게되어 더욱 굳건히 상위 노출 자리를 지키게 될 것입니다.
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>CASE2. 수요가 증가 추세인 키워드</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    위 차트는 말레이시아에서 yuzu 키워드의 최근 3년간의 검색량 추이입니다.
                    어떠한 이유인지 최근 3년간 키 워드의 수요가 점진적으로 증가 추세임을
                    확인할 수 있습니다. 이 차트는 고미인사이트에서 가장 이상적으로
                    생각하는 검색량 추이 차트입니다.
                  </p>
                  <p>
                    이상적인 검색량 추이를 보이는 키워드라 해서 무조건적인 매출을
                    보장하지는 않습니다. 앞서 언급했듯, 키워 드의 검색량 추이 데이터를
                    포함하여 ‘키워드 분석’, ‘가격 분석’, ‘브랜드 분석’ 등 고미인사이트에서
                    제공하는 리포트의 다양한 분석자료를 종합적으로 분석 후 해당 키워드
                    시장에 진입하는 것이 유리합니다.
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>CASE3. 수요가 하락 추세인 키워드</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    위 차트는 싱가포르에서 mussels 키워드의 최근 3년간의 검색량
                    추이입니다. 앞서 예시를 들었던 키워드와는 반대로 최근 3년간 키워드의
                    수요가 점진적으로 감소 추세임을 확인할 수 있습니다. 키워드의 수요가
                    특별한 외부 요인으로 인해 다시 증가할 가능성도 있겠지만, 데이터만을
                    보고 평가했을 시 매출이 점점 감소할 가능성 이 큰 키워드의 패턴입니다.
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>CASE4. 수요가 꾸준한 키워드</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    위 차트는 말레이시아에서 lion 키워드의 최근 3년간의 검색량 추이입니다.
                    특별한 변동성 없이 매년 꾸준한 수요가 유지되고 있습니다. 이러한 패턴을
                    보이는 키워드를 통해 매출이 발생할 경우, 앞으로의 매출과 판매량 에
                    대한 예측이 쉬우며 재고관리가 용이하다는 장점이 있습니다. 이 또한
                    고미인사이트에서 선호하는 검색량 추이입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='content_strategies'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>끝으로</p>
            <div className='space-y-[50px]'>
              <p className='text-L/Regular leading-[44px]'>
                고미인사이트에서 제공하는 검색량 추이 데이터는 키워드의 검색량을 나타낸
                값이 아니며, 선택된 기간 내 상 대적인 수요 변화를 나타냅니다. 따라서,
                키워드에 대한 정량적인 시장 규모를 파악하기 위해서는 ‘매출’과 ‘판 매량’
                데이터를 함께 참고하시는 것을 추천합니다.
              </p>
              <p>
                아울러, 검색량 추이는 키워드를 평가하는 다양한 데이터중 하나일 뿐이며,
                우리는 키워드 검색량, 노출 경쟁, 광고 경쟁, 가격 등의 분석 자료들을 함께
                종합적으로 바라보고 판단해야함을 기억해주세요.
              </p>
              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>1. 키워드 광고를 통한 인위적 노출</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    CPC 광고라고도 부르는 키워드 광고를 집행하는 것입니다. Shopee(PC
                    환경)의 경우, SERP 각 페이지마다 총 60개의 상품이 노출되며, 이중 상단
                    5개와 하단 5개 영역이 광고 영역입니다. 타 판매자들과의 입찰 경쟁을
                    통해 클릭당 비용을 높게 책정할 수록 상위 영역에 내 상품을 노출할 수
                    있습니다.
                  </p>
                </div>
                <div className='flex flex-col gap-5 rounded-lg bg-grey-50 px-[30px] py-5'>
                  <p className='text-L/Regular'>아래 컨텐츠도 확인해보세요!</p>
                  <p className='text-L/Bold underline'>
                    구매자들의 검색 의도를 알려주는 ‘구매 전환율'
                  </p>
                  <p className='text-L/Bold underline'>CPC 광고하기 좋은 키워드 찾기!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id='recommand_contents'>
          <div className='mt-[120px] flex flex-col gap-5'>
            <p className='text-2XL/Bold'>아래 컨텐츠도 확인해보세요!</p>
            <div className='flex flex-col gap-[50px]'>
              <Card type='recommandation' />
              <Card type='recommandation' />
            </div>
          </div>
        </section> */}
      </section>
    </div>
  );
};
