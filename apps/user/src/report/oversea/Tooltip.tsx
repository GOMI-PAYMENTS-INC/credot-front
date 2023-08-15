import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';
import { useMemo } from 'react';

export const OverseaProductRate = () => {
  return useMemo(() => {
    return (
      <ToolTipCombiner>
        <ContentPack
          title='데이터'
          children={'출고지가 베트남이 아닌 상품들의 정보에요.'}
        />
        <ContentPack
          title='활용Tip'
          children={'키워드에 대한 국가별 경쟁력이 어떠한지 알 수 있어요.'}
        />
      </ToolTipCombiner>
    );
  }, []);
};
