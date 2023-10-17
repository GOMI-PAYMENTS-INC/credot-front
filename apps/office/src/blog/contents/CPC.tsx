import { Card } from '@/blog/elements';
import { CONTENT_LIST } from '@/blog/constants';

export const CPC = () => {
  const [Search_Trend, CVR] = CONTENT_LIST.filter(
    (content) => content.category === 'product',
  );
  return (
    <div id='content_frame' className='flex flex-col items-center justify-center'>
      <img
        src='/assets/images/CPC.png'
        className='mb-[50px] rounded-lg border-[1px] border-grey-200'
      />
      <section
        id='contents'
        className='max-w-[760px] space-y-[50px] divide-y-2 divide-grey-200'
      >
        <section id='content_header' className='space-y-[50px]'>
          <p className='text-3XL/Bold'>CPC 광고하기 좋은 키워드 찾기!</p>

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
                  키워드 광고의 클릭당 단가가 높다해서 입찰 경쟁이 심하다고 볼 수 없어요.
                </li>
                <li>
                  CPC광고하기 좋은 키워드인지 여부를 판단하기 위해서는 ‘시장 가격’을 함께
                  조사해야해요.
                </li>
                <li>
                  키워드의 CPC단가/평균 판매가(%)를 계산하여 광고 경쟁 강도를 계산할 수
                  있어요.
                </li>
              </ul>
            </div>
          </section>
          <section id='content_mechanism'>
            <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
              <p className='text-2XL/Bold'>CPC광고란?</p>
              <div className='space-y-[50px]'>
                <p>
                  CPC(Cost per Click)광고란, 특정 광고 영역이 클릭될 때마다 비용이
                  과금되는 형태의 디지털 광고를 의미합니다. 트래픽이 많이 발생하는
                  포털사나 이커머스 플랫폼에서는 CPC 광고 영역을 광고주들에게 입찰을 통해
                  판매함으로서 수익을 내고 있습니다.
                </p>
                <p>
                  광고주들은 광고 영역에 자신의 콘텐츠(또는 상품)를 서로 노출시키기 위해
                  클릭당 광고비를 얼마까지 지불할 것인지에 대한 입찰 경쟁을 하게되며, 더
                  높은 입찰가를 제안하는 광고주의 콘텐츠가 더 많이 더 자주 노출되는 영역을
                  차지하게 됩니다.
                </p>
                <p>
                  CPC광고를 보통 키워드 광고라 부르기도 하는데, 그 이유는 광고주들이 가장
                  흔하게 이용하는 CPC 형태의 광고가 특정 키워드를 검색 시 화면 상단에
                  자신의 콘텐츠를 노출시키는 광고이기 때문입니다.
                </p>
              </div>
            </div>
          </section>
        </section>

        <section className='pt-[50px]' id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>Shopee 키워드 광고</p>
            <div className='space-y-[50px]'>
              <p>
                Shopee는 키워드별 검색결과 화면마다 위 이미지와 같이 CPC 광고 영역을
                제공하고 있습니다. 이제 막 Shopee에 입점한 신규 판매자 혹은 신규
                상품이라면, 기존 경쟁 상품들을 뚫고 키워드 검색결과 화면 상단에 노출시키기
                어렵기 때문에 CPC 광고를 통한 노출 기회를 노려볼 수 있습니다.
              </p>
              <img src='/assets/images/cpc/CPC1.png' />
              <p>
                Shopee 셀러센터에 접속하면 CPC 광고를 집행할 키워드와 입찰 금액을 설정할
                수 있습니다. 위 화면에서 키 워드별 최근 30일 검색량과 상품을 노출시키기
                위한 추천 입찰 가격을 알려주고 있지만, 이 두 가지 정보로는 키워드의 입찰
                경쟁 강도와 광고 효율을 예측하기 어렵다는 한계가 있습니다.
              </p>
              <p>
                결론부터 말씀드리자면,
                <span className='text-L/Bold'>
                  키워드의 입찰 경쟁 강도를 분석하고 광고 효율을 예측하기 위해서는
                  시장가격이 얼마 에 형성되어 있는지를 함께 파악
                </span>
                해야합니다.
              </p>
            </div>
          </div>
        </section>

        <section className='pt-[50px]' id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>입찰 경쟁 강도 파악하기</p>
            <div className='space-y-[50px]'>
              <p>
                키워드의 입찰 경쟁 강도를 파악하기 위해 시장 가격을 확인하는 방법은 매우
                간단합니다. 해당 키워드를 Sho pee에 실제로 검색하여 상품들이 얼마에
                판매되고 있는지를 분석하는 것입니다. 예를들어 싱가포르 Shopee 에서
                <span className='text-L/Bold'> mask</span>를 검색한다면, 노출되는 상위
                50개 상품들의 평균 판매가는 한화로 2,000원 수준이지만
                <span className='text-L/Bold'> dog pr obiotics</span>를 검색하면 27,000원,
                <span className='text-L/Bold'> 32 inch tv</span>를 검색하면 234,749원
                수준으로 판매되고 있습니다.
              </p>
              <p>
                평균 판매가격이 높게 형성된 키워드일수록 CPC 입찰가는 비싸집니다. 그
                이유는 판매가격이 높은 상품들의 마진금액이 그만큼 크기 때문입니다.
                100,000원짜리 상품을 판매하는 셀러들은 클리당 비용 1,000원을 기꺼 이
                지불할 수 있겠지만 5,000원 짜리 상품을 판매하는 셀러들의 경우 클릭당
                1,000원의 비용을 지불한다면 마진을 남기기가 쉽지 않을 것이기 때문입니다.
              </p>
              <p>
                따라서 키워드의 입찰 경쟁을 보다 정확하게 파악하기 위해서는 키워드의 평균
                판매가 대비 입찰 경쟁 비율이 몇 % 수준인지를 봐야하는 것입니다.
              </p>
              <div className='border-l-[4px] border-grey-800'>
                <ul className='ml-5 flex flex-col gap-5 py-3 text-L/Regular'>
                  <li>{`CPC 비용 / 평균 판매가 낮다면? > 입찰경쟁이 수월하고 CPC 광고를 하기 좋은 키워드`}</li>
                  <li>{`CPC 비용 / 평균 판매가 높다면? > 입찰경쟁이 심하고 CPC 광고를 하기 나쁜 키워드`}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='pt-[50px]' id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>입찰 경쟁 강도를 분석하는 가장 빠른 방법</p>
            <img className='pb-[30px]' src='/assets/images/cpc/CPC2.png' />
            <div className='space-y-[50px]'>
              <p>
                고미인사이트의 ‘키워드 분석’ 기능을 활용하면 키워드의
                <span className='ml-1 text-L/Bold'>
                  CPC 비용, 평균 판매가, CPC 비율 데이터 확인
                </span>
                이 가 능하며, 이를 기반으로 입찰 경쟁 강도를 빠르게 확인할 수 있습니다.
              </p>
              <img className='pb-[30px]' src='/assets/images/cpc/CPC3.png' />
              <p>
                아울러 분석을 요청한 키워드와 함께 가장 많이 검색되고 있는 연관 키워드들과
                각 연관 키워드들의 입찰 경쟁 강도 데이터도 확인함으로서 CPC 광고를
                집행하기 좋은 키워드들을 빠르게 탐색해볼 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className='pt-[50px]' id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>결론</p>
            <div className='space-y-[50px]'>
              <p>
                키워드 광고의 목적이 단순히 매출 규모를 만들어 내는 것이라면 입찰 경쟁이
                심하더라도 검색량이 많은 키워 드를 광고하는 것이 적합할 수 있습니다.
                하지만 키워드 광고의 목적이 이익 창출이라면 고미인사이트가 제공 하는
                데이터를 활용하여 키워드의 입찰 경쟁 강도와 CPC 광고의 적합성을
                판단해보세요.
              </p>
            </div>
          </div>
        </section>

        <section id='recommand_contents'>
          <div className='mt-[50px] flex flex-col gap-5'>
            <p className='text-2XL/Bold'>아래 컨텐츠도 확인해보세요!</p>
            <div className='flex flex-col gap-[50px]'>
              <Card content={Search_Trend} type='recommandation' />
              <Card content={CVR} type='recommandation' />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
