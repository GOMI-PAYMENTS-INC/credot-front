export const SUBSCRIBE_QNA = [
  {
    subject: '정기 결제에 대해 설명해주세요.',
    content:
      '매월 정기 결제일에 계정에 등록한 카드로 서비스 이용료를 자동 결제하는 방식이에요. 정기 결제일은 플랜을 업그레이드한 날짜로부터 31일 후이며, 오전 7시에 결제가 시도되어요. 만약 8월 25일에 플랜을 업그레이드 했다면, 다음 정기 결제일은 31일 후인 9월 24일이에요.',
  },
  {
    subject: '결제 전에 무료로 체험해볼 수 있나요?',
    content:
      '회원가입만 시 자동 Free 플랜이 적용되며, 매월 키워드 리포트를 최대 5회까지 무료로 생성할 수 있어요. 리포트 발행 수의 제한은 있지만 유료 회원과 동일한 리포트 생성이 가능하기 때문에 고미인사이트를 미리 체험하실 수 있어요.',
  },

  {
    subject: '플랜을 업그레이드 하고 싶어요.',
    content:
      '상위 플랜으로 업그레이드 하는 경우 기존 플랜에서 남은 사용량만큼 할인이 적용되어요. 만약 Starter 플랜(10,000원)에서 20/50만큼 사용 후 Pro 플랜(16,000원)으로 변경한다면, 남은 사용량인 6,000원(10,000원*30/50)이 할인되어 10,000원만 결제되며 정기결제일도 해당 일로 변경되어요.',
  },

  {
    subject: '구독 해지 및 플랜을 다운그레이드 하고 싶어요.',
    content:
      "구독 해지 및 플랜 다운그레이드는 ‘구독 및 결제' 페이지에서 신청 가능할 수 있어요. 변경된 플랜은 다음 정기결제일부터 적용되어요.",
  },
  {
    subject: '환불 정책은 어떻게 되나요?',
    content:
      '구독하신 플랜과 해당 월에 발행하신 리포트의 수에 따라 환불 여부와 금액은 달라져요. 환불은 고미인사이트 서비스 내 채팅 문의를 통해 신청할 수 있어요.',
    link: 'https://capable-soy-f58.notion.site/cd55e2b331d74068be7b40eb542be3e5?pvs=4',
    linkName: '환불 정책 자세히 보기',
  },
];

export const PLANS = [
  {
    name: 'Starter',
    originPrice: 20000,
    price: 10000,
    count: 50,
  },
  {
    name: 'Pro',
    originPrice: 32000,
    price: 16000,
    count: 150,
  },
];

export const RESULT_OF_PAY_REQUEST = {
  accepted: {
    title: '결제가 정상적으로 처리되었어요.',
    text: 'Accepted',
    buttonText: '확인',
    billText: '결제정보',
  },
  rejected: {
    title: '결제를 실패했습니다.',
    text: 'Rejected',
    buttonText: '확인',
    billText: '요청정보',
  },
};
