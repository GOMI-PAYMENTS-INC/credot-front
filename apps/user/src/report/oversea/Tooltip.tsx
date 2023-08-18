import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';
import { CountryType } from '@/generated/graphql';
import { convertCountry } from '@/utils/convertEnum';
import { useMemo } from 'react';

interface IOoverseaProductRate {
  country: CountryType;
}
export const OverseaProductRate = ({ country }: IOoverseaProductRate) => {
  const _country = convertCountry(country);
  return useMemo(
    () => (
      <ToolTipCombiner>
        <ContentPack
          title='데이터'
          children={
            <>
              출고지가 <span className=''>{_country}</span>이(가) 아닌 상품들의 정보에요.
            </>
          }
        />
        <ContentPack
          title='활용Tip'
          children={'키워드에 대한 국가별 경쟁력이 어떠한지 알 수 있어요.'}
        />
      </ToolTipCombiner>
    ),
    [],
  );
};
