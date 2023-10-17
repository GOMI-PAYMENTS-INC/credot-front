import { PATH } from '@/common/constants';

export const CONTENT_LIST = [
  {
    text: `SERP, 검색 결과 화면 분석의 중요성`,
    category: 'insight',
    path: `/blog/${PATH.SERP}`,
    img: '/assets/images/thumbnail/SERP.png',
    mainImg: '/assets/images/SERP.png',
    subscription: `이커머스 플랫폼 매출의 86%가 '키워드 검색'으로부터 시작되는만큼, 검색결과
    화면에 내 상품을 노출시키는 것이 중요해요. 우리는 Shopee의 검색 알고리즘이
    로직으로 상품의 노출 순위를 정하는지 알 수 없기 때문에, 상위 노출 상품들의
    공`,
    name: 'Kai',
    position: 'CEO & Co-Founder',
    updatedAt: '2023.08.17',
  },
  {
    text: '상위 노출의 중요성과 SEO',
    category: 'insight',
    path: `/blog/${PATH.SEO}`,
    img: '/assets/images/thumbnail/SEO.png',
    mainImg: '/assets/images/SEO.png',
    subscription: `우리가 Shopee와 같은 이커머스 플랫폼을 통해 상품을 구매했던 경험을 생각해보면, 구매 또는 탐색하고자 하는 상품의 키워드를 검색하고 이후 노출되는 수많은 상품들중 지극히 일부만을 클릭하여 보다 자세한 내용을 확인했던 것을 기억할 수 있습니다.`,
    name: 'Kai',
    position: 'CEO & Co-Founder',
    updatedAt: '2023.08.17',
  },
  {
    text: "시장의 트랜드를 알려주는 '검색량 추이'",
    category: 'product',
    path: `/blog/${PATH.SEARCH_TREND}`,
    img: '/assets/images/thumbnail/SearchTrend.png',
    mainImg: '/assets/images/SearchTrend.png',
    subscription: `시장은 키워드를 통해 얼마나 많은 거래액(매출)이 발생하는지를 의미합니다. 시장은 계절에 따라 변하기도 하 며, 외부적인 요인으로 인해 급성장하거나 급하락하는 경우도 발생합니다. 계절에 따라 변하는 시장의 대표적 인 키워드로는 여름철 ‘모기장’이나 겨울철 ‘핫팩‘ 등이 있습니다.`,
    name: 'Kai',
    position: 'CEO & Co-Founder',
    updatedAt: '2023.08.17',
  },
  {
    text: '구매자들의 검색 의도를 알려주는 ‘구매 전환율’',
    category: 'product',
    path: `/blog/${PATH.CVR}`,
    img: '/assets/images/thumbnail/CVR.png',
    mainImg: '/assets/images/CVR.png',
    subscription: `Shopee와 같은 이커머스 플랫폼의 매출은 86%가 ‘검색’으로부터 발생된다는 통계가 있을 만큼, 대부분의 소 비자들은 검색창에 키워드를 입력하는 행위로부터 인터넷 쇼핑을 시작합니다. `,
    name: 'Kai',
    position: 'CEO & Co-Founder',
    updatedAt: '2023.08.17',
  },
  {
    text: 'CPC 광고하기 좋은 키워드 찾기!',
    category: 'product',
    path: `/blog/${PATH.CPC}`,
    img: '/assets/images/thumbnail/CPC.png',
    mainImg: '/assets/images/CPC.png',
    subscription: `CPC(Cost per Click)광고란, 특정 광고 영역이 클릭될 때마다 비용이 과금되는 형태의 디지털 광고를 의미합 니다. 트래픽이 많이 발생하는 포털사나 이커머스 플랫폼에서는 CPC 광고 영역을 광고주들에게 입찰을 통해 판매함으로서 수익을 내고 있습니다.`,
    name: 'Kai',
    position: 'CEO & Co-Founder',
    updatedAt: '2023.08.17',
  },
];

export const CATEGORY_LIST = [
  { text: '인사이트', value: 'insight', path: 'insight', children: CONTENT_LIST },
  { text: '제품', value: 'product', path: 'product' },
  { text: '소식', value: 'news', path: 'news' },
];

export const SEO_LIST = [
  '상품 제목에 사용된 키워드',
  '상품 제목의 글자 수',
  '할인율',
  '판매가',
  '최근 30일 판매량',
  '최근 30일 매출',
  '상품의 평점',
  '리뷰 수',
  '좋아요 수',
  '등록된 상품',
  '이미지 수 ',
  '영상 등록 여부',
  '영상의 길이',
  '문의글 수',
  '문의 답글 수',
  '셀러의 팔로워 수',
  '셀러의 보유 상품 수',
  '셀러의 평점',
  '셀러의 문의 응답률',
  '셀러의 문의 응답 시간',
];

export const SEO_INSIGHT = [
  '상품 제목 글지 수',
  '적절한 상품 영상 길이',
  '카테고리 등록',
  '최소 문의 응답 시간',
  '확보해야할 샵 팔로워 수',
  '최소 상품 평점 ',
];
