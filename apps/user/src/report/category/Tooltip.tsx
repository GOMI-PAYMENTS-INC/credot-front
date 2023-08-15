import { ContentPack, ToolTipCombiner } from '@/components/UseTooltip';
import { useMemo } from 'react';

export const CategoryToolTip = () => {
  return useMemo(() => {
    const listCss = 'ml-8';
    return (
      <ToolTipCombiner>
        <ContentPack
          title='데이터'
          children={'키워드 상위 50개 상품들이 등록된 카테고리 정보에요.'}
        />

        <ContentPack
          title='활용Tip'
          children={
            <ul className='list-disc text-M/Medium text-white'>
              <li className={listCss}>
                상품등록 시 키워드 노출에 유리한 카테고리를 알 수 있어요.
              </li>

              <li className={listCss}>
                키워드가 브랜드명인 경우, 해당 브랜드의 주력 카테고리를 알 수 있어요.
              </li>
            </ul>
          }
        />
      </ToolTipCombiner>
    );
  }, []);
};
