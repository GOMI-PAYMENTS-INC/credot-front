import { useMemo } from 'react';
import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';

export const PriceTooltips = () => {
  const SalesPriceInfo = () => {
    return (
      <ToolTipCombiner>
        <ContentPack title='최저가' children={'가장 저렴한 상품의 판매가격이에요.'} />
        <ContentPack
          title='평균 판매가'
          children={'상품들이 판매되는 가격의 평균값이에요.'}
        />
      </ToolTipCombiner>
    );
  };

  const SalesTable = () => {
    return (
      <ContentPack
        children={
          <div className='flex space-x-3'>
            <div className='flex flex-col'>
              <p className='pt-2 text-S/Bold'>가격 높음 상품</p>
              <span>최저가순 상위 1~10위 상품들이에요.</span>
              <p className='pt-2 text-S/Bold'>가격 보통 상품</p>
              <span>최저가순 상위 11~30위 상품들이에요.</span>
              <p className='pt-2 text-S/Bold'>가격 낮음 상품</p>
              <span>최저가순 상위 31~50위 상품들이에요.</span>
            </div>
            <div className='flex flex-col'>
              <p className='pt-2 text-S/Bold'>판매가</p>
              <span>키워드 검색결과 내 상품들이 판매되는 평균 판매가</span>
              <p className='pt-2 text-S/Bold'>최근 30일 매출</p>
              <span>
                상품 판매가를 최근 30일 판매량과 곱하여 추정한 월 매출이에요 (옵션
                <br /> 상품인 경우 옵션가의 중앙값을 적용하여 계산)
              </span>
              <p className='pt-2 text-S/Bold'>최근 30일 판매량</p>
              <span>최근 30일간 상품이 판매된 건수에요.</span>
              <p className='pt-2 text-S/Bold'>노출 순위</p>
              <span>키워드 검색 시 상품이 노출되고 있는 순위에요.</span>
            </div>
          </div>
        }
      />
    );
  };
  return useMemo(() => [SalesPriceInfo(), SalesTable()], []);
};
