import { SEO_LIST } from '@/blog/constants';

export const SERP = () => {
  return (
    <div id='content_frame' className='flex flex-col items-center justify-center'>
      <img src='/assets/images/SERP.png' className='pb-[50px]' />
      <section id='contents' className='max-w-[760px] space-y-[100px]'>
        <section id='content_header' className='space-y-[50px]'>
          <p className='text-3XL/Bold'>SERP, 검색 결과 화면 분석의 중요성</p>

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
                  이커머스 플랫폼 매출의 86%가 ‘키워드 검색’으로부터 시작되는만큼,
                  검색결과 화면에 내 상품을 노출시키는 것이 중요해요.
                </li>
                <li>
                  우리는 Shopee의 검색 알고리즘이 어떠한 로직으로 상품의 노출 순위를
                  정하는지 알 수 없기 때문에, 상위 노출 상품들의 공통점들을 분석해서
                  유추해볼 수 있어요.
                </li>
                <li>
                  키워드 검색결과 화면 내 상위 노출 상품들을 직접 분석한다는 것은 많은
                  시간과 노력, 지식이 요구되는 작업으로서, 고미인사이트의 ‘키워드 분석’
                  기능을 활용해보세요.
                </li>
              </ul>
            </div>
          </section>
        </section>

        <section id='content_about_search'>
          <img src='/assets/images/SearchBars.png' className='mb-[50px]' />
          <div className='flex flex-col gap-5'>
            <p className='text-2XL/Bold'>검색이란</p>
            <p className='text-L/Regular leading-[44px]'>
              Shopee 또한 예외는 아닙니다. 그들의 데이터베이스 속에 있는 수억개의 상품들중
              소비자들이 키워드 검색 시 최대한 매출로 이어질 상품들을 먼저, 그리고 많이
              보여주어야 Shopee의 비즈니스가 성장하기 때문이죠. 예를들어 소비자가 ‘사과’를
              검색했을 시 Shopee의 데이터베이스 속 수많은 사과 상품들이 검색 알고리즘에
              의해 품질이 매겨지고 점수가 높은 상품순으로 화면에 먼저 보여질 것입니다.
              우리는 이 화면을 ‘검색결과 화면’ 또는 ‘SERP(Search Engine Result page)’라
              부릅니다.
            </p>
          </div>
        </section>

        <section id='content_mechanism'>
          <div className='flex flex-col gap-5'>
            <p className='text-2XL/Bold'>상품 노출 순위가 정해지는 원리</p>
            <p className='text-L/Regular leading-[44px]'>
              우리가 매일 온라인상에서 하는 행동중 하나인 ‘검색’은 검색 엔진이 나름의
              알고리즘으로 데이터 베이스 속 정보들을 브라우저 화면으로 불러오도록 하는
              프로세스입니다. 이커머스 플랫폼의 약 86% 매출은 ‘검색’으로부터 발생한다는
              통계가 있을만큼, 소비자들이 키워드 검색 시 최대한 그들이 원하는 상품들을
              보여주기 위해 이커머스 플랫폼들은 검색 알고리즘에 대한 많은 연구를
              지속적으로 하고 있습니다.
            </p>
            <img src='/assets/images/SearchEngine.png' className='my-[30px]' />
            <p className='text-L/Regular leading-[44px]'>
              검색엔진의 알고리즘은 키워드 검색결과 화면을 나타내기 위해 데이터베이스 속
              상품들을 굉장히 다양한 항목들로 구분하여 평가할 것입니다. 그중 모든
              검색엔진들이 가장 기본적으로 체크하는 항목은 바로 “상품 제목에 소비자가
              입력한 키워드가 있는가?”일 것입니다. 그 외에도 중요도는 다르겠지만 만족도,
              제목, 리뷰, 이미지, 영상, 문의 등 매우 다양한 요소들이 평가될 것입니다.
            </p>

            <p className='mt-[30px] text-XL/Bold'>
              검색엔진의 상품 노출순위 평가 항목 예시
            </p>
            <div className='border-l-[8px] border-grey-300'>
              <ul className='ml-5 flex flex-col gap-5 py-3 text-L/Regular'>
                <li>상품 제목에 소비자가 입력한 키워드가 있는가?</li>
                <li>해당 상품의 최근 30일 판매량이 얼마나 많은가?</li>
                <li>
                  판매자의 문의 응답 속도가 얼마나 빠른가? 상품의 출고일이 얼마나 빠른가?
                </li>
                <li>상품의 리뷰가 얼마나 많이 쌓여있는가?</li>
                <li>상품의 대표 이미지가 몇개 등록되어 있는가?</li>
                <li>. . .</li>
              </ul>
            </div>
          </div>
        </section>

        <section id='content_important_of_analysis_serp'>
          <div className='flex flex-col gap-5'>
            <p className='text-2XL/Bold'>검색결과 화면 분석의 중요성</p>
            <div className='space-y-[50px] text-L/Regular leading-[44px]'>
              <p>
                만약, Shopee의 검색 엔진 알고리즘을 우리가 100% 파악할 수 있다면 어떻게
                될까요? 광고비 없이도 업로드하는 상품마다 키워드 검색결과 화면 1위에
                노출될 것이고 이는 곧 엄청난 매출로 이어지게 될 것 입니다. 하지만 아쉽게도
                우리는Shopee의 검색엔진 알고리즘이 어떤 개발 코드들로 짜여져 있는지
                정확하게 알 방법이 없습니다.
              </p>

              <img src='/assets/images/SearchImportant.png' className='' />
              <p>
                따라서 우리는 키워드 검색결과 화면에서 어떤 상품들이 상위에 노출되고 있고,
                이 상품들간의 상관 관계나 통계 분석을 통해 역으로 검색 알고리즘이 상품
                순위를 결정하는 로직을 유추하고 적용함으로서, 내 상품이 최대한 상위에
                노출되도록 상품을 등록하고 운영을 해야하는 것입니다. 우리는 이러한
                작업들을 검색 엔진 최적화 또는 SEO라고 부릅니다.
              </p>
            </div>
          </div>
        </section>

        <section id='content_seo'>
          <div className='flex flex-col gap-5'>
            <p className='text-2XL/Bold'>검색 엔진 최적화(SEO)를 위한 수동 작업</p>
            <div className='space-y-[50px] text-L/Regular leading-[44px]'>
              <img src='/assets/images/SearchImportant.png' className='' />
              <p>
                Shopee 검색 엔진 최적화 작업을 수동으로 진행해보겠습니다. 먼저 Shopee에서
                내가 판매하고자 하는 상품의 키워드를 입력해봅니다. 키워드 검색 시 광고
                영역을 제외하고 최대 50개의 상품들이 첫 페이지에 노출될 것입니다. 우리는
                이 50개의 상품들이 어떠한 이유로 Shopee의 검색 알고리즘의 선택을 받게
                되었는지를 분석하기 위해 각 상품들의 상세 페이지에 접속하여 다양한
                항목들에 대한 데이터들을 취합해야 할 것입니다.
              </p>

              <div className=''>
                <p className='mb-5 text-XL/Bold'>조사해볼만한 항목들</p>
                <div className='border-l-[8px] border-grey-300'>
                  <ul className='ml-5 flex h-[240px] flex-col flex-wrap gap-5 py-3 text-L/Regular'>
                    {SEO_LIST.map((list, index) => {
                      return <li key={`seo_list_${index}`}>{list}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <p>
                위에 나열된 항목들 외에도 Shopee 검색엔진은 상품의 노출 순위를 정하기 위해
                더욱 다양하고 세분화된 항목들을 평가할 것입니다. 물론 상품과 관련된 모든
                항목들이 노출 순위를 정하는 평가 요소들이 아닐 수도 있으며 각 항목들이
                노출 순위에 영향을 주는 정도도 각기 다를 것입니다.
              </p>
              <p>
                이미 느끼셨겠지만, 사람이 직접 키워드 검색결과 화면을 분석하기 위해 50개의
                상품들에 직접 접속하여 데이터를 수집한다는 것이 결코 쉬운일이 아니며 많은
                시간 또한 소요될 것입니다. 데이터 수집 이후에는 50개의 상품들의 각
                항목들마다 어떠한 특징을 갖고 있는지 통계적으로 분석하거나 상관관계를
                도출하는 과정에서 전문적인 수학적 지식이 요구될 수도 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section id='content_explain_gomi_report'>
          <div className='flex flex-col gap-5'>
            <p className='text-2XL/Bold'>키워드 분석 기능으로 SERP 분석을 한 눈에!</p>
            <div className='space-y-[50px] text-L/Regular leading-[44px]'>
              <img src='/assets/images/SearchImportant.png' className='' />
              <p>
                고미인사이트의 ‘키워드 분석’기능은 키워드 검색결과 내 상위 노출 상품들을
                다양한 항목별로 구분하여 분석한 자료를 제공합니다. 키워드 검색결과 내 상위
                노출 상품들이 가장 많이 등록된 카테고리는 무엇인지부터 상품 영상들은 몇초
                길이로 어떻게 촬영되었는지 등 다양하고 세분화된 항목별 분석 자료들을 한
                눈에 확인할 수 있습니다.
              </p>

              <p>
                키워드 분석을 통해 상위 노출 상품들의 공통점을 파악하고 이를 본인의 상품에
                적용해보세요. 앞으로 더 많은 노출 기회와 동시에 더 많은 매출을 기대할 수
                있을 것입니다.
              </p>
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
