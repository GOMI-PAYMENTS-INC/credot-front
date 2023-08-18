import { useMemo } from 'react';
import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';

interface IPirceToolTips {
  itemCount: number;
}
export const PriceTooltips = ({ itemCount }: IPirceToolTips) => {
  const SalesTable = () => {
    const listCss = 'ml-8';
    return (
      <ToolTipCombiner>
        <ContentPack
          title='데이터'
          children={
            <>
              키워드 상위 <span className=''>{itemCount}</span>개 상품들을 가격 구간별로
              나누었어요.
            </>
          }
        />
        <ContentPack
          title='계산식'
          children={
            <ul className='list-disc text-M/Medium text-white'>
              <li className={listCss}>가격 낮은 상품 : 최저가순 상위 20%</li>
              <li className={listCss}>가격 보통 상품 : 최저가순 20~80%</li>
              <li className={listCss}>가격 높은 상품 : 최저가순 하위 20%</li>
            </ul>
          }
        />
        <ContentPack
          title='활용Tip'
          children={
            <ul className='list-disc text-M/Medium text-white'>
              <li className={listCss}>
                가격 구간별 매출이 높은 상품들이 무엇인지 알 수 있어요.
              </li>
              <li className={listCss}>
                내 상품의 시장가가 얼마에 형성되어 있는지 알 수 있어요.
              </li>
            </ul>
          }
        />
      </ToolTipCombiner>
    );
  };
  return useMemo(() => [SalesTable()], []);
};
