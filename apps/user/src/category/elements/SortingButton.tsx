import { ReactSVG } from 'react-svg';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { SortingConfigAtom, TableItemAtom, PaginationAtom } from '@/atom';
import { getSortingIconStyle, updateStatesBySorting } from '@/category/container';
interface ISortingButton {
  itemKey: keyof TTableRowData;
}
export const SortingButton = ({ itemKey }: ISortingButton) => {
  const [config, setConfig] = useRecoilState(SortingConfigAtom);
  const [tableList, setTableList] = useRecoilState(TableItemAtom);
  const [pagination, setPagination] = useRecoilState(PaginationAtom);
  const { up, down } = getSortingIconStyle(config, itemKey);

  config.sortingItem === 'salesGrowthRate' ? 'fill-white' : 'fill-grey-400';
  return (
    <button
      onClick={() =>
        updateStatesBySorting(
          config,
          itemKey,
          setConfig,
          tableList,
          setTableList,
          pagination,
        )
      }
    >
      <div className='flex cursor-pointer flex-col gap-1'>
        <ReactSVG
          src='/assets/icons/filled/SetUp.svg'
          beforeInjection={(svg) => svg.setAttribute('class', up)}
        />
        <ReactSVG
          src='/assets/icons/filled/SetDown.svg'
          beforeInjection={(svg) => svg.setAttribute('class', down)}
        />
      </div>
    </button>
  );
};
