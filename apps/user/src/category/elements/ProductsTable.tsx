import { PRODUCT_TABLE_HEADS, TABLE_COL_ELEMENTS } from '@/category/constants';
import {
  featureConvertor,
  sepecificFeature,
  scrollSwitch,
  _getCategoryProducts,
  convertTableList,
} from '@/category/container';
import UseTooltip from '@/components/UseTooltip';
import { SortingButton } from '@/category/elements/SortingButton';

import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { getElementLocation } from '@/utils/getElementLocation';
import { useState } from 'react';
import { ReportGeneratorModal } from '@/report/keyword/elements/ReportGeneratorModal';
import { isFalsy } from '@/utils/isFalsy';

interface IProductsTable {
  printTable: TTableRowData[];
}

export const ProductsTable = ({ printTable }: IProductsTable) => {
  const [useScroll, setUseScroll] = useState<boolean>(false);

  const [reportTrigger, setReportTrigger] = useState<TSearchTrigger>({
    isOpen: false,
    text: '',
    country: 'SG',
  });

  const _printTable = convertTableList(printTable);
  const isEmptyPrintTable = isFalsy(_printTable);
  return (
    <div
      id='scrollbar'
      className={`mt-5 mb-[34px] h-fit ${
        isEmptyPrintTable ? 'max-w-[1288px] overflow-hidden' : 'overflow-y-scroll'
      }`}
      onScroll={() => {
        const { scrollLeft, offsetLeft } = getElementLocation('scrollbar');
        scrollSwitch(scrollLeft, useScroll, setUseScroll);
      }}
    >
      <ReportGeneratorModal
        setReportTrigger={setReportTrigger}
        reportTrigger={reportTrigger}
      />
      <table className='w-max border-separate border-spacing-0'>
        <thead className='border-b border-grey-300'>
          <tr>
            {PRODUCT_TABLE_HEADS.map((col: TTableColumn, index: number) => {
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
                        <SortingButton itemKey={col.key} />
                      </>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isEmptyPrintTable ? (
            <tr>
              <td colSpan={8}>
                <div className='grid h-[400px] justify-items-center pt-[104px] text-center'>
                  <img src={`/assets/images/EmptyBox.png`} alt='검색 결과 없음 아이콘' />
                  <div className='mt-4 text-L/Medium'>
                    <p>카테고리에 대한 데이터가 없어요.</p>
                    <p>다른 국가 또는 카테고리를 검색해보세요.</p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            _printTable.map((product, index: number) => {
              return (
                <tr key={`row_${index}`}>
                  {TABLE_COL_ELEMENTS.map((element, index) => {
                    const { key, unit } = element;
                    const _key = element.key as keyof TTableRowData;
                    const { value, iconPath, tdStyle, valueStyle, iconStyle, divStyle } =
                      sepecificFeature(_key, product[_key], useScroll);

                    return key === 'keyword' ? (
                      <th key={`${product.keyword}_${index}`} className={tdStyle}>
                        <div className='flex gap-4'>
                          <p className={valueStyle}>{value}</p>
                          <button
                            onClick={() =>
                              openBrowser(
                                `${convertShopeeSiteUrl(
                                  product.countryCode,
                                )}/search?keyword=${product[key]}`,
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
                          <button
                            id='relative_report_generator'
                            className='rounded-md border-[1px] border-orange-600 bg-orange-100 p-2'
                            onClick={() => {
                              setReportTrigger({
                                isOpen: true,
                                text: product.keyword,
                                country: product.countryCode,
                              });
                            }}
                          >
                            <ReactSVG
                              className=''
                              src='/assets/icons/outlined/CarbonReport.svg'
                              beforeInjection={(svg) =>
                                svg.setAttribute(
                                  'class',
                                  'fill-orange-400 w-[19px] h-[19px]',
                                )
                              }
                            />
                          </button>
                        </div>
                      </th>
                    ) : (
                      <td key={`${product.keyword}_${index}`} className={tdStyle}>
                        <div className={divStyle}>
                          {key === 'salesGrowthRate' && (
                            <ReactSVG src={iconPath} className={iconStyle} />
                          )}
                          <p className={valueStyle}>
                            {value} {unit}
                          </p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
