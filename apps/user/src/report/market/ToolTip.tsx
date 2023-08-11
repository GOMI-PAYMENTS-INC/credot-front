import { CountryType } from '@/generated/graphql';
import { convertCountry } from '@/utils/convertEnum';
import { ContentPack } from '@/components/UseTooltip';

interface ISearchTrend {
  country: CountryType;
  text: string;
}

export const SearchTrend = ({ country, text }: ISearchTrend) => {
  const listCss = 'ml-8';
  const _country = convertCountry(country);
  return (
    <>
      <ContentPack
        title='데이터'
        children={`${_country}에서 최근 3년간 ${text} 키워드에 대한 Google 검색량 추이에요.`}
      />

      <ContentPack
        title='활용Tip'
        className='pt-5'
        children={
          <ul className='list-disc text-M/Medium text-white'>
            <li className={listCss}>
              키워드에 대한 수요가 일정한지 시즌성이 있는 상품인지 알 수 있어요.
            </li>
            <li className={listCss}>검색량이 많은 시즌에는 재고를 미리 대비해주세요.</li>
            <li className={listCss}>
              이왕이면 수요가 많은 시즌에 맞추어 상품을 판매보세요.
            </li>
            <li className={listCss}> 미래의 상품 매출과 판매량을 예측할 수 있어요.</li>
          </ul>
        }
      />
    </>
  );
};

interface ITotalSales {
  itemCount: number;
}
export const TotalSales = ({ itemCount }: ITotalSales) => {
  return (
    <>
      <ContentPack
        title='데이터'
        children={`키워드 검색 시 노출되는 상위 ${itemCount}개 상품들의 최근 30일간 매출 합계에요.`}
      />

      <ContentPack
        className='pt-5'
        title='활용Tip'
        children={'키워드의 월 시장규모를 파악할 수 있어요.'}
      />
    </>
  );
};

interface ITotalSalesAvg {
  itemCount: number;
}
export const TotalSalesAvg = ({ itemCount }: ITotalSalesAvg) => {
  return (
    <>
      <ContentPack
        title='데이터'
        children={`키워드 검색 시 노출되는 상위 ${itemCount}개 상품들의 최근 30일간 평균 매출이에요.`}
      />

      <ContentPack
        className='pt-5'
        title='활용Tip'
        children={
          '키워드 검색결과 첫 페이지에 상품이 노출되었을 시 월 매출을 예상해볼 수 있어요.'
        }
      />
    </>
  );
};

interface ITotalAmount {
  itemCount: number;
  text: string;
}
export const TotalAmount = ({ text, itemCount }: ITotalAmount) => {
  return (
    <>
      <ContentPack
        title='데이터'
        children={`최근 30일간 ${text} 검색결과 내 상위 ${itemCount}개 상품들의 판매량 합계에요.`}
      />

      <ContentPack
        className='pt-5'
        title='활용Tip'
        children={`월간 ${text} 키워드를 통해 얼마나 많은 구매가 발생하는지 알 수 있어요.`}
      />
    </>
  );
};

interface ITotalAmountAvg {
  itemCount: number;
  text: string;
}
export const TotalAmountAvg = ({ text, itemCount }: ITotalAmountAvg) => {
  return (
    <>
      <ContentPack
        title='데이터'
        children={`최근 30일간 ${text} 검색결과 내 상위 ${itemCount}개 상품들의 평균 판매량이에요.`}
      />

      <ContentPack
        className='pt-5'
        title='활용Tip'
        children={`키워드 검색결과 첫 페이지에 상품이 노출되었을 시 월 판매량을 예상해볼 수 있어요.`}
      />
    </>
  );
};
