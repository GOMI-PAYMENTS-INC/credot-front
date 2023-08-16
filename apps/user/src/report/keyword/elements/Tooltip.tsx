import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';

export const CallbackToolTip = (id: TToolTipKey) => {
  switch (id) {
    case 'Search':
      return { titleTooltip: Search, rateTooltip: ExplanSearch };
    case 'Conversion':
      return {
        titleTooltip: Conversion,
        rateTooltip: ConversionCount,
        secondSubRateTooltip: TotalSalesCount,
      };
    case 'Competition':
      return {
        titleTooltip: Competition,
        rateTooltip: CompetitionRate,
        secondSubRateTooltip: CompetitionAmount,
      };
    default:
      return {
        titleTooltip: CPC,
        rateTooltip: CPCRate,
        subRateTooltip: CPCPrice,
        secondSubRateTooltip: CPCAvg,
      };
  }
};

const Search = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 최근 30일간 검색량을 평가한 등급이에요.`}
      />

      <ContentPack
        title='계산식'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>매우좋음 : 3,000건 이상</li>
            <li className={listCss}>좋음 : 1,000건 이상 3,000건 미만</li>
            <li className={listCss}>보통 : 500건 이상 1,000건 미만</li>
            <li className={listCss}>나쁨 : 300건 이상 500건 미만</li>
            <li className={listCss}>매우나쁨 : 300건 미만</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const ExplanSearch = () => {
  return (
    <ContentPack children={`Shopee에서 최근 30일간 발생한 키워드의 검색량이에요.`} />
  );
};

const Conversion = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 구매전환 빈도를 평가한 등급이에요.`}
      />

      <ContentPack
        title='계산식'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>매우좋음 : 1.5 이상</li>
            <li className={listCss}>좋음 : 1 이상 1.5 미만</li>
            <li className={listCss}>보통 : 0.5 이상 1 미만</li>
            <li className={listCss}>나쁨 : 0.3 이상 0.5 미만</li>
            <li className={listCss}>매우나쁨 : 0.3 미만</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const ConversionCount = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드가 1회 검색될 때마다 구매가 발생하는 빈도에요.`}
      />
      <ContentPack title='계산식' children={`판매량 합계 ÷ 검색량`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>
              구매전환 빈도가 높을 수록 소비자의 검색 의도가 ‘구매’일 가능성이 커요.
            </li>
            <li className={listCss}>
              구매전환 빈도가 낮을 수록 소비자의 검색 의도가 ‘탐색'일 가능성이 커요.
            </li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

interface ITotalSalesCount {
  itemCount: number;
}
const TotalSalesCount = ({ itemCount }: ITotalSalesCount) => {
  return (
    <ContentPack
      children={
        <>
          키워드 상위 <span className='text-red-600'>{itemCount}</span>개 상품들의 판매량
          합계에요.
        </>
      }
    />
  );
};

const Competition = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 노출 경쟁률을 평가한 등급이에요.`}
      />

      <ContentPack
        title='계산식'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>매우좋음 : 0.5 미만</li>
            <li className={listCss}>좋음 : 0.5 이상 1 미만</li>
            <li className={listCss}>보통 : 1 이상 3 미만</li>
            <li className={listCss}>나쁨 : 3 이상 5 미만</li>
            <li className={listCss}>매우나쁨 : 5 이상</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const CompetitionRate = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack title='데이터' children={`키워드의 검색량 대비 경쟁상품 수에요.`} />
      <ContentPack title='계산식' children={`검색량 : 경쟁상품 수`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>키워드에 대한 수요 대비 공급을 알 수 있어요.</li>
            <li className={listCss}>
              노출 경쟁률이 높고 경쟁 상품 수가 많을수록 상위 노출이 어려운 키워드에요.
            </li>
            <li className={listCss}>
              노출 경쟁률이 낮고 경쟁 상품 수가 적을수록 상위 노출이 쉬운 키워드에요.
            </li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const CompetitionAmount = () => {
  return <ContentPack children={`키워드 검색 시 노출되는 경쟁 상품들의 수에요.`} />;
};

const CPC = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack title='데이터' children={`키워드의 CPC 비율을 평가한 등급이에요.`} />

      <ContentPack
        title='계산식'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>매우좋음 : 3% 미만</li>
            <li className={listCss}>좋음 : 3% 이상 5% 미만</li>
            <li className={listCss}>보통 : 5% 이상 10% 미만</li>
            <li className={listCss}>나쁨 : 10% 이상 15% 미만</li>
            <li className={listCss}>매우나쁨 : 15% 이상</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

interface ICPCRate {
  itemCount: number;
}
const CPCRate = ({ itemCount }: ICPCRate) => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={
          <>
            키워드 상위 <span className='text-red-600'>{itemCount}</span>개 상품들의 평균
            판매가 대비 키워드 광고의 클릭당 비용이에요.
          </>
        }
      />

      <ContentPack title='계산식' children={`CPC 단가 ÷ 평균 판매가 (%)`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>CPC 비율이 높을수록 광고 수익률이 낮아져요.</li>
            <li className={listCss}>CPC 비율이 낮을수록 광고 수익률이 높아져요.</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const CPCPrice = () => {
  return <ContentPack children={`키워드 광고 시 클릭당 발생하는 비용이에요.`} />;
};

interface ICPCAvg {
  itemCount: number;
}
const CPCAvg = ({ itemCount }: ICPCAvg) => {
  return (
    <ContentPack
      children={
        <>
          키워드 상위 <span className='text-red-600'>{itemCount}</span>개 상품들의 평균
          판매가에요.
        </>
      }
    />
  );
};
