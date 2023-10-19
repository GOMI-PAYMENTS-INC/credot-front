import { atom } from 'recoil';

export const SortingConfigAtom = atom<TSortingConfig>({
  key: 'SortingConfig',
  default: { sortingItem: 'salesGrowthRate', type: 'DESC' },
});

export const TableItemAtom = atom<TCategoryTableData>({
  key: 'TableItem',
  default: { tableData: [], printTable: [] },
});
