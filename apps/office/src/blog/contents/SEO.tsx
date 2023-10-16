import { Card } from '@/blog/elements';
import { SEO_INSIGHT } from '@/blog/constants';

export const SEO = () => {
  return (
    <div id='content_frame' className='flex flex-col items-center justify-center'>
      <img src='/assets/images/SEO.png' className='pb-[50px]' />
      <section id='contents' className='max-w-[760px] space-y-[100px]'>
        <section id='content_header' className='space-y-[50px]'>
          <p className='text-3XL/Bold'>상위 노출의 중요성과 SEO</p>

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
          <section id='content_main'>
            <div
              id='content_summary'
              className='flex flex-col gap-5 rounded-lg bg-grey-50 px-[30px] py-5'
            >
              <p className='text-L/Bold'>콘텐츠 요약</p>
              <ul className='ml-4 flex max-w-[690px] list-outside list-disc flex-col gap-5 text-L/Regular leading-8'>
                <li>
                  소비자의 구매 약 80%가 ‘키워드 검색'으로부터 발생한만큼 상위 노출은 매우
                  중요해요.
                </li>
                <li>
                  상품이 검색엔진의 선택을 받아 SERP 상위에 노출된다면 상품 판매로부터
                  발생하는 이익률 급상승함과 동시에 더욱 굳건히 상위 노출 자리를 지킬 수
                  있어요.
                </li>
                <li>
                  현재 상위에 노출되어 있는 상품들을 분석하여 검색엔진 최적화 작업을
                  진행해보세요.
                </li>
              </ul>
            </div>
          </section>
        </section>

        <section id='content_about_search'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>상위 노출의 중요성</p>
            <div className='space-y-[50px]'>
              <p>
                우리가 Shopee와 같은 이커머스 플랫폼을 통해 상품을 구매했던 경험을
                생각해보면, 구매 또는 탐색하고자 하는 상품의 키워드를 검색하고 이후
                노출되는 수많은 상품들중 지극히 일부만을 클릭하여 보다 자세한 내용을
                확인했던 것을 기억할 수 있습니다.
              </p>
              <p>
                실제로 대표적인 글로벌 이커머스 플랫폼인 ‘Amazon’에서는 소비자의 구매 약
                86%가 ‘키워드 검색’으로부터 발생하고 있으며, 검색 이후 상품의 상세페이지로
                넘어가는 클릭의 80%는 검색결과 화면 첫 페이지에서 발생 한다고 합니다.
              </p>
              <p>
                이렇듯 우리가 아무리 많은 상품을 업로드하여 판매한다 해도 결국 자신의
                상품이 키워드 검색결과 화면(이하 SERP라 하겠습니다.) 상위에 노출되지
                않는다면, 소비자들은 우리 상품의 존재 자체를 인식하지 못할 것입니 다. 즉
                이커머스 플랫폼에서 판매자에게 상위 노출은 그만큼 매우 중요한 요소입니다.
                <br />
                <span className='text-grey-700'>
                  (물론, Meta와 같은 외부 채널을 통해 고객을 유입시켜 매출을 발생시키는
                  방법이 있지만, 이번 포스팅에서는 외부 채널 활용에 대한 내용은 다루지
                  않도록 하겠습니다.)
                </span>
              </p>
            </div>
          </div>
        </section>

        <section id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>상품 노출 순위가 정해지는 원리</p>
            <div className='space-y-[50px]'>
              <p>
                판매하는 상품이 광고를 집행하지 않음에도 불구하고 SERP 상위에 노출된다면,
                엄청난 선순환 효과를 기대할 상품을 노출시키기 위해 소요했던 마케팅 비용이
                줄어듬과 동시에 자연 유입을 통한 매출이 지속적으로 발생하 면서 판매
                이익률이 급격하게 상승하게 됩니다.
              </p>
              <p>
                아울러 고객이 상품을 장바구니에 담는 수, 리뷰 수, 누적 판매량, 평점 등과
                같은 주요 지표들 더욱 쌓이면서 소 비자와 검색 엔진의 신뢰를 얻게되어 더욱
                굳건히 상위 노출 자리를 지키게 될 것입니다.
              </p>
            </div>
          </div>
        </section>

        <section id='content_strategies'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>상위 노출을 위한 두 가지 방법</p>
            <div className='space-y-[50px]'>
              <p className='text-L/Regular leading-[44px]'>
                내 상품을 SERP 상위에 노출시키는 방법은 크게 두 가지가 있습니다.
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
                  <p>
                    CPC 광고는 입찰가만 높게 지불한다면 즉시 상위 노출이 가능하다는 장점이
                    있지만, 대부분의 키워드의 경우 이미 심화된 입찰 경쟁으로 인해 마진을
                    기대하고 판매하기조차 쉽지 않다는 단점이 있습니다. 따라서 CPC광 고를
                    통한 상위 노출은 애초에 이익 보다는 마케팅 또는 매출 규모를 만드는
                    목적일 경우 적합할 수 있으며, 그 게 아닐 경우 검색량은 많치만 입찰
                    경쟁이 적은 황금 키워드를 찾는 것이 핵심입니다.
                  </p>
                </div>
                <div className='flex flex-col gap-5 rounded-lg bg-grey-50 px-[30px] py-5'>
                  <p>
                    CPC 광고에 적합한 키워드를 찾는 방법이 궁금하다면, 아래 컨텐츠를
                    확인해주세요.
                  </p>
                  <a>
                    <p className='text-L/Bold underline'>
                      CPC 광고하기 좋은 키워드 찾기!
                    </p>
                  </a>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <p className='text-L/Bold'>2. 검색 엔진 최적화 작업을 통한 자연적 노출</p>
                <div className='space-y-[50px] text-L/Regular leading-[44px]'>
                  <p>
                    검색 엔진 최적화(또는 SEO=Search Engine Optimization)는 특정 상품
                    페이지가 키워드 검색결과 화면에 서 상위에 노출 될 수 있도록 하는
                    작업을 의미하며, 보통 Google이나 Naver와 같은 포털사에서 특정 콘텐츠
                    (블로그, 뉴스, 상품, 영상 등)를 상위에 노출시키기 위한 마케팅 수단으로
                    많이 거론되고 있습니다. SEO 작업 은 검색엔진이 어떤 알고리즘으로
                    데이터를 불러와 화면상에 순위를 정하여 나타내느지를 분석하는 작업이라
                    고도 할 수 있습니다.
                  </p>
                  <p>
                    Shopee의 검색엔진 또한 나름의 알고리즘을 통해 데이터베이스 속 수억개의
                    상품들중 소수의 상품만 SERP 상단에 나타내줍니다. 우리가 Shopee의 검색
                    알고리즘이 어떠한 코드로 되어 있는지를 정확하게 파악하기란
                    불가능하지만, 상위 노출이 되고 있는 상품들의 특징 또는 상관 관계를
                    분석하여 알고리즘을 유추해보고 이를 내 상품등록 혹은 운영 과정에
                    적용함으로서 SEO 작업을 진행할 수 있습니다.
                  </p>
                  <p>
                    검색엔진 알고리즘은 단순히 매출이 많은 상품이라해서 상위에 노출 시키는
                    구조가 아닙니다. 매출도 물론 중 요하지만, 상품 등록이 얼마나 잘
                    되었는지, 샵 운영은 어떻게 하고 있는지, 평점이나 문의 응답률은
                    어떠한지 등 다양한 요소들을 복합적으로 평가하고 각 요소들의 중요도도
                    다르게 평가됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p>
              고미인사이트의 키워드 분석 기능은 Shopee SERP의 실시간 상위 노출 상품들을
              디테일한 항목별로 분석하 여 판매자분께 SEO를 위한 다양한 인사이트를 제공하고
              있습니다.
            </p>
            <ul className='flex list-inside list-disc flex-col gap-5'>
              {SEO_INSIGHT.map((insight, index) => {
                return <li key={`insight_${index}`}>{insight}</li>;
              })}
            </ul>
            <p>
              Shopee 검색 알고리즘이 상위에 노출시키는 상품들의 공통점과 통계적 특성을
              확인하고 그대로 적용해보세요!
            </p>
          </div>
        </section>

        <section id='recommand_contents'>
          <div className='mt-[120px] flex flex-col gap-5'>
            <p className='text-2XL/Bold'>아래 컨텐츠도 확인해보세요!</p>
            <div className='flex flex-col gap-[50px]'>
              <Card type='recommandation' />
              <Card type='recommandation' />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
