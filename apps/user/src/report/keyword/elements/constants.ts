import { SORT_BY_TYPE } from '@/types/enum.code';
import { convertSortByIconPath, convertSortedType } from '@/utils/convertEnum';

export const SORTING_TYPE: TReportGeneratorType[] = Object.keys(SORT_BY_TYPE).map(
  (sortBy) => {
    const sortByEnum = SORT_BY_TYPE[sortBy as keyof typeof SORT_BY_TYPE];
    return {
      value: sortByEnum,
      text: convertSortedType(sortByEnum),
      iconPath: convertSortByIconPath(sortByEnum),
    };
  },
);
