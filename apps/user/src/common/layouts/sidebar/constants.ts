import { PATH } from '@/common/constants';

export const MENU_DATA = [
  {
    key: 'keywordAnalyze',
    title: '키워드 분석',
    iconPath: '/assets/icons/outlined/Target.svg',
    path: [PATH.SEARCH_PRODUCTS, PATH.REPORT_LIST, PATH.REPORT_DETAIL],
    children: [
      {
        key: 'keywordAnalyze-0',
        title: '키워드 찾기',
        iconPath: '',
        path: PATH.CATEGORY,
        activePath: [],
      },
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
        path: PATH.REPORT_LIST,
        //path와 활동화될 페이지가 다른 경우 사용
        activePath: [PATH.REPORT_LIST, PATH.REPORT_DETAIL, PATH.REPORT_DETAIL_BY_SHARE],
      },
    ],
  },
];
