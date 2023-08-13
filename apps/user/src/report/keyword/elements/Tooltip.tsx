import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';

export const CallbackToolTip = (id: TToolTipKey) => {
  switch (id) {
    case 'Search':
      return [Search, ExplanSearch];
    case 'Conversion':
      return [Conversion, ConversionCount, TotalSalesCount];
    case 'Competition':
      return [Competition, CompetitionRate, CompetitionAmount];
    default:
      return [CPC, CPCRate, CPCPrice, CPCAvg];
  }
};

const Search = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 최근 30일 검색량을 5개 등급으로 나누어 평가해요.`}
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
  return <ContentPack title='데이터' children={`최근 30일간 키워드의 검색량이에요.`} />;
};

const Conversion = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 구매 전환율을 5개 등급으로 나누어 평가해요.`}
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
      <ContentPack title='계산식' children={`최근 30일  판매량 ÷ 최근 30일 검색량`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>
              구매 전환수가 낮을수록 구매 보다는 탐색 목적의 키워드일 가능성이 높아요.
            </li>
            <li className={listCss}>
              구매 전환수가 높을수록 탐색 보다는 구매 목적의 키워드일 가능성이 높아요.
            </li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

interface ITotalSalesCount {
  itemCount: number;
  text: string;
}
const TotalSalesCount = ({ itemCount, text }: ITotalSalesCount) => {
  return (
    <ContentPack
      title='데이터'
      children={`최근 30일간 ${text} 검색결과 내 상위 ${itemCount}개 상품들의 판매량 합계에요`}
    />
  );
};

const Competition = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 노출 경쟁률을 5개 등급으로 나누어 평가해요.`}
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
      <ContentPack
        title='데이터'
        children={`키워드 검색량 대비 경쟁상품의 수를 의미해요.`}
      />
      <ContentPack title='계산식' children={`경쟁상품 수 ÷ 최근 30일 검색량`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>
              노출 경쟁률이 높을 수록 수요 보다는 공급이 많은 시장이에요.
            </li>
            <li className={listCss}>
              노출 경쟁률이 낮을 수록 공급 보다는 수요가 많은 시장이에요.
            </li>
            <li className={listCss}>
              노출 경쟁률이 높고 경쟁상품 수가 많을수록 상위 노출이 어려워요.
            </li>
            <li className={listCss}>
              노출 경쟁률이 낮고 경쟁상품 수가 적을수록 상위 노출이 쉬워요.
            </li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const CompetitionAmount = () => {
  return (
    <ContentPack
      title='데아터'
      children={`키워드 검색 시 노출되는 경쟁 상품들의 수에요.`}
    />
  );
};

const CPC = () => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`키워드의 CPC 비율을 5개 등급으로 나누어 평가해요.`}
      />

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
  text: string;
}
const CPCRate = ({ itemCount, text }: ICPCRate) => {
  const listCss = 'ml-8';
  return (
    <ToolTipCombiner>
      <ContentPack
        title='데이터'
        children={`${text} 검색결과 상위 ${itemCount}개 상품들의 평균 판매가 대비 키워드의 CPC 광고 단가에요.`}
      />

      <ContentPack title='계산식' children={`CPC 단가 ÷ 평균 판매가 (%)`} />
      <ContentPack
        title='활용Tip'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>CPC 비율이 높을수록 광고 수익률이 낮을 수 있어요.</li>
            <li className={listCss}>CPC 비율이 낮을수록 광고 수익률이 높을 수 있어요.</li>
          </ul>
        }
      />
    </ToolTipCombiner>
  );
};

const CPCPrice = () => {
  return (
    <ContentPack
      title='데아터'
      children={`키워드로 CPC 광고 시 클릭당 발생하는 비용이에요.`}
    />
  );
};

interface ICPCAvg {
  itemCount: number;
  text: string;
}
const CPCAvg = ({ itemCount, text }: ICPCAvg) => {
  return (
    <ContentPack
      title='데아터'
      children={`${text} 검색결과 상위 ${itemCount}개 상품들이 판매되고 있는 평균 가격이에요.`}
    />
  );
};
