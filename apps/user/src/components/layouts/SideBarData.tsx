import { PATH } from '@/router/routeList';

export const menuData = [
  {
    key: 'keywordAnalyze',
    title: '키워드 분석',
    iconPath: '/assets/icons/outlined/Target.svg',
    path: [PATH.SEARCH_PRODUCTS, PATH.GET_REPORT_LIST, PATH.ANALYSIS_REPORT_LIST],
    children: [
      {
        key: 'keywordAnalyze-1',
        title: '키워드 검색',
        iconPath: '/assets/icons/outlined/Search.svg',
        path: PATH.SEARCH_PRODUCTS,
      },
      {
        key: 'keywordAnalyze-2',
        title: '리포트 조회',
        iconPath: '/assets/icons/outlined/FileText.svg',
        path: PATH.GET_REPORT_LIST,
      },
    ],
  },
];
