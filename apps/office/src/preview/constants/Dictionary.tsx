const MARKET = [
  {
    title: '검색 트렌드',
    description:
      "작년도 키워드의 월별 검색 수요도를 나타낸 차트에요. 차트는 검색량이 가장 많은 달을 '100'으로 환산하여 그려졌어요.",
  },
  {
    title: '매출',
    description: (
      <>
        <p>
          키워드 검색 시 노출되는 상위 상품들이 최근 30일간 판매된 금액의 총합과
          평균이에요
        </p>
        <p className='mt-4'>최근 한 달간의 키워드 시장 규모를 파악할 수 있어요.</p>
      </>
    ),
  },
  {
    title: '판매량',
    description: (
      <>
        <p>키워드 검색 시 노출되는 상위 상품들이 최근 30일간 판매량 총합과 평균이에요.</p>
        <p className='mt-4'>최근 한 달간의 키워드 거래량을 파악할 수 있어요.</p>
      </>
    ),
  },
];
const KEYWORD = [
  {
    title: '종합 평가-검색량',
    description: (
      <div>
        키워드의 최근 30일 검색량을 5개 등급으로 나누어 평가했어요.
        <ul className='ml-5 list-disc'>
          <li>매우 좋음 : 3,000건 이상</li>
          <li>좋음 : 1,000건 이상 3,000건 미만</li>
          <li>보통 : 500건 이상 1,000건 미만</li>
          <li>매우 좋음 : 300건 이상 500건 미만</li>
          <li>매우 나쁨 : 300건 미만</li>
        </ul>
      </div>
    ),
  },
  {
    title: '종합 평가-노출 경쟁',
    description: (
      <div>
        [검색량 : 경쟁상품 수]의 비율을 5개 등급으로 나누어 평가해요.
        <ul className='ml-5 list-disc'>
          <li>매우 좋음 : 0.5 미만</li>
          <li>좋음 : 0.5 이상 1 미만</li>
          <li>보통 : 1 이상 3 미만</li>
          <li>매우 좋음 : 3 이상 5 미만</li>
          <li>매우 나쁨 : 5 이상</li>
        </ul>
      </div>
    ),
  },
  {
    title: '종합 평가-CPC 경쟁',
    description: (
      <div>
        평균 판매가 대비 CPC 금액의 비율을 5개 등급으로 나누어 평가해요.
        <ul className='ml-5 list-disc'>
          <li>매우 좋음 : 3% 미만</li>
          <li>좋음 : 3% 이상 5% 미만</li>
          <li>보통 : 5% 이상 10% 미만</li>
          <li>나쁨 : 10% 이상 15% 미만</li>
          <li>매우 나쁨 : 15% 이상</li>
        </ul>
      </div>
    ),
  },
  {
    title: '노출 경쟁률',
    description:
      "키워드의 최근 30일 검색량을 '1'로 보았을 때 경쟁상품 수의 비율을 의미해요. 시장에 대한 수요대비 공급 비율을 파악할 수 있어요.",
  },
  {
    title: '검색량',
    description: '최근 30일 간 Shopee에서 발생한 키워드의 검색량을 의미해요.',
  },
  {
    title: '경쟁상품 수',
    description: '키워드 검색 시 노출되는 경쟁상품의 총 갯수를 의미해요.',
  },
  {
    title: 'CPC 비율',
    description:
      '상품들의 평균 판매가격 대비 해당 키워드의 CPC 가격의 비율(%)을 의미해요. CPC광고의 경쟁 강도를 알 수 있어요.',
  },
  {
    title: 'CPC',
    description: '해당 키워드로 CPC 광고 집행 시 노출이 되기 위한 입찰 가격을 의미해요.',
  },
  {
    title: '평균 판매가',
    description: '키워드 검색 시 노출되는 상품들이 판매되고 있는 평균적인 가격이에요.',
  },
  {
    title: '추천 키워드',
    description:
      'Shopee에서 리포트를 생성한 키워드와 함께 가장 많이 검색되고 있는 키워드들의 상세 정보에요.',
  },
];

const BRAND = [
  {
    title: '브랜드 정보-순위',
    description: '선택된 브랜드 상품들의 매출 합계를 기준으로 매겨진 순위에요.',
  },
  {
    title: '브랜드 정보-상품수',
    description: '수집된 상품들중 선택된 브랜드의 상품 수에요.',
  },
  {
    title: '브랜드 정보-매출 합계',
    description: '선택된 브랜드 상품들의 매출 합계에요.',
  },
  {
    title: '브랜드 정보- 판매량 합계',
    description: '선택된 브랜드 상품들의 판매량 합계에요.',
  },
  {
    title: '브랜드 정보- 평균 매출',
    description: '선택된 브랜드 상품들의 평균 매출이에요.',
  },
  {
    title: '브랜드 정보- 평균 판매량',
    description: '선택된 브랜드 상품들의 평균 판매량이에요.',
  },
  {
    title: '브랜드 정보- 평균 판매가',
    description: '선택된 브랜드 상품들의 평균 판매 가격이에요.',
  },
  {
    title: '브랜드 상품',
    description: '선택된 브랜드에 해당하는  상품들의 상세 정보에요.',
  },
];

const PRICE = [
  {
    title: '판매가 정보',
    description: '상품들의 최저 판매가격과 평균 판매가격을 의미해요.',
  },
  {
    title: '판매가 분포 차트',
    description: '상품들의 판매가를 구간별로 나누어 분포도를 나타낸 차트에요.',
  },
  {
    title: '가격 낮은 상품',
    description: '최저가 상위 20%에 해당하는 상품들의 상세 정보에요.',
  },
  {
    title: '가격 보통 상품',
    description: '최저가 상위 20~80%에 해당하는 상품들의 상세 정보에요.',
  },
  {
    title: '가격 높은 상품',
    description: '최저가 상위 20~80%에 해당하는 상품들의 상세 정보에요.',
  },
];

const OVERSEA = [
  {
    title: '해외 상품 비율',
    description:
      '현지가 아닌 국가로부터 배송되는 상품들에 대한 정보에요.타 키워드 대비 해외 배송 상품의 많고 적음 여부도 알려드려요.',
  },
];

const CATEGORY = [
  {
    title: '카테고리',
    description: '상품들이 가장 많이 등록된 카테고리 순위를 나타낸 정보에요.',
  },
];

export const DICTIONARY = {
  MARKET,
  KEYWORD,
  BRAND,
  PRICE,
  OVERSEA,
  CATEGORY,
};
