type TToolTipKey = 'Search' | 'Conversion' | 'Competition' | 'CPC';
type TReportGeneratorType = {
  value: SORT_BY_TYPE;
  text: string;
  iconPath: string;
};

type TSearchTrigger = { isOpen: boolean; text: string; country: TSearchCountry | null };
