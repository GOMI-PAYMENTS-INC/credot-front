import { PRODUCT_TABLE_ELEMENTS, TABLE_COL_ELEMENTS } from '@/category/constants';
import { featureConvertor, sepecificFeature } from '@/category/container';
import UseTooltip from '@/components/UseTooltip';
import { SortingButton } from '@/category/elements/SortingButton';

import { ReactSVG } from 'react-svg';

export const ProductsTable = () => {
  return (
    <table className='w-max'>
      <thead className='border-b border-grey-300'>
        <tr>
          {PRODUCT_TABLE_ELEMENTS.thead.map((col: TTableColumn, index: number) => {
            const { thStyle, colStyle } = featureConvertor(col.type, index);
            return (
              <th
                key={`col_${index}`}
                className={`${thStyle} ${index === 0 ? 'rounded-tl-lg' : ''}`}
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
                const { value, iconPath, tdStyle, valueStyle } = sepecificFeature(
                  _key,
                  product[_key],
                );

                return (
                  <td key={`${product.keyword}_${index}`} className={tdStyle}>
                    {key === 'salesGrowthRate' && (
                      <ReactSVG src={iconPath} className='self-left' />
                    )}
                    <p className={valueStyle}>{value}</p>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
