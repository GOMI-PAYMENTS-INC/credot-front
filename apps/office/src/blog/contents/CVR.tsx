import { Card } from '@/blog/elements';
import { CONTENT_LIST } from '@/blog/constants';

export const CVR = () => {
  const [Search_Trend, _, CPC] = CONTENT_LIST.filter(
    (content) => content.category === 'product',
  );
  return (
    <div id='content_frame' className='flex flex-col items-center justify-center'>
      <img src='/assets/images/CVR.png' className='pb-[50px]' />
      <section
        id='contents'
        className='max-w-[760px] space-y-[50px] divide-y-2 divide-grey-200'
      >
        <section id='content_header' className='space-y-[50px]'>
          <p className='text-3XL/Bold'>구매자들의 검색 의도를 알려주는 ‘구매 전환율’</p>
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
                  키워드는 구매자들의 검색 의도에 따라 메인 키워드와 세부키워드로
                  나누어져요.
                </li>
                <li>
                  메인 키워드는 검색량은 많지만 노출 경쟁이 심하고 구매 전환율은 낮은
                  편이에요.
                </li>
                <li>
                  세부 키워드는 검색량은 적지만 노출 경쟁이 용이하고 구매 전환율은 높은
                  편이에요.
                </li>
                <li>신규 상품일 수록 세부 키워드를 공략하는게 용이할 수 있어요.</li>
                <li>
                  상품 등록 시 상품의 메인 키워드와 세부 키워드들을 먼저 리스트업 해보고
                  ‘키워드 분석’ 기능을 활용해 공략할 키워드를 정해보세요.
                </li>
              </ul>
            </div>
          </section>
          <section id='content_intro'>
            <div className='flex flex-col text-L/Regular leading-[44px]'>
              <div className='space-y-[50px]'>
                <p>
                  Shopee와 같은 이커머스 플랫폼의 매출은 86%가 ‘검색’으로부터 발생된다는
                  통계가 있을 만큼, 대부분의 소 비자들은 검색창에 키워드를 입력하는
                  행위로부터 인터넷 쇼핑을 시작합니다. 소비자들의 검색 행위에 대한 의 도는
                  크게 탐색과 구매로 나누어질 수 있으며, 검색 이후 노출되는 상품들을
                  얼마나 많이 구매했는지를 분석함 으로서 해당 키워드에 대한 검색 의도를
                  유추해볼 수 있습니다.
                </p>
                <p>
                  일반적으로 소비자들은 관심 있는 상품을 탐색하기 위해 범용적인 의미를
                  가진
                  <span className='text-L/Bold'> 메인 키워드</span>(ex_자전거)를 먼 저
                  검색하고 이후 특정 상품에 대한 구매 목적이 뚜렷해질수록
                  <span className='text-L/Bold'> 세부 키워드</span>(ex_A 접이식 자전거)를
                  입력해 나 가는 행동 패턴을 나타냅니다.
                </p>
                <p>
                  탐색 목적의 메인 키워드는 검색량은 많지만 검색량 대비 구매로 전환되는
                  비율은 상대적으로 낮은 특징이 있 으며, 반대로 구매 목적이 강한 세부
                  키워드는 검색량은 적지만 그만큼 구매로 전환되는 비율은 높다는 특징이
                  있습니다.
                </p>
              </div>
            </div>
          </section>
        </section>

        <section className='pt-[50px]' id='content_mechanism'>
          <div className='flex flex-col gap-5 text-L/Regular leading-[44px]'>
            <p className='text-2XL/Bold'>
              검색량이 많은 메인 키워드 VS 구매 전환이 많은 세부 키워드?
            </p>
            <div className='space-y-[50px]'>
              <p>
                상품 등록할 때 공략할 수 있는 키워드는 한정적이기 때문에, 우리는 어떤
                키워드를 공략해서 상품을 노출시킬 지 고민하게 됩니다. 메인 키워드를 공략
                시 검색량이 많아 매출이 많이 일어날 것 같지만 노출 경쟁이 심하고
                구매전환율이 낮은 단점이 있고 세부 키워드를 공략 시 검색량은 적지만 그만큼
                노출이 용이하고 구매전환율이 높은 장점이 있기 때문입니다.
              </p>
              <p>
                정답을 쉽게 답하기는 어렵지만,
                <span className='mx-1 text-L/Bold'>
                  신규 상품일수록 검색량은 적지만 구매전환 빈도가 높은 세부 키워드를 공략
                  하는 것이 매출에 유리하다 말할 수 있습니다.
                </span>
                메인 키워드는 검색량이 많지만 그만큼 경쟁 상품도 많기 때문에 신규 상품이
                실제로 소비자들에게 노출될 확률이 매우 낮기 때문입니다. 만약, 검색량과
                구매 전환율이 모두 높 지만 경쟁 상품이 많아 노출이 어려운 키워드일
                경우에는 CPC광고를 통해 상품을 노출 시키는 것도 좋은 전략 이 될 수
                있습니다.
              </p>
              <img src='/assets/images/CVR_IMG.png' />
              <p>
                고미인사이트의 키워드 분석 기능에서는 키워드의
                <span className='text-L/Bold'> 검색량</span>과
                <span className='text-L/Bold'> 구매전환율</span> 분석을 통해 소비자들이
                키워드를 검 색하는 의도가 얼마나 구매 목적성을 갖고 있는지를 빠르게 파악할
                수 있습니다. 아울러 노출 경쟁과 광고 경쟁 지표를 함께 참고함으로서
                키워드를 상품 등록에 활용할지 여부와 CPC 광고를 집행할지 여부도 쉽게
                판단할 수 있습니다.
              </p>
              <p>
                판매하고자 하는 상품의 메인 키워드와 세부 키워드들을 먼저 리스트업 하고,
                각각의 키워드를 분석해봄으로서 판매에 유리한 키워드를 분류한 뒤에
                마지막으로 해당 키워드를 상품 등록에 사용할지, CPC 광고에 활용할지 여부를
                판단해보시기 바랍니다.
              </p>
              <p>
                검색량과 구매 전환 빈도가 높고, 노출 경쟁과 광고 경쟁이 수월한 키워드라면
                더 할 나위 없이 좋겠죠? 😀
              </p>
            </div>
          </div>
        </section>

        <section id='recommand_contents'>
          <div className='mt-[50px] flex flex-col gap-5'>
            <p className='text-2XL/Bold'>아래 컨텐츠도 확인해보세요!</p>
            <div className='flex flex-col gap-[50px]'>
              <Card content={Search_Trend} type='recommandation' />
              <Card content={CPC} type='recommandation' />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
