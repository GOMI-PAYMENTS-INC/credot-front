import { useMemo } from 'react';
import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';

interface IMarketTooltips {
  itemCount: number;
}

export const MarketTooltips = ({ itemCount }: IMarketTooltips) => {
  return useMemo(() => {
    const SearchTrend = () => {
      const listCss = 'ml-8';

      return (
        <ToolTipCombiner>
          <ContentPack
            title='데이터'
            children={
              <ul className='list-disc text-M/Medium text-white'>
                <li className={listCss}>Google에서 발생한 키워드의 검색량 추이에요.</li>
                <li className={listCss}>
                  선택된 기간 내 검색량이 가장 많은 달을 100으로 환산하여 추이를 나타내요.
                </li>
              </ul>
            }
          />

          <ContentPack
            title='활용Tip'
            children={
              <ul className='list-disc text-M/Medium text-white'>
                <li className={listCss}>키워드의 수요 변동성을 알 수 있어요.</li>
                <li className={listCss}>
                  수요가 많은 기간을 대비하여 미리 재고를 준비할 수 있어요.
                </li>
                <li className={listCss}>
                  수요가 많은 기간을 미리 알고 시장에 진입할 수 있어요.
                </li>
                <li className={listCss}>
                  현재의 매출 데이터를 기반으로 미래의 매출을 예측해볼 수 있어요.
                </li>
              </ul>
            }
          />
        </ToolTipCombiner>
      );
    };

    const TotalSales = () => {
      return (
        <ToolTipCombiner>
          <ContentPack
            title='데이터'
            children={
              <>
                키워드 상위 <span className=' '>{itemCount}</span>개 상품들의 최근 30일간
                매출 합계에요.
              </>
            }
          />

          <ContentPack title='활용Tip' children={'키워드의 월 시장 규모를 의미해요.'} />
        </ToolTipCombiner>
      );
    };

    const TotalSalesAvg = () => {
      return (
        <ToolTipCombiner>
          <ContentPack
            title='데이터'
            children={
              <>
                키워드 상위 <span className=''>{itemCount}</span>개 상품들의 최근 30일간
                평균 매출이에요.
              </>
            }
          />

          <ContentPack
            title='활용Tip'
            children={
              '내 상품이 키워드에 상위 노출되었을 시 발생되는 월 매출을 예상해볼 수 있어요.'
            }
          />
        </ToolTipCombiner>
      );
    };

    const TotalAmount = () => {
      return (
        <ToolTipCombiner>
          <ContentPack
            title='데이터'
            children={
              <>
                키워드 상위 <span className=''>{itemCount}</span>개 상품들이 최근 30일간
                판매된 판매량 합계에요.
              </>
            }
          />

          <ContentPack
            title='활용Tip'
            children={`키워드를 통해 발생되는 월 거래량을 파악할 수 있어요.`}
          />
        </ToolTipCombiner>
      );
    };

    const TotalAmountAvg = () => {
      return (
        <ToolTipCombiner>
          <ContentPack
            title='데이터'
            children={
              <>
                키워드 상위 <span className=''>{itemCount}</span>개 상품들이 최근 30일간
                판매된 평균 판매량이에요.
              </>
            }
          />

          <ContentPack
            title='활용Tip'
            children={`내 상품이 키워드에 상위 노출되었을 시 발생되는 최근 30일 판매량을 예상해볼 수 있어요.`}
          />
        </ToolTipCombiner>
      );
    };

    return [
      SearchTrend(),
      TotalSales(),
      TotalSalesAvg(),
      TotalAmount(),
      TotalAmountAvg(),
    ];
  }, []);
};
