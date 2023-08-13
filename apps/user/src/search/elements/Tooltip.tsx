import { useMemo } from 'react';
import { ToolTipCombiner, ContentPack } from '@/components/UseTooltip';

export const SearchTooltips = () => {
  const Search = () => {
    return (
      <ToolTipCombiner>
        <ContentPack title='국가' children='키워드를 분석할 Shopee 국가' />

        <ContentPack
          title='수집기준'
          children={
            <>
              <p>데이터를 수집할 키워드 검색결과의 상품 정렬 기준</p>
              <ul className='ml-5 list-disc'>
                <li>연관도순: 키워드 검색 시 기본값으로 노출되는 상품순</li>
                <li>판매량순: 키워드 검색 후 판매량순으로 정렬 시 노출되는 상품순</li>
              </ul>
            </>
          }
        />
      </ToolTipCombiner>
    );
  };
  const Monthly = () => {
    return (
      <ContentPack
        children={
          <>
            키워드의 최근 30일간 검색량을 나타내요. <br /> 키워드에 대한 수요를 정량적으로
            알 수 있어요.
          </>
        }
      />
    );
  };
  const Images = () => {
    return (
      <ContentPack children={'쇼피에서 키워드 검색 시 노출되는 상품들의 이미지에요.'} />
    );
  };
  const RelativeKeyword = () => {
    return (
      <ContentPack
        children={'키워드와 함께 가장 많이 검색되는 연관성이 높은 키워드들이에요.'}
      />
    );
  };

  return useMemo(
    () => ({
      Search: Search(),
      Monthly: Monthly(),
      Images: Images(),
      RelativeKeyword: RelativeKeyword(),
    }),
    [],
  );
};
