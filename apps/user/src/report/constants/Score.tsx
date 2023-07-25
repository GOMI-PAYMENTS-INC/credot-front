export const convertRecommendationScoreToText = (status: string) => {
  const divStyle =
    'py-0.5 xs:h-fit w-[58px] xs:w-fit xs:px-1 rounded border-[1.5px] text-center';
  const pStyle = 'text-XS/Medium xs:text-M/Medium';
  switch (status) {
    case 'A': {
      return (
        <div className={`border-blue-300 ${divStyle}`}>
          <p className={`text-blue-700 ${pStyle}`}>매우좋음</p>
        </div>
      );
    }
    case 'B': {
      return (
        <div className={`border-[#C9F5DF] ${divStyle}`}>
          <p className={`text-[#187A41] ${pStyle}`}>좋음</p>
        </div>
      );
    }
    case 'C': {
      return (
        <div className={`border-[#D9D9D9] ${divStyle}`}>
          <p className={` text-[#262626] ${pStyle}`}>보통</p>
        </div>
      );
    }
    case 'D': {
      return (
        <div className={`border-yellow-400 ${divStyle}`}>
          <p className={` text-yellow-700 ${pStyle}`}>나쁨</p>
        </div>
      );
    }
    case 'E': {
      return (
        <div className={`border-red-300 ${divStyle}`}>
          <p className={`text-red-800 ${pStyle}`}>매우나쁨</p>
        </div>
      );
    }
    default:
      console.error('상태값을 다시 확인해주세요.');
      return;
  }
};

export const convertScoreToText = (status: string) => {
  switch (status) {
    case 'A': {
      return <p className='text-2XL/Bold text-[#1A9CFF]'>매우좋음</p>; //blue-600
    }
    case 'B': {
      return <p className='text-2XL/Bold text-[#15BD66]'>좋음</p>;
    }
    case 'C': {
      return <p className='text-2XL/Bold text-grey-700'>보통</p>;
    }
    case 'D': {
      return <p className='text-2XL/Bold text-[#F4B60D]'>나쁨</p>;
    }
    case 'E': {
      return <p className='text-2XL/Bold text-[#FF334B]'>매우나쁨</p>;
    }
    default:
      return;
  }
};

const SCORE = {
  AAA: {
    top: (
      <p>
        검색량이 많으면서 경쟁상품 수는 적은 키워드에요!
        <span className='text-S/Bold'> 상품 등록 시 적극적으로 활용하는 것을 추천</span>
        해요.
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 낮은 편이라,
        <span className='text-S/Bold'>
          CPC광고 효율과 매출이 모두 잘 나올 수 있는 키워드
        </span>
        에요.
      </p>
    ),
  },
  BAA: {
    top: (
      <p>
        검색량이 많지는 않지만 경쟁이 수월하여,
        <span className='text-S/Bold'>신규 상품 등록 시 공략하기 좋은 키워드에요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 낮은 편이라,
        <span className='text-S/Bold'>
          CPC광고 효율과 매출이 모두 잘 나올 수 있는 키워드
        </span>
        에요.
      </p>
    ),
  },
  CAA: {
    top: (
      <p>
        검색량은 적지만,
        <span className='text-S/Bold'>
          그만큼 경쟁이 수월한 키워드에요. 신규 상품 등록 시 공략하기 좋을 수 있어요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 낮은 편이라,
        <span className='text-S/Bold'>CPC광고를 집행해도 나쁘지 않을 키워드</span>
        에요.
      </p>
    ),
  },

  AAB: {
    top: (
      <p>
        검색량이 많으면서 경쟁상품 수는 적은 키워드에요!
        <span className='text-S/Bold'> 상품 등록 시 적극적으로 활용하는 것을 추천</span>
        해요.
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  BAB: {
    top: (
      <p>
        검색량이 많지는 않지만 경쟁이 수월하여,
        <span className='text-S/Bold'>신규 상품 등록 시 공략하기 좋은 키워드에요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장
        </span>
        드려요.
      </p>
    ),
  },

  CAB: {
    top: (
      <p>
        검색량은 적지만,
        <span className='text-S/Bold'>
          {' '}
          그만큼 경쟁이 수월한 키워드에요. 신규 상품 등록 시 공략하기 좋을 수 있어요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },

  AAC: {
    top: (
      <p>
        검색량이 많으면서 경쟁상품 수는 적은 키워드에요!
        <span className='text-S/Bold'> 상품 등록 시 적극적으로 활용하는 것을 추천</span>
        해요.
      </p>
    ),
    bottom: (
      <p>
        CPC광고는 입찰가가 높은 편이라,
        <span className='text-S/Bold'>
          이익보다는 초기 시장 진입을 위한 공격적인 마케팅에 적합
        </span>
        해요.
      </p>
    ),
  },

  BAC: {
    top: (
      <p>
        검색량이 많지는 않지만 경쟁이 수월하여,
        <span className='text-S/Bold'> 신규 상품 등록 시 공략하기 좋은 키워드에요. </span>
      </p>
    ),
    bottom: (
      <p>
        CPC광고는 입찰가는 높은 편이라,
        <span className='text-S/Bold'>광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },

  CAC: {
    top: (
      <p>
        검색량은 적지만, 그만큼 경쟁이 수월한 키워드에요.
        <span className='text-S/Bold'>신규 상품 등록 시 공략하기 좋은 키워드에요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 높은 편이라,
        <span className='text-S/Bold'> 광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },

  ABA: {
    top: (
      <p>
        검색량은 적지만, 그만큼 경쟁이 수월한 키워드에요.
        <span className='text-S/Bold'> 신규 상품 등록 시 공략하기 좋을 수 있어요.</span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'>
          CPC광고를 통해 매출을 노려볼 수 있는 키워드에요.
        </span>
      </p>
    ),
  },
  BBA: {
    top: (
      <p>
        검색량과 경쟁수준이 모두 보통인 키워드에요.
        <span className='text-S/Bold'>
          상품 등록에 사용 시 큰 효과를 기대하기는 어려워요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'>
          CPC광고를 통해 매출을 노려볼 수 있는 키워드에요.
        </span>
      </p>
    ),
  },
  CBA: {
    top: (
      <p>
        검색량이 적고 경쟁이 수월하지도 않아요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'> CPC광고를 집행해도 나쁘지 않을 키워드에요.</span>
      </p>
    ),
  },

  ABB: {
    top: (
      <p>
        검색량만큼 경쟁상품도 많은 키워드에요.
        <span className='text-S/Bold'>
          신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  BBB: {
    top: (
      <p>
        검색량과 경쟁수준이 모두 보통인 키워드에요.
        <span className='text-S/Bold'>
          상품 등록에 사용 시 큰 효과를 기대하기는 어려워요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  CBB: {
    top: (
      <p>
        검색량이 적고 경쟁이 수월하지도 않아요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },

  ABC: {
    top: (
      <p>
        검색량만큼 경쟁상품도 많은 키워드에요.
        <span className='text-S/Bold'>
          신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC광고는 입찰가가 높은 편이라, 이익보다는
        <span className='text-S/Bold'>초기 시장 진입을 위한 공격적인 마케팅에 적합</span>
        해요.
      </p>
    ),
  },
  BBC: {
    top: (
      <p>
        검색량과 경쟁수준이 모두 보통인 키워드에요.
        <span className='text-S/Bold'>
          상품 등록에 사용 시 큰 효과를 기대하기는 어려워요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 높은 편이라,
        <span className='text-S/Bold'>광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },

  CBC: {
    top: (
      <p>
        검색량이 적고 경쟁이 수월하지도 않아요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 높은 편이라,
        <span className='text-S/Bold'>광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },

  ACA: {
    top: (
      <p>
        검색량만큼 경쟁상품도 많은 키워드에요.
        <span className='text-S/Bold'>
          신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'>
          CPC광고를 통해 매출을 노려볼 수 있는 키워드에요.
        </span>
      </p>
    ),
  },
  BCA: {
    top: (
      <p>
        검색량 대비 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'>CPC광고를 통해 매출을 노려볼 수 있는 키워드</span>
        에요.
      </p>
    ),
  },
  CCA: {
    top: (
      <p>
        검색량은 적은데 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        다행히 CPC 입찰가는 낮은 편이라,
        <span className='text-S/Bold'> CPC광고를 집행해도 나쁘지 않을 키워드에요.</span>
      </p>
    ),
  },

  ACB: {
    top: (
      <p>
        검색량은 많지만, 경쟁이 아주 심한 키워드에요.
        <span className='text-S/Bold'>
          신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  BCB: {
    top: (
      <p>
        검색량 대비 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  CCB: {
    top: (
      <p>
        검색량은 적은데 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가는 보통 수준이라,
        <span className='text-S/Bold'>
          광고 집행 시 효율을 주기적으로 체크하는걸 권장드려요.
        </span>
      </p>
    ),
  },
  ACC: {
    top: (
      <p>
        검색량은 많지만, 경쟁이 아주 심한 키워드에요.
        <span className='text-S/Bold'>
          신규 상품인 경우 상품등록 시 사용을 추천하지 않아요.
        </span>
      </p>
    ),
    bottom: (
      <p>
        CPC광고는 입찰가가 높은 편이라, 이익보다는
        <span className='text-S/Bold'>초기 시장 진입을 위한 공격적인 마케팅에 적합</span>
        해요.
      </p>
    ),
  },
  BCC: {
    top: (
      <p>
        검색량 대비 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC광고는 입찰가가 높은 편이라,
        <span className='text-S/Bold'>광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },
  CCC: {
    top: (
      <p>
        검색량은 적은데 경쟁이 치열한 키워드에요.
        <span className='text-S/Bold'> 상품 등록 시 사용을 추천하지 않아요.</span>
      </p>
    ),
    bottom: (
      <p>
        CPC 입찰가도 높은 편이라,
        <span className='text-S/Bold'>광고 효율이 잘 나오지 않을 가능성이 높아요.</span>
      </p>
    ),
  },
};

export const convertEvaluateStatus = (score: string) => {
  const key = score
    .split('')
    .map((score) => {
      if (['A', 'B'].includes(score)) {
        return 'A';
      }
      if (['C'].includes(score)) {
        return 'B';
      }
      return 'C';
    })
    .join('');

  return SCORE[key as keyof typeof SCORE];
};

export const OVERSEA_PRODUCT_RATIO = [
  { text: '적음', key: 'afew', scope: '0~3', color: 'grey-600' },
  { text: '보통', key: 'few', scope: '3~7', color: 'green-600' },
  { text: '많음', key: 'many', scope: '7개 이상', color: 'blue-600' },
];
