import { GlobalEnv } from '@/api/config';

export const PATH = {
  MAIN: '/',
  PRICE: '/price',
  BLOG: '/blog',
  CATEGORY: 'category/:id',
  SERP: 'category/insight/serp',
  SEO: 'category/insight/seo',
  SEARCH_TREND: 'category/insight/searchtrend',
  CVR: 'category/insight/cvr',
  CPC: 'category/insight/cpc',
};

export const HOME_QNA = [
  {
    subject: '고미인사이트는 어떤 서비스인가요?',
    content:
      "고미 인사이트는 동남아 대표 이커머스 플랫폼의 ‘Shopee'의 종합 분석 솔루션이에요. 키워드에 대한 시장분석 및 상위 노출 인사이트를 제공하며, 추후 내 상품의 품질 측정과 경쟁사 모니터링 등 다양한 솔루션들이 추가될 예정이에요.",
  },
  {
    subject: '어떤 장점이 있고 언제 도움을 받을 수 있나요?',
    content:
      '데이터를 기반으로 Shopee 진입을 위한 유리한 키워드, 시장 규모 분석, 적절한 판매가, 경쟁사 분석에 대한 리포트를 제공해요. 신규 상품을 소싱하여 업로드하거나 이미 판매중인 상품의 품질 개선을 위해 사용할 수 있어요.',
  },

  {
    subject: '서비스 이용료가 궁금해요!',
    link: `${GlobalEnv.officeUrl}/price`,
    linkName: '요금 안내 바로 가기',
    content: '자세한 고미인사이트 서비스 이용료는 요금 안내 페이지를 확인해주세요.',
  },

  {
    subject: '분석이 가능한 Shopee 국가는 어디인가요?',
    content:
      '현재는 싱가포르, 대만, 말레이시아, 베트남, 태국에 대한 분석을 제공하고 있어요. 점진적으로 Shopee의 모든 국가를 지원할 예정이며 회원가입 시 업데이트 소식을 빠르게 받아보실 수 있어요!',
  },
  {
    subject: '그 외 추가적인 문의가 있어요!',
    content:
      '그 외 추가적인 문의가 있으신 경우 support@gomiinsight.com 으로 문의주시면 최대한 빠른 답변드릴께요.',
  },
];

export const PRICE_QNA = [
  {
    subject: '구독 결제에 대해 설명해주세요.',
    content:
      '매월 계정에 등록된 카드로 서비스 이용료를 자동 결제하는 방식이에요. 다음달 결제일은 이번달 결제일로부터 30일 후이며, 오전 7시에 결제가 시도되어요. 만약 8월 25일에 결제를 했다면, 다음달 결제일은 30일 후인 9월 24일이에요.',
  },
  {
    subject: '결제 전에 무료로 체험해볼 수 있나요?',
    content:
      '회원가입 시 자동으로 Free 플랜이 적용되며, 매월 키워드 리포트를 최대 5회까지 무료로 생성할 수 있어요. 결제를 하지 않아도 매월 5개의 키워드 리포트 생성이 가능해요.',
  },

  {
    subject: '플랜을 업그레이드 하고 싶어요.',
    content:
      '플랜 업그레이드는 로그인 후 ‘구독 및 결제’ 페이지에서 가능해요. 상위 플랜으로 업그레이드 시 기존 플랜에서 남은 사용량만큼 할인이 적용되어요. 만약 Starter 플랜(10,000원)에서 20/50만큼 사용 후 Pro 플랜(16,000원)으로 변경한다면, 남은 사용량인 6,000원(10,000원*30/50)이 할인된 10,000원이 결제되어요.',
  },
  {
    subject: '구독 해지 및 플랜을 다운그레이드 하고 싶어요.',
    content:
      "구독 해지 및 플랜 다운그레이드는 ‘구독 및 결제' 페이지에서 신청 가능할 수 있어요. 변경된 플랜은 다음 결제일부터 적용되어요.",
  },

  {
    subject: '환불 정책은 어떻게 되나요?',
    link: 'https://capable-soy-f58.notion.site/cd55e2b331d74068be7b40eb542be3e5?pvs=4',
    linkName: '환불 정책 자세히 보기',
    content:
      '구독하신 플랜과 해당 월에 발행하신 리포트의 수에 따라 환불 여부와 금액은 달라져요. 환불은 고미인사이트 서비스 내 채팅 문의를 통해 신청할 수 있어요.',
  },
];
