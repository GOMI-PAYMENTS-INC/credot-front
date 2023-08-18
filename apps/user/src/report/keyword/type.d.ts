type TToolTipKey = 'Search' | 'Conversion' | 'Competition' | 'CPC';
type TReportGeneratorType = {
  value: SORT_BY_TYPE;
  text: string;
  iconPath: string;
};

type TSearchTrigger = { isOpen: boolean; text: string; country: TSearchCountry | null };

type TRequestReportModa = {
  _dispatch: Function;
  parameter: TReportParams;
  _state: {
    keyword: string;
    country: TSearchCountry;
    sortBy: TSortBy;
    modalType: MODAL_TYPE_ENUM;
  };
  isOpen: boolean;
};

type TReportParams = {
  reportInvokeId?: string | undefined;
  count?: number | null | undefined;
};

type TModalStatus = { modalType: MODAL_TYPE_ENUM | ''; response?: any };
