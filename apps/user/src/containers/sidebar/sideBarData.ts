import { PATH } from '@/types/enum.code';

export const menuData = [
  {
    key: 'keywordAnalyze',
    title: '키워드 분석',
    iconPath: '/assets/icons/outlined/Target.svg',
    path: [PATH.SEARCH_PRODUCTS, PATH.GET_REPORT_LIST, PATH.ANALYSIS_REPORT_LIST],
    children: [
      {
        key: 'keywordAnalyze-1',
        title: '리포트 생성',
        iconPath: '/assets/icons/outlined/Search.svg',
        path: PATH.SEARCH_PRODUCTS,
        activePath: [],
      },
      {
        key: 'keywordAnalyze-2',
        title: '리포트 조회',
        iconPath: '/assets/icons/outlined/FileText.svg',
        path: PATH.GET_REPORT_LIST,
        //path와 활동화될 페이지가 다른 경우 사용
        activePath: [PATH.GET_REPORT_LIST, PATH.ANALYSIS_REPORT_LIST],
      },
    ],
  },
];
