import { PRODUCT_TABLE_ELEMENTS, TABLE_COL_ELEMENTS } from '@/category/constants';
import { featureConvertor, sepecificFeature, scrollSwitch } from '@/category/container';
import UseTooltip from '@/components/UseTooltip';
import { SortingButton } from '@/category/elements/SortingButton';

import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { getElementLocation } from '@/utils/getElementLocation';
import { useState } from 'react';

export const ProductsTable = () => {
  const [useScroll, setUseScroll] = useState<boolean>(false);

  return (
    <div
      id='scrollbar'
      className='mt-5 mb-[34px] h-fit overflow-y-scroll'
      onScroll={() => {
        const { scrollLeft } = getElementLocation('scrollbar');
        scrollSwitch(scrollLeft, useScroll, setUseScroll);
      }}
    >
      <table className='w-max border-separate border-spacing-0'>
        <thead className='border-b border-grey-300'>
          <tr>
            {PRODUCT_TABLE_ELEMENTS.thead.map((col: TTableColumn, index: number) => {
              const { thStyle, colStyle } = featureConvertor(col.type, index);
              return (
                <th
                  key={`col_${index}`}
                  className={`${thStyle} ${
                    index === 0
                      ? 'sticky left-0 z-10 rounded-tl-lg border-r-[1px]'
                      : 'relative'
                  }`}
                >
                  <div className={`${colStyle} flex items-center gap-2.5`}>
                    <p>{col.title}</p>
                    {col.type !== 'type1' && (
                      <>
                        <UseTooltip
                          tooltipStyle={col.type === 'type2' ? 'fill-white' : ''}
                          content={'안녕'}
                        />
                        <SortingButton type={col.type} />
                      </>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {PRODUCT_TABLE_ELEMENTS.tbody.map((product, index: number) => {
            return (
              <tr key={`row_${index}`}>
                {TABLE_COL_ELEMENTS.map((key, index) => {
                  const _key = key as keyof TRespone;
                  const { value, iconPath, tdStyle, valueStyle, iconStyle, divStyle } =
                    sepecificFeature(_key, product[_key], useScroll);

                  return (
                    <td key={`${product.keyword}_${index}`} className={tdStyle}>
                      <div className={divStyle}>
                        {key === 'salesGrowthRate' && (
                          <ReactSVG src={iconPath} className={iconStyle} />
                        )}
                        <p className={valueStyle}>{value}</p>
                        {key === 'keyword' && (
                          <button
                            onClick={() =>
                              openBrowser(
                                `${convertShopeeSiteUrl('VN')}/search?keyword=${
                                  product[key]
                                }`,
                                'R',
                              )
                            }
                          >
                            <ReactSVG
                              src={iconPath}
                              className={iconStyle}
                              beforeInjection={(svg) =>
                                svg.setAttribute('class', 'fill-grey-600')
                              }
                            />
                          </button>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
